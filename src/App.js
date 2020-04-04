import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [digits, setDigits] = useState(0);
  const [binaryNum, setBinaryNum] = useState('');
  const [placeValueMap, setPlaceValueMap] = useState([]);
  const [binarySum, setBinarySum] = useState(0);
  const [showSum, setShowSum] = useState(false);
  const [showPlaceValue, setShowPlaceValue] = useState(false);
  const [renderedString, setRenderedString] = useState([]);
  

  function generateRandomBinary(digits) {
    let binaryString = '';

    for(let i = 0; i < digits; i++) {
      binaryString += (Math.random()>0.5)? 1 : 0;
    }

    setBinaryNum(binaryString);
  }

  function mapPlaceValues(string) {
    const reversed = string.split('').reverse();
    const placeValueMap = reversed.map((digit, index) => {
      if(index === 0) return {
        placeValue: 1,
        digit: digit
      } 
      return {
        placeValue: Math.pow(2,index),
        digit: digit
      }
    });

    setPlaceValueMap(placeValueMap);
  }

  function renderString() {
    const string = placeValueMap.map((item, index) => {
      return (
        <span className="binaryString" key={index}>
          {item.digit} <sup className={showPlaceValue === true ? "show" : "hide"}>{item.placeValue}</sup>
        </span>
      )
    })

    setRenderedString(string.reverse());
  }

  function binaryToDec() {
    const sum = placeValueMap.reduce((acc, curr) => {
      if(curr.digit == 0) return acc;
      return curr.placeValue + acc;
    }, 0);

    setBinarySum(sum);
  }

  useEffect(() => {
    generateRandomBinary(digits);
  }, [digits])

  useEffect(() => {
    mapPlaceValues(binaryNum);
  }, [binaryNum]);

  useEffect(() => {
    binaryToDec();
    renderString();
  }, [placeValueMap, showPlaceValue])

  useEffect(() => {
    setDigits(5);
  }, [])

  useEffect(() => {
    console.log(showPlaceValue);
  }, [showPlaceValue])

  return (
    <div className="App">
      <header className="App-header">
        Binary Quiz
      </header>

      <p>{ 
    renderedString
      }<sub>2</sub>
      </p>

    <p>{showSum ? binarySum : null}</p>
      <button onClick={() => setDigits(digits - 1)}>
        -
      </button>
      <button onClick={() => setDigits(digits + 1)}>
        +
      </button>
      <button onClick={() => setShowSum(!showSum)}>
        {showSum ? 'Hide result' : 'Show result'}
      </button>
      <button onClick={() => setShowPlaceValue(!showPlaceValue)}>
        {showPlaceValue ? 'Hide Place Values' : 'Show place Values'}
      </button>
    </div>
  );
}

export default App;
