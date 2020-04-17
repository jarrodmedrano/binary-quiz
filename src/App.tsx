import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';

interface IPlaceValue {
  placeValue: number;
  digit: string;
}

function App() {
  const [digits, setDigits] = useState<number>(0);
  const [binaryNum, setBinaryNum] = useState<string>('');
  const [placeValueMap, setPlaceValueMap] = useState<IPlaceValue[]>([]);
  const [binarySum, setBinarySum] = useState<number>(0);
  const [showSum, setShowSum] = useState<boolean>(false);
  const [showPlaceValue, setShowPlaceValue] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [renderedString, setRenderedString] = useState<ReactElement[]>([]);
  const [solutionString, setSolutionString] = useState<string>('');

  function generateRandomBinary(numbers: number): void {
    let binaryString = '';
    for (let i = 0; i < numbers; i++) {
      binaryString += (Math.random() > 0.5) ? 1 : 0;
    }
    setBinaryNum(binaryString);
  }

  function mapPlaceValues(str: string): void {
    const reversed = str.split('').reverse();
    const mappedValues = reversed.map((int, index): IPlaceValue => {
      if (index === 0) {
        return {
          digit: int,
          placeValue: 1,
        };
      }
      return {
        digit: int,
        placeValue: Math.pow(2, index),
      };
    });

    setPlaceValueMap(mappedValues);
  }

  function renderString(): void {
    const binaryString = placeValueMap.map<ReactElement>((item, index) => {
      return (
        <span className="binaryString" key={index}>
          {item.digit} <sup className={showPlaceValue === true ? 'show' : 'hide'}><span className={item.digit === '1' ? 'success' : 'gray'}>{item.placeValue}</span></sup>
        </span>
      );
    });

    setRenderedString(binaryString.reverse());
  }

  function renderSolution(): void {
    const str = placeValueMap.reduce<number[]>((acc, curr, index): number[] => {
      return curr.digit === '0' ? acc : acc.concat(curr.placeValue);
    }, []);
    setSolutionString(str.join('+'));
  }

  function binaryToDec(): void {
    const sum = placeValueMap.reduce((acc, curr) => {
      if (curr.digit === '0') {
        return acc;
      }
      // setAdditionString(`${curr.placeValue} + ${acc}`);
      return curr.placeValue + acc;
    }, 0);

    setBinarySum(sum);
  }

  useEffect(() => {
    generateRandomBinary(digits);
  }, [digits]);

  useEffect(() => {
    mapPlaceValues(binaryNum);
  }, [binaryNum]);

  useEffect(() => {
    binaryToDec();
    renderString();
    renderSolution();
  }, [placeValueMap, showPlaceValue]);

  useEffect(() => {
    setDigits(5);
  }, []);

  const decrement = React.useCallback(() => {
    setDigits(() => digits - 1);
  }, [digits]);

  const increment = React.useCallback(() => {
    setDigits(() => digits + 1);
  }, [digits]);

  const toggleSum = React.useCallback(() => {
    setShowSum(!showSum);
  }, [showSum]);

  const togglePlaceValue = React.useCallback(() => {
    setShowPlaceValue(!showPlaceValue);
  }, [showPlaceValue]);

  const toggleCalculation = React.useCallback(() => {
    setShowSolution(!showSolution);
  }, [showSolution]);

  return (
    <div className="App">
      <header className="App-header">
        Binary Quiz
      </header>
      <p>{renderedString}<sub>2</sub></p>
      <p className="success"><strong>{showSum ? binarySum : null}</strong></p>
      <p><small>{showSolution ? `${solutionString} = ${binarySum}` : null}</small></p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={toggleSum}>
        {showSum ? 'Hide result' : 'Show result'}
      </button>
      <button onClick={togglePlaceValue}>
        {showPlaceValue ? 'Hide Place Values' : 'Show place Values'}
      </button>
      <button onClick={toggleCalculation}>
        {showSolution ? 'Hide Calculation' : 'Show Calculation'}
      </button>
    </div>
  );
}

export default App;
