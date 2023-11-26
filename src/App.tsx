import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import ThemeSwitch from "./components/theme-switch";
import ThemeContextProvider from "./context/theme-context";
import Home from "./pages/home";
import Footer from "./components/footer";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import AuthContextProvider from "./context/auth-context";

function App() {
  return (
    <div className="!scroll-smooth h-full">
      <div className="relative h-full bg-opacity-100 bg-gray-50/10 text-gray-950 pt-28 sm:pt-36 dark:bg-gray-900/10 dark:text-gray-50 dark:text-opacity-90">
        {/* <div className="flex min-h-screen flex-col m-auto min-w-[300px] max-w-7xl p-4"> */}
        <div className=" bg-[#fbe2e3] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]" />
        <div className=" bg-[#dbd7fb] absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]" />
        <ThemeContextProvider>
          <AuthContextProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
              <Footer />
            </BrowserRouter>

            <Toaster position="top-right" />
            <ThemeSwitch />
          </AuthContextProvider>
        </ThemeContextProvider>
      </div>
    </div>
  );
}

export default App;
