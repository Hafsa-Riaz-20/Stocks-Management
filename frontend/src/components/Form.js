import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setStock } from '../app/counterSlice';

export default function Form(props) {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.counter.value);
  const [input, setInput] = useState(0);
  
  const handleSell = () => {
    const sellQuantity = parseInt(input);
    
    if (sellQuantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    
    if (sellQuantity > value[props.index].quantity) {
      alert('You cannot sell more stocks than you own');
      return;
    }

    const updatedStocks = value.map((stock, index) => {
      if (index === props.index) {
        if (stock.quantity - sellQuantity === 0) {
          return null;
        }
        return {
          ...stock,
          quantity: stock.quantity - sellQuantity
        };
      }
      return stock;
    }).filter(stock => stock !== null);

    dispatch(setStock(updatedStocks));
    props.handleChange();
  };

  return (
    <div className="container my-5" data-testid="sell-form">
      <div className="card bg-dark text-light p-4">
        <h1>Company Name :- {value[props.index].company}</h1>
        <h1>Stocks Owned :- {value[props.index].quantity}</h1>
        <label>
          <h3>Stocks want to sell :- </h3>
        </label>
        <input
          type="number"
          value={input}
          placeholder="0"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          data-testid="input-form"
          className="form-control my-3"
        />
        <br />
        <button className="btn btn-danger" onClick={handleSell} data-testid="sell">
          Sell
        </button>
      </div>
    </div>
  );
}
