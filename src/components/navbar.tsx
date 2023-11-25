import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    // <header className="z-[999] relative navbar bg-base-100">
    //   <div className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"></div>

    //   <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
    //     <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
    //       <Link to="/" className="text-xl btn btn-ghost">
    //         daisyUI
    //       </Link>
    //     </ul>
    //   </nav>
    // </header>

    <header className="z-[999] relative">
      <div className="navbar bg-gray-400/30 fixed top-0 bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75">
        <div className="flex-1">
          <Link to="/" className="text-xl btn btn-ghost">
            WeatherLi
          </Link>
        </div>

        <div className="flex-none">
          <ul className="px-1 menu menu-horizontal">
            <li className="text-base btn btn-sm sm:btn-md btn-info dark:btn-error">
              <Link to="/login">Get Started</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
