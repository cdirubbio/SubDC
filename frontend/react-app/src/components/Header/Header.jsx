import React, { useState } from "react";
import "./Header.css";
import { Outlet, NavLink } from "react-router-dom";
import { ReactComponent as ApartmentSVG } from "./../../images/apartment_SVG.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 title-spacing">
        <NavLink exact="true" to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
        <ApartmentSVG className="h-11 w-11" style={{ fill: "#1B263B" }} alt="SubDC Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap title-text"><strong>SUB <br className="break"/> DC</strong></span>
          

        </NavLink>
        <button
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Listings"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                }
              >
                LISTINGS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/CreateListing"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                }
              >
                CREATE
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Authentication"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                }
              >
                ACCOUNT
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </nav>
  );
}
