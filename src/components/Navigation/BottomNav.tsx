import React from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./BottomNav.css";

// Icons (we'll use text icons for now, can be replaced with actual icons later)
const HomeIcon = () => <span className="nav-icon">🏠</span>;
const ExploreIcon = () => <span className="nav-icon">🔍</span>;
const AddIcon = () => <span className="nav-icon">➕</span>;
const ProfileIcon = () => <span className="nav-icon">👤</span>;
const SettingsIcon = () => <span className="nav-icon">⚙️</span>;

const BottomNav: React.FC = () => {
  const { state } = useAppContext();

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__container">
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
          }
        >
          <HomeIcon />
          <span className="bottom-nav__label">Home</span>
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
          }
        >
          <ExploreIcon />
          <span className="bottom-nav__label">Explore</span>
        </NavLink>

        <button className="bottom-nav__item bottom-nav__add-button">
          <AddIcon />
          <span className="bottom-nav__label">Add</span>
        </button>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
          }
        >
          {state.user ? (
            <img
              src={state.user.avatar}
              alt="Profile"
              className="bottom-nav__avatar"
            />
          ) : (
            <ProfileIcon />
          )}
          <span className="bottom-nav__label">Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
          }
        >
          <SettingsIcon />
          <span className="bottom-nav__label">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
