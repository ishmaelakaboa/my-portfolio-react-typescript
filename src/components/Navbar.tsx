import React from 'react'
import './Navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand">Ishmael A.</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
