import React from 'react';
import '../styles/App.css'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="nav">
      <Link className="router-link no-hover" to="/"><h1 className="logo-icon">Momster's&nbsp;Recipes </h1></Link>
      <ul className="nav-links">
        <Link className="router-link" to="/" ><li className="nav-item">Recipes</li></Link>
        <Link className="router-link" to="/compose" ><li className="nav-item">Compose</li></Link>
      </ul>
    </nav>
  )
}

export default Nav;