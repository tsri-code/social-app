import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
};

export default App;
