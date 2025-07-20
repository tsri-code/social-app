import React from "react";
import "./Header.css";
import logo from "../../assets/images/Logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header page__section">
      <img src={logo} alt="Spots logo" className="header__logo" />
    </header>
  );
};

export default Header;
