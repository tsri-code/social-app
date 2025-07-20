import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import "./SettingsPage.css";

const SettingsPage: React.FC = () => {
  const { state } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("public");

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage your account and preferences</p>
      </div>

      <div className="settings-content">
        <section className="settings-section">
          <h2 className="settings-section-title">Account</h2>
          <div className="settings-item">
            <div className="settings-item-info">
              <h3>Profile</h3>
              <p>Update your profile information</p>
            </div>
            <button className="settings-button">Edit Profile</button>
          </div>
          <div className="settings-item">
            <div className="settings-item-info">
              <h3>Email</h3>
              <p>{state.user?.name || "Not specified"}</p>
            </div>
            <button className="settings-button">Change Email</button>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section-title">Preferences</h2>
          <div className="settings-item">
            <div className="settings-item-info">
              <h3>Dark Mode</h3>
              <p>Switch between light and dark themes</p>
            </div>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <span className="settings-slider"></span>
            </label>
          </div>
          <div className="settings-item">
            <div className="settings-item-info">
              <h3>Notifications</h3>
              <p>Receive updates about your posts</p>
            </div>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="settings-slider"></span>
            </label>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section-title">Privacy</h2>
          <div className="settings-item">
            <div className="settings-item-info">
              <h3>Account Privacy</h3>
              <p>Control who can see your posts</p>
            </div>
            <select
              className="settings-select"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
