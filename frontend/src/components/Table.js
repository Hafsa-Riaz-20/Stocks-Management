import React from "react";
import { useSelector } from "react-redux";

const Table = (props) => {
  const valu = useSelector((state) => state.stock.value)
  function currentPrice(val){
    var y;
    valu.map((x) => {
      if(x.company == val.company){
        y = x.price;
      }
    })
    return y;
  }

  var currentValue = currentPrice(props.stock);
  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      <td data-testid={`${props.stock.company}-table`}>{props.stock.company}</td>
      <td>Rs{props.stock.price}</td>
      <td>{props.stock.quantity}</td>
      <td>Rs{props.stock.quantity*props.stock.price}</td>
      <td>Rs{currentValue*props.stock.quantity}</td>
      <td>
        <button 
          className="btn btn-danger"
          onClick={() => {
            props.handleRemove(props.index);
          }}
          data-testid = "sell"
        >
          Sell
        </button>
      </td>
    </tr>
  );
};

export default Table;
