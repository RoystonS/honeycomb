import React = require("react");
import { getLightNames, TotalLightsCount } from "./LightsInfo";

export interface IRenderLightsProps {
  bravoDevice: HIDDevice;
  /** Which of the 28 lights to show,  */
  lights: boolean[];
}

export function RenderLights({ bravoDevice, lights }: IRenderLightsProps) {
  const bytes: number[] = [0, 0, 0, 0];

  for (let i = 0; i < TotalLightsCount; i++) {
    if (lights[i]) {
      const byteIndex = Math.floor(i / 8);
      bytes[byteIndex] = bytes[byteIndex] | (1 << i % 8);
    }
  }

  const lightNames = getLightNames(lights);

  const report = Uint8Array.from(bytes);
  bravoDevice.sendFeatureReport(0, report);

  React.useEffect(() => {
    return () => {
      // We're unmounting. Turn all the lights off.
      bravoDevice.sendFeatureReport(0, Uint8Array.from([0, 0, 0, 0]));
    };
  }, []);
  return <div>Lights currently on: {lightNames.join("; ")}</div>;
}
