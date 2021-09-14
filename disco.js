const honeycombVendorId = 0x294b;
const bravoProductId = 0x1901;

async function getBravoDevice() {
  const filters = [{ vendorId: honeycombVendorId, productId: bravoProductId }];

  const [device] = await navigator.hid.requestDevice({ filters });
  return device;
}

let bravo;

const btn = document.getElementById("btn");
const msgArea = document.getElementById("msg");

async function main() {
  if (!navigator.hid) {
    msgArea.textContent = `Sorry, this web page is using very new USB HID access technology and your browser doesn't support it yet. Please try Chrome/Edge/Brave v89+ or Opera v76+.`;
    btn.remove();
    return;
  }

  // Check if they have a Bravo and we already have permission.
  const allDevices = await navigator.hid.getDevices();
  const bravoDevices = allDevices.filter(
    (d) => d.vendorId === honeycombVendorId && d.productId === bravoProductId
  );

  if (bravoDevices.length) {
    // Hooray - we have permission already!
    bravo = bravoDevices[0];
    listenToBravo();

    msgArea.innerHTML =
      "Bravo located and permission already granted. Ready to disco!<br/> Press the flaps lever down to start the disco and up to stop.";
    return;
  }

  // They need to grant us permission. Or attach a Bravo.
  msgArea.textContent =
    "You need to grant this page permission to access your Honeycomb Bravo (assuming you have one).";
  btn.textContent = "Connect to Honeycomb Bravo";

  btn.onclick = makeConnection;
}

async function makeConnection() {
  const filters = [{ vendorId: honeycombVendorId, productId: bravoProductId }];

  const result = await navigator.hid.requestDevice({ filters });
  console.log("Result", result);
  if (result.length > 0) {
    bravo = result[0];
    listenToBravo();
  } else {
    msgArea.textContent =
      "Sorry, you need to connect to a Honeycomb Bravo Throttle Quadrant. Please try again if you have one.";
  }
}

async function listenToBravo() {
  btn.remove();

  await bravo.open();

  const elementContainer = document.getElementById("values");
  const valueElements = [];
  for (let i = 0; i < 12; i++) {
    const elem = document.createElement("div");
    valueElements.push(elem);
    elementContainer.appendChild(elem);
  }

  bravo.addEventListener("inputreport", (event) => {
    const { data, device, reportId } = event;

    const nums = [];
    for (let i = 0; i < data.byteLength; i++) {
      nums[i] = data.getUint8(i);
    }
    const values = [
      data.getUint8(0) + 256 * data.getUint8(1),
      data.getUint8(2) + 256 * data.getUint8(3),
      data.getUint8(4) + 256 * data.getUint8(5),
      data.getUint8(6) + 256 * data.getUint8(7),
      data.getUint8(8) + 256 * data.getUint8(9),
      data.getUint8(10) + 256 * data.getUint8(11),
      data.getUint8(12),
      data.getUint8(13),
      data.getUint8(14),
      data.getUint8(15),
      data.getUint8(16),
      data.getUint8(17),
    ];

    for (let i = 0; i < values.length; i++) {
      valueElements[i].textContent =
        i <= 5 ? values[i].toString() : values[i].toString(2).padStart(8, "0");
    }

    if (values[7] & 0b01000000 && !discoRunning) {
      startDisco();
    }
    if (values[7] & 0b10000000 && discoRunning) {
      stopDisco();
    }
    discoSpeed = values[1];
  });

  stopDisco();
}

let discoRunning = false;
let discoSpeed = 100; // 0-1023

function startDisco() {
  if (discoRunning) {
    return;
  }

  discoRunning = true;
  msgArea.textContent =
    "Pull the flaps lever up to stop the disco. First (throttle) lever controls the disco speed.";

  party();
}

function stopDisco() {
  discoRunning = false;
  party();
  msgArea.textContent =
    "Push the flap lever down to start the disco! First (throttle) lever controls the disco speed.";
}

// Change this to false to allow amber gear lights
let prohibitAmber = true;

async function party() {
  const bytes = discoRunning
    ? [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
      ]
    : [0, 0, 0, 0];

  if (prohibitAmber) {
    if ((bytes[1] & 0b00000011) === 0b00000011) {
      // Left Gear is amber. Turn off.
      bytes[1] = bytes[1] & 0b11111100;
    }
    if ((bytes[1] & 0b00001100) === 0b00001100) {
      // Centre Gear is amber. Turn off.
      bytes[1] = bytes[1] & 0b11110011;
    }
    if ((bytes[1] & 0b00110000) === 0b00110000) {
      // Right Gear is amber. Turn off.
      bytes[1] = bytes[1] & 0b11001111;
    }
  }
  const report = Uint8Array.from(bytes);
  await bravo.sendFeatureReport(0, report);

  if (discoRunning) {
    const delay = Math.log(1023 - discoSpeed) * 1000;

    setTimeout(party, delay);
  }
}

function delay(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

void main();
