import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ search, onSearchChange }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ">
        <li className="nav-item active">
          <NavLink className="nav-link text-light mx-5" to="/" data-testid="Home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light mx-5" to="/stocks" data-testid="My_Stocks">My_Stocks</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light mx-5" to="/fund" data-testid="My_Fund">My_Fund</NavLink>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0 ms-auto">
        <input 
          className="form-control mr-sm-3" 
          type="search" 
          data-testid="search" 
          placeholder="Search" 
          aria-label="Search" 
          value={search} 
          onChange={onSearchChange}
        />
      </form>
    </div>
    </nav>

  );
}
