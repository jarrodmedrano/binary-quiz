import { Button, Card, Col, Row, Space } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
const { Meta } = Card;

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
    if (digits > 1) {
      setDigits(() => digits - 1);
    }
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
    <Row justify="center" gutter={16}>
      <Col span={12}>
        <div className="App">
          <Space direction="vertical">
            <Card
              title="Convert Binary to Decimal"
            >
              <h2>{renderedString}<sub>2</sub></h2>
              <h2 className="success"><strong>{showSum ? binarySum : null}</strong></h2>
              <h3><small>{showSolution ? `${solutionString} = ${binarySum}` : null}</small></h3>
            </Card>
          </Space>
          <br /><br />
          <Space>
            <Button type="primary" shape="circle" onClick={increment}>+</Button>
            <Button type="primary" shape="circle" onClick={decrement}>-</Button>
            <Button onClick={toggleSum}>
              {showSum ? 'Hide result' : 'Show result'}
            </Button>
            <Button onClick={togglePlaceValue}>
              {showPlaceValue ? 'Hide Place Values' : 'Show place Values'}
            </Button>
            <Button onClick={toggleCalculation}>
              {showSolution ? 'Hide Calculation' : 'Show Calculation'}
            </Button>
          </Space>
        </div>
      </Col>
    </Row>
  );
}

export default App;
