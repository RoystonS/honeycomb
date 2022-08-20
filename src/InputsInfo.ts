export const booleanInputNames = [
  "HDG",
  "NAV",
  "APR",
  "REV",
  "ALT",
  "VS",
  "IAS",
  "AUTO PILOT",
  "Axis 2A",
  "Axis 3A",
  "Axis 4A",
  "Axis 5A",
  "AP+",
  "AP-",
  "Flaps down",
  "Flaps up",
  "Selector IAS",
  "Selector CRS",
  "Selector HDG",
  "Selector VS",
  "Selector ALT",
  "Trim down",
  "Trim up",
  "Axis 1 Detent",
  "Axis 2 Detent",
  "Axis 3 Detent",
  "Axis 4 Detent",
  "Axis 5 Detent",
  "Axis 1A & 2B",
  "Axis 3B",
  "Gear Up",
  "Gear Down",
  "Axis 6 Detent",
  "Switch 1 Up",
  "Switch 1 Down",
  "Switch 2 Up",
  "Switch 2 Down",
  "Switch 3 Up",
  "Switch 3 Down",
  "Switch 4 Up",
  "Switch 4 Down",
  "Switch 5 Up",
  "Switch 5 Down",
  "Switch 6 Up",
  "Switch 6 Down",
  "Switch 7 Up",
  "Switch 7 Down",
  "Lever 4B",
];

export function getInputNames(buttons: boolean[]) {
  return buttons
    .map((on, index) => (on ? booleanInputNames[index] : ""))
    .filter((s) => !!s);
}