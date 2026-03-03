import React from "react"
import { useSelector } from "react-redux";

export default function MyFund() {
  const value = useSelector((state) => state.counter.value)
  var sum = 0;
  value.map((val) => {sum += val.quantity*val.price})
  return (
    <div className="text-center my-5">
      <h1>Total Fund :-Rs<span data-testid="fund">{10000}</span></h1>
      <br/>
      <h1>Total Value of Stock Bought :- Rs <span data-testid="stock-fund">{sum}</span></h1>
      <br/>
      <h1>Remaing Fund :- Rs <span data-testid="remaining-fund">{10000 - sum}</span></h1>
    </div>
  );
}
