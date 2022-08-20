import * as React from "react";
import { TotalLightsCount } from "./LightsInfo";

import { RenderLights } from "./RenderLights";
import { State } from "./State";

export interface IShowLightsProps {
  bravoDevice: HIDDevice;
  state: State;
}

export function ShowLights({ bravoDevice, state }: IShowLightsProps) {
  const [showType, setShowType] = React.useState(0);

  const handleTypeChanges = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setShowType(parseInt(e.target.value, 10));
  }, []);

  // Control the speed via the first axis, and round it to avoid rapid changes
  const roundTo = 50;
  const minimum = 10;
  const delay =
    roundTo *
      Math.round((((1023 - state.rawInputs[1]) / 1023) * 1000) / roundTo) ||
    minimum;

  let lightShow: JSX.Element;
  if (showType === 1) {
    lightShow = <RandomLights bravoDevice={bravoDevice} delayMillis={delay} />;
  }
  if (showType === 2) {
    lightShow = <Rotator bravoDevice={bravoDevice} delayMillis={delay} />;
  }

  return (
    <div>
      <h3>Light Show</h3>
      <p>
        Choose the type of lights display you want to see, and then control the
        speed using the first Bravo lever:
      </p>
      <label>
        <input
          type="radio"
          checked={showType === 0}
          onChange={handleTypeChanges}
          value="0"
        />{" "}
        None
      </label>
      <label>
        <input
          type="radio"
          checked={showType === 1}
          onChange={handleTypeChanges}
          value="1"
        />{" "}
        DISCO!
      </label>
      <label>
        <input
          type="radio"
          checked={showType === 2}
          onChange={handleTypeChanges}
          value="2"
        />{" "}
        Sequence
      </label>
      <br />
      {lightShow}
    </div>
  );
}

export interface IRotatorProps {
  bravoDevice: HIDDevice;
  delayMillis?: number;
}

export function Rotator({ bravoDevice, delayMillis = 1000 }: IRotatorProps) {
  const [currentLight, setCurrentLight] = React.useState(0);

  const lights: boolean[] = [];
  lights[currentLight] = true;

  React.useEffect(() => {
    const handle = setInterval(() => {
      setCurrentLight((currentLight) =>
        currentLight + 1 >= TotalLightsCount ? 0 : currentLight + 1
      );
    }, delayMillis);
    return () => {
      clearInterval(handle);
    };
  }, [delayMillis]);

  return <RenderLights bravoDevice={bravoDevice} lights={lights} />;
}

export interface IRandomProps {
  bravoDevice: HIDDevice;
  delayMillis?: number;
}

export function RandomLights({
  bravoDevice,
  delayMillis = 1000,
}: IRandomProps) {
  const [currentLights, setCurrentLights] = React.useState([]);

  React.useEffect(() => {
    const handle = setInterval(() => {
      const lights: boolean[] = [];

      for (let i = 0; i < TotalLightsCount; i++) {
        lights[i] = Math.random() > 0.9 ? true : false;
      }
      setCurrentLights(lights);
    }, delayMillis);
    return () => clearInterval(handle);
  }, [delayMillis]);

  return <RenderLights bravoDevice={bravoDevice} lights={currentLights} />;
}
