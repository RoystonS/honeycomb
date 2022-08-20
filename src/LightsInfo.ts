const lightNames = [
  "HDG",
  "NAV",
  "APR",
  "REV",
  "ALT",
  "VS ",
  "IAS",
  "AUTO PILOT",
  "Left Gear green",
  "Left Gear red",
  "Centre Gear green",
  "Centre Gear red",
  "Right Gear green",
  "Right Gear red",
  "MASTER WARNING",
  "ENGINE FIRE",
  "LOW OIL PRESSURE",
  "LOW FUEL PRESSURE",
  "ANTI ICE",
  "STARTER ENGAGED",
  "APU",
  "MASTER CAUTION",
  "VACUUM",
  "LOW HYD PRESSURE",
  "AUX FUEL PUMP",
  "PARKING BRAKE",
  "LOW VOLTS",
  "DOOR",
];

export const TotalLightsCount = lightNames.length;

export function getLightNames(enabledLights: boolean[]) {
  return enabledLights
    .map((on, index) => (on ? lightNames[index] : ""))
    .filter((s) => !!s);
}
