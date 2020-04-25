import { Button, Card, Col, Form, InputNumber, Layout, Row, Space } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import './ToDecimal.css';
const { Header, Content, Footer, Sider } = Layout;

interface IPlaceValue {
  placeValue: number;
  digit: string;
}

function ToDecimal() {
  const [numberBase, setNumberBase] = useState<number>(2);
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
      binaryString += Math.floor(Math.random() * Math.floor(numberBase));
    }
    setBinaryNum(binaryString);
  }

  function mapPlaceValues(str: string): void {
    const reversed = str.split('').reverse();
    const mBinaryToDecimaledValues = reversed.map((int, index): IPlaceValue => {
      if (index === 0) {
        return {
          digit: int,
          placeValue: 1,
        };
      }
      return {
        digit: int,
        placeValue: Math.pow(numberBase, index),
      };
    });

    setPlaceValueMap(mBinaryToDecimaledValues);
  }

  function renderString(): void {
    const binaryString = placeValueMap.map<ReactElement>((item, index) => {
      return (
        <span className="binaryString" key={index}>
          {item.digit} <sup className={showPlaceValue === true ? 'show' : 'hide'}><span className={item.digit !== '0' ? 'success' : 'gray'}>{item.placeValue}</span></sup>
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
      return curr.placeValue + acc;
    }, 0);

    setBinarySum(sum);
  }

  useEffect(() => {
    generateRandomBinary(digits);
  }, [digits, numberBase]);

  useEffect(() => {
    mapPlaceValues(binaryNum);
  }, [binaryNum, numberBase]);

  useEffect(() => {
    binaryToDec();
    renderString();
    renderSolution();
  }, [placeValueMap, showPlaceValue, numberBase]);

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

  function onBaseChange(val: number): void {
    setNumberBase(val);
  }

  return (
    <div className="BinaryToDecimal">

      <Header style={{ background: 'transparent' }} />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item label="Number Base">
            <InputNumber
              name="base"
              min={1}
              max={16}
              defaultValue={numberBase}
              onChange={onBaseChange}
              autoFocus={true}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={`Convert Base ${numberBase} to Decimal`}
          >
            <h2>{renderedString}<sub>{numberBase}</sub></h2>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
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
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Solution"
          >
            <h2 className="success"><strong>{showSum ? binarySum : null}</strong></h2>
            <h3><small>{showSolution ? `${solutionString} = ${binarySum}` : null}</small></h3>
          </Card>
        </Col>
      </Row>
      <Footer><a href="http://www.slashclick.com/" target="_blank">Designed by Slashclick.com</a></Footer>
    </div>
  );
}

export default ToDecimal;
