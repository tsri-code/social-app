import React, { ReactNode } from "react";
import Header from "./Header";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page">
      <Header />
      <main className="content page__section">{children}</main>
      <footer className="footer">
        <p className="footer__copyright">2024 © Spots</p>
      </footer>
    </div>
  );
};

export default Layout;
