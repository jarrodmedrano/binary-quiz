import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [digits, setDigits] = useState(0);
  const [binaryNum, setBinaryNum] = useState('');

  function generateRandomBinary(digits) {
    let binaryString = '';

    for(let i = 0; i < digits; i++) {
      binaryString += (Math.random()>0.5)? 1 : 0;
    }

    setBinaryNum(binaryString);
  }

  function binarytoDec(binaryString) {
    const splitBinary = binaryString.split('');

    splitBinary.map((digit, index) => {
      
    })
  }

  useEffect(() => {
    generateRandomBinary(digits);
  }, [digits])

  return (
    <div className="App">
      <header className="App-header">
        Binary Quiz
      </header>

      <p>{ 
     binaryNum
      }</p>
      <button onClick={() => setDigits(digits - 1)}>
        -
      </button>
      <button onClick={() => setDigits(digits + 1)}>
        +
      </button>
    </div>
  );
}

export default App;
