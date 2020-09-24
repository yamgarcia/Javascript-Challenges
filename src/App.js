import React, { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    uInput: "",
    uPattern: 0,
  });
  const [patterns, setPatterns] = useState(null);

  const handleChange = (e) =>
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });

  const { uInput, uPattern } = userInput;

  function findPattern(input, patternLength) {
    console.log("foundPatterns");
    if (
      patternLength === null ||
      input === null ||
      typeof patternLength === "undefined" ||
      typeof input === "undefined"
    ) {
      return `Neither input or patternLength can be null or undefined`;
    }

    if (typeof input !== "string") {
      return `input ${input} is not a string`;
    }

    if (typeof patternLength !== "number") {
      return `patternLength ${patternLength} is not a number`;
    }

    if (patternLength < 0) {
      return `patternLength can't be negative, was: ${patternLength}`;
    }

    if (input.legth < patternLength) {
      return `input length can't be smaller than pattern length`;
    }

    const foundPatterns = {};
    for (let i = 0; i < input.length - (patternLength - 1); i++) {
      let pattern = input.substring(i, i + patternLength);
      const escapedPattern = pattern.replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        "\\$&"
      );
      const reg = RegExp(escapedPattern, "g");
      let occurrences = (input.match(reg) || []).length;
      if (occurrences > 1 && !Object.keys(foundPatterns).includes(pattern))
        foundPatterns[pattern] = occurrences;
    }
    console.log(foundPatterns);
    return setPatterns(foundPatterns);
  }

  return (
    <>
      <label>String Pattern: </label>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        type='text'
        id='str'
        value={uInput}
        name='uInput'
      />{" "}
      <br />
      <label>Pattern Length: </label>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        type='number'
        id='freq'
        value={uPattern}
        name='uPattern'
      />{" "}
      <br />
      <button
        id='b'
        className='myButton'
        onClick={(e) => findPattern(uInput, uPattern)}
      >
        <span>Result</span>
      </button>
      <hr />
      {/* <p>{patterns && <span> {patterns} </span>}</p> */}
      <p>
        <span id='display'>{patterns}</span>
      </p>
    </>
  );
}

export default App;
