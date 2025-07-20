import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/Logo.svg";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header page__section">
      <div className="header__container">
        <Link to="/feed" className="header__logo-link">
          <img src={logo} alt="Spots logo" className="header__logo" />
        </Link>

        <form className="header__search" onSubmit={handleSearch}>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="header__search-button">
            🔍
          </button>
        </form>

        <div className="header__actions">
          <button className="header__notification-btn">🔔</button>
          <Link to="/profile" className="header__profile-link">
            👤
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
