import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <nav>
          <h1>D'King</h1>

          {/* Desktop Menu */}
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">Cart</a></li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#">Home</a>
            <a href="#">Product</a>
            <a href="#">Cart</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;