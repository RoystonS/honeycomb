export function ShowRawInputs({ rawInputs }: { rawInputs: number[] }) {
  const text = rawInputs
    .map((value, index) =>
      index <= 5 ? value.toString() : value.toString(2).padStart(8, "0")
    )
    .join(" ");

  return (
    <>
      <h3>Raw Inputs</h3>
      <p>
        These are the raw numeric values for all of the Bravo inputs. The first
        six are numeric, and correspond to the lever axes. The rest are binary,
        and correspond to the various buttons and switches.
      </p>
      <code>{text}</code>
    </>
  );
}
