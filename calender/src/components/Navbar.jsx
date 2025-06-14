import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purple-600 text-white py-4 px-6 shadow-md flex flex-wrap items-center justify-between">
      <h1 className="text-xl font-bold">Event Planner</h1>

      <div className="flex gap-4 text-sm sm:text-base">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold underline"
              : "hover:underline transition duration-150"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            isActive
              ? "font-semibold underline"
              : "hover:underline transition duration-150"
          }
        >
          Calendar
        </NavLink>

        <NavLink
          to="/all-events"
          className={({ isActive }) =>
            isActive
              ? "font-semibold underline"
              : "hover:underline transition duration-150"
          }
        >
          All Events
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
