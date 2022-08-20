import "./ButtonDisplay.css";
import { booleanInputNames } from "./InputsInfo";

export function ButtonDisplay({ buttons }: { buttons: boolean[] }) {
  return (
    <>
      <h3>Buttons</h3>
      <p>
        These are the states of all of the Bravo inputs. Full details of all of
        the inputs can be found at{" "}
        <a href="https://github.com/RoystonS/honeycomb/blob/main/bravo-controls.md">
          my control mappings page
        </a>
        .
      </p>

      <div className="buttonDisplay">
        <ButtonSection buttons={buttons} start={0} end={47} />
        {/* <ButtonSection buttons={buttons} start={0} end={7} />
        <ButtonSection buttons={buttons} start={8} end={11} />
        <ButtonSection buttons={buttons} start={12} end={15} />
        <ButtonSection buttons={buttons} start={16} end={20} />
        <ButtonSection buttons={buttons} start={21} end={22} />
        <ButtonSection buttons={buttons} start={23} end={27} />
        <ButtonSection buttons={buttons} start={28} end={29} />
        <ButtonSection buttons={buttons} start={30} end={32} />
        <ButtonSection buttons={buttons} start={33} end={40} />
        <ButtonSection buttons={buttons} start={41} end={46} />
        <ButtonSection buttons={buttons} start={47} end={47} /> */}
      </div>
      <legend className="buttonNotes">
        Notes:
        <ul>
          <li>
            'Axis N Detent' refers to a switch which is enabled when lever N is
            pulled back to before the 'Flight Detent' marker.
          </li>
          <li>
            Buttons on axis levers are a little curious; there are two types:
            <ul>
              <li>
                <code>A</code> which is the 'Go Around' button the 'GA' axis
                levers and the 'Reverser' flip switch on the 'Commercial' levers
              </li>
              <li>
                <code>B</code> is the red TOGA button found on 'Commercial'
                lever 1
              </li>
            </ul>
          </li>
        </ul>
      </legend>
    </>
  );
}

interface ButtonSectionProps {
  buttons: boolean[];
  start: number;
  end: number;
}
function ButtonSection({ buttons, start, end }: ButtonSectionProps) {
  const els: JSX.Element[] = [];

  for (let i = start; i <= end; i++) {
    const on = buttons[i];

    let classes = "button";
    classes += on ? " on" : " off";
    if (i === start) {
      classes += " first-column";
    }
    els.push(
      <span key={i} className={classes}>
        {i + 1} ({booleanInputNames[i]})
      </span>
    );
  }
  return <>{els}</>;
}
