import React from "react";
import "./Header.css";
import { Outlet, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <NavLink exact="true" to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={require("./../../images/logo.jpg")} className="h-11" alt="SubDC Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">SubDC</span>
        </NavLink>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Listings"
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                }
              >
                Listings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/CreateListing"
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 '
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                }
              >
                Create a Listing
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/AboutUs"
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }
              >
                About Us
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/Authentication"
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 '
                    : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                }
              >
                Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </nav>
  );
}