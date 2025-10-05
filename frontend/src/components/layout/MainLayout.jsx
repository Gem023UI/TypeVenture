import React from "react";
import Header from "./Header";
import Drawer from "./Drawer";

const MainLayout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      {/* Drawer toggle input */}
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content (main page area) */}
      <div className="drawer-content flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Drawer Sidebar */}
      <Drawer />
    </div>
  );
};

export default MainLayout;
