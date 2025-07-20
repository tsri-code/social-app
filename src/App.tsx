import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout/Layout";
import FeedPage from "./pages/FeedPage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Layout>
          <Routes>
            {/* Redirect root to feed */}
            <Route path="/" element={<Navigate to="/feed" replace />} />

            {/* Main navigation routes */}
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Legacy home route for backward compatibility */}
            <Route path="/home" element={<HomePage />} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </Routes>
        </Layout>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
