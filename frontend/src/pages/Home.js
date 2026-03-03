import React from 'react';
import { useEffect, useState } from 'react';
import StockCard from '../components/StockCard';
import { useDispatch } from 'react-redux';
import { changeData } from '../app/stockSlice';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

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
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <input 
              className="form-control mr-sm-3" 
              type="search" 
              data-testid="search" 
              placeholder="Search" 
              aria-label="Search" 
              value={search} 
              onChange={(e) => { handleSearch(e); }} 
            />
          </form>
        </div>
      </nav>

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
