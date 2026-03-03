import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, MyFund, MyStocks } from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/stocks" exact element={<MyStocks />} />
          <Route path="/fund" exact element={<MyFund />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;