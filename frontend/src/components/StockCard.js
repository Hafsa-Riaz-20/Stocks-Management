import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStock, setStock } from "../app/counterSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockCard(props) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const boughtStocks = useSelector((state) => state.counter.value);

  function disabled() {
    if (quantity <= 0) {
      return true;
    }
    return false;
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuy = () => {
    if (quantity > 0) {
      const existingStock = boughtStocks.find(
        (stock) => stock.company === props.value.company
      );

      if (existingStock) {
        const updatedStock = {
          ...existingStock,
          quantity: existingStock.quantity + quantity,
        };
        const updatedStocks = boughtStocks.map((stock) =>
          stock.company === props.value.company ? updatedStock : stock
        );
        dispatch(setStock(updatedStocks));
      } else {
        dispatch(
          addStock({
            company: props.value.company,
            price: props.value.price,
            quantity: quantity,
          })
        );
      }
      setQuantity(0);
    }
  };

  const generateChartData = () => {
    const prices = [
      props.value.price * 0.95,
      props.value.price * 0.98,
      props.value.price * 0.96,
      props.value.price * 1.02,
      props.value.price * 1.05,
      props.value.price * 1.03,
      props.value.price,
    ];

    return {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: `${props.value.company} Price Trend`,
          data: prices,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.1)",
          tension: 0.1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div
      className="col-sm-4 mx-auto my-5"
      data-testid={props.value.company}
    >
      <div className="card width bg-dark">
        <div className="card-body text-light">
          <h5 className="card-title" data-testid={props.value.company}>
            {props.value.company}
          </h5>
          <p className="card-text">Price :- {props.value.price}</p>
          <p className="card-text">
            Quantity :- <span data-testid="quantity">{quantity}</span>
          </p>
          <p className="card-text">
            Total Value ={' '}
            <span data-testid="totalPrice">{quantity * props.value.price}</span>
          </p>

          {/* Chart */}
          <div style={{ height: "250px", marginBottom: "20px" }}>
            <Line data={generateChartData()} options={chartOptions} />
          </div>

          <button
            className="btn btn-primary text-light mx-1"
            data-testid="increment"
            onClick={handleIncrement}
          >
            Increment
          </button>
          <button
            className="btn btn-primary text-light mx-1"
            disabled={disabled()}
            data-testid="decrement"
            onClick={handleDecrement}
          >
            Decrement
          </button>
          <button
            className="btn btn-success text-light mx-1 my-auto"
            data-testid={`addCart-${props.value.company}`}
            onClick={handleBuy}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}