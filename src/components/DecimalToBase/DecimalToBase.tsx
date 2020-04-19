import { Button, Card, Col, Form, InputNumber, Layout, Row, Space } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import './DecimalToBase.css';
const { Header } = Layout;

interface IPlaceValue {
  placeValue: number;
  digit: string;
}

function DecimalToBase() {
  const [numberBase, setNumberBase] = useState<number>(2);
  const [digits, setDigits] = useState<number>(2);
  const [decimal, setDecimal] = useState<number>(0);
  const [solution, setSolution] = useState<string>('');
  const [showCalculation, setShowCalculation] = useState<boolean>(false);
  const [calculation, setCalculation] = useState<ReactElement[]>([]);
  const [showSum, setShowSum] = useState<boolean>(false);

  function onBaseChange(val: number): void {
    setNumberBase(val);
  }

  function generateRandomDecimal(digs: number): void {
    let dec = '';
    for (let i = 0; i < digs; i++) {
      dec += Math.floor(Math.random() * (9 - 1) + 1);
    }
    setDecimal(Number(dec));
  }

  function decimalToBase(dec: number, tempSolution: string, calc: ReactElement[]): void {
    if (dec <= 0) {
      setSolution(tempSolution);
      setCalculation(calc);
      return;
    }
    const result = Math.floor(dec / numberBase);
    let remainder = (dec - (numberBase * result)).toString();
    calc.push(<p>{`${dec} / ${numberBase} = rem ${remainder}`}</p>);

    remainder += tempSolution;
    return decimalToBase(result, remainder, calc);
  }

  useEffect(() => {
    decimalToBase(decimal, '', []);
  }, [decimal]);

  useEffect(() => {
    generateRandomDecimal(digits);
  }, [digits]);

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

  const toggleCalculation = React.useCallback(() => {
    setShowCalculation(!showCalculation);
  }, [showCalculation]);

  return (
    <div className="BinaryToDecimal">
      <Header style={{ background: 'transparent' }} />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item label="Number Base">
            <InputNumber
              name="base"
              min={1}
              max={100}
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
            title={`Convert Decimal to Base ${numberBase}`}
          >
            <h2>{decimal}</h2>
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
            <Button onClick={toggleCalculation}>
              {showCalculation ? 'Hide Calculation' : 'Show Calculation'}
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Solution"
          >
            <h2 className="success">{showSum ? solution : null}</h2>
            {showCalculation ? calculation.reverse().map((item) => item) : null}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DecimalToBase;
