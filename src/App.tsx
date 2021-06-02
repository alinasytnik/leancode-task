import { ChangeEvent, useState } from "react";
import "./styles.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [medianValue, setMedianValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInputValue(newValue);
    let isError = false;
    const newArr = newValue
      .split(",")
      .map((el) => {
        if (el === "") {
          return undefined;
        }

        const numFromEl = Number(el);
        if (isNaN(numFromEl)) {
          setMedianValue("Błąd!");
          isError = true;
          return undefined;
        }

        return numFromEl;
      })
      .filter((el) => el) as number[];

    if (isError) {
      return;
    }
    setMedianValue("");
    if (newArr.length === 0) {
      return;
    }

    const isOdd = newArr.length % 2 !== 0;
    const median = isOdd
      ? newArr[(newArr.length - 1) / 2]
      : (newArr[newArr.length / 2] + newArr[newArr.length / 2 - 1]) / 2;
    setMedianValue(String(median));
  }

  return (
    <div className="content">
      <div className="median">{medianValue}</div>
      <input value={inputValue} onChange={handleChange} />
    </div>
  );
}
