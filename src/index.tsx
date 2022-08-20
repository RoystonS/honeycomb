import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { ButtonDisplay } from "./ButtonDisplay";
import { ShowLights } from "./ShowLights";
import { ShowRawInputs } from "./ShowRawInputs";
import type { State } from "./State";

const honeycombVendorId = 0x294b;
const bravoProductId = 0x1901;

const emptyState: State = {
  rawInputs: [],
  buttons: [],
};

function MyApp() {
  if (!navigator.hid) {
    return (
      <div>
        Sorry, this web page is using very new USB HID access technology and
        your browser doesn't support it yet. Please try Chrome/Edge/Brave v89+
        or Opera v76+.
      </div>
    );
  }

  return <BravoDisplay />;
}

function BravoDisplay() {
  const bravoDeviceRef = React.useRef<HIDDevice>(null);
  const [hasBravoDevice, setHasBravoDevice] = React.useState(false);
  const [state, dispatchNewInput] = React.useReducer(reducer, emptyState);
  const [error, setError] = React.useState("");

  const [connecting, setConnecting] = React.useState(false);

  const connectToBravo = React.useCallback(() => {
    // Check if they have a Bravo and we already have permission.

    let bravo: HIDDevice;

    navigator.hid.getDevices().then(async (allDevices) => {
      const bravoDevices = allDevices.filter(
        (d) =>
          d.vendorId === honeycombVendorId && d.productId === bravoProductId
      );

      if (bravoDevices.length) {
        // Hooray - we have permission already!
        bravo = bravoDevices[0];
        await bravo.open();
        bravoDeviceRef.current = bravo;
        setHasBravoDevice(true);
      }
    });
  }, []);

  const requestPermissionForBravo = React.useCallback(() => {
    setConnecting(true);
    const filters = [
      { vendorId: honeycombVendorId, productId: bravoProductId },
    ];
    navigator.hid
      .requestDevice({ filters })
      .then((devices) => {
        if (devices.length > 0) {
          connectToBravo();
        } else {
          setError("Failed to find a Honeycomb Bravo Throttle Quadrant");
        }
      })
      .finally(() => {
        setConnecting(false);
      });
  }, [connectToBravo]);

  React.useEffect(() => {
    connectToBravo();
    return () => {
      if (bravoDeviceRef.current) {
        bravoDeviceRef.current.close();
        bravoDeviceRef.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    if (!hasBravoDevice) {
      return;
    }
    const bravoDevice = bravoDeviceRef.current!;

    function handler(event) {
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

      dispatchNewInput(values);
    }
    bravoDevice.addEventListener("inputreport", handler);
    return () => {
      bravoDevice.removeEventListener("inputreport", handler);
    };
  }, [hasBravoDevice]);

  if (hasBravoDevice) {
    return (
      <div>
        Bravo connected successfully!
        <h2>Inputs</h2>
        This section shows you all of the inputs coming from the Honeycomb
        Bravo.
        <ShowRawInputs rawInputs={state.rawInputs} />
        <ButtonDisplay buttons={state.buttons} />
        <hr />
        <h2>Outputs</h2>
        This section of the page demonstrates the lights on the Honeycomb Bravo.
        <ShowLights bravoDevice={bravoDeviceRef.current!} state={state} />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          You need to grant this page permission to access your Honeycomb Bravo
          (assuming you have one).
        </div>
        <button disabled={connecting} onClick={requestPermissionForBravo}>
          Connect to Honeycomb Bravo
        </button>
        <div className="error">{error}</div>
      </div>
    );
  }
  return <h1>Hello world</h1>;
}

function reducer(state: State, newInput: number[]): State {
  if (
    state &&
    newInput.every((element, index) => {
      return state.rawInputs[index] === element;
    })
  ) {
    // Unchanged
    return state;
  }

  let j = 0;
  const buttons: boolean[] = [];

  for (let i = 0; i < 6; i++) {
    const buttonsBinary = newInput[i + 6];
    for (let b = 0; b < 8; b++) {
      buttons[j++] = !!(buttonsBinary & (1 << b));
    }
  }

  return {
    rawInputs: newInput,
    buttons,
  };
}

const root = document.querySelector("#reactRoot");
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(<MyApp />);
