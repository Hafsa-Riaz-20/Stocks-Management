import React from "react"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { setStock } from "../app/counterSlice";
import Table from "../components/Table";
import Form from "../components/Form";

export default function MyStocks() {
  const [form, setForm] = useState(0);
  const [index, setIndex] = useState(0);
  var sum = 0;

  const value = useSelector((state) => state.counter.value)

  const handleRemove = (i) => {
    setIndex(i)
    setForm(1);
  }

  const handleChange = () => { setForm(0); }

  if (form == 1) { return <Form index={index} handleChange={handleChange} data-testid="form" /> }

  if (form == 0) {
    return (
      <div>
        <h1 className="text-center my-5">Your Portfolio</h1>
        <div className="container-fluid my-5">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Bought At</th>
                <th scope="col">Current Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {value.map((stock, index) => {
                sum += (stock.quantity * stock.price)
                return (
                  <Table stock={stock} index={index} handleRemove={handleRemove} data-testid={stock.company} key={index} />
                );
              })}
              <tr>
                <th scope="row">NetWorth</th>
                <td></td>
                <td>Rs <span data-testid="totalPrice-MyStocks">{sum}</span></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
