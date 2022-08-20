import "./ButtonDisplay.css";

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
        {buttons.map((on, i) => {
          return (
            <span key={i} className={on ? "button on" : "button off"}>
              {i + 1}
            </span>
          );
        })}
      </div>
    </>
  );
  /*
    for (let i = 0; i < 6; i++) {
        const buttons = values[i + 6];
        for (let b = 0; b < 8; b++) {
          const style = buttonElements[i * 8 + b].style;
          const pressed = buttons & (1 << b);
          style.backgroundColor = pressed ? "red" : "transparent";
          style.color = pressed ? "white" : "inherit";
        }
      }*/
}
