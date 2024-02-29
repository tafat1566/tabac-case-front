// NumericKeypad.js
import React from 'react';
import { Button } from 'react-bootstrap';

function NumericKeypad({ handleInput }) {
  return (
    <div className="numeric-keypad">
      <Button variant="outline-secondary" onClick={() => handleInput('1')}>1</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('2')}>2</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('3')}>3</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('4')}>4</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('5')}>5</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('6')}>6</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('7')}>7</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('8')}>8</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('9')}>9</Button>
      <Button variant="outline-secondary" onClick={() => handleInput('0')}>0</Button>
    </div>
  );
}

export default NumericKeypad;
