import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Sheard/Navbar/Navbar";
import Footer from "../Sheard/Footer/Footer";
import useTheme from "../hooks/useTheme";

const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-gray-900  text-gray-900 dark:text-white transition-all ease-in-out duration-500`}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
