import React from 'react';
import { useEffect, useState } from 'react';
import StockCard from '../components/StockCard';
import { useDispatch } from 'react-redux';
import { changeData } from '../app/stockSlice';
import axios from 'axios';

export default function Home({ search }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  async function getData() {
    try {
      const response = await axios.get(
        'https://s3-ap-southeast-1.amazonaws.com/he-public-data/db12a41f8.json'
      );
      setData(response.data.stocks);
      dispatch(changeData(response.data.stocks));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="text-center my-5">DashBoard</h1>

      <div className="container">
        <div className="row">
          {loading ? (
            <p className="text-center">Loading stocks...</p>
          ) : (
            data.map((value) => {
              if (search == "") {
                return <StockCard key={value.company} value={value} data-testid={value.company} />;
              }
              else {
                if (value.company.toLowerCase().includes(search.toLowerCase())) {
                  return <StockCard key={value.company} value={value} data-testid={value.company} />;
                }
              }
            })
          )}
        </div>
      </div>
    </div>
  );
}
