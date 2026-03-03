import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, MyFund, MyStocks } from './pages';

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <Router>
        <Navbar search={search} onSearchChange={handleSearch} />
        <Routes>
          <Route path="/" exact element={<Home search={search} />} />
          <Route path="/stocks" exact element={<MyStocks />} />
          <Route path="/fund" exact element={<MyFund />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;