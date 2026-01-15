import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot/Chatbot";


export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-page-bg">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Chatbot />
      <footer className="border-t text-sm text-gray-600 py-4 text-center">
        © {new Date().getFullYear()} Cartify — Demo
      </footer>
    </div>
  );
}
