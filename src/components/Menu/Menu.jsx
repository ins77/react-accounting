import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <NavLink to="/history">History</NavLink>
    </nav>
  );
}

export default Menu;
