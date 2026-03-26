import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="w-full flex gap-10 justify-center items-center py-3 border-b border-gray-300 bg-white shadow-sm">
  
  <NavLink
    to="/"
    className={({ isActive }) =>
      `text-lg font-medium transition duration-200 ${
        isActive
          ? "text-sky-600 border-b-2 border-sky-600 pb-1"
          : "text-gray-700 hover:text-sky-600"
      }`
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/pastes"
    className={({ isActive }) =>
      `text-lg font-medium transition duration-200 ${
        isActive
          ? "text-sky-600 border-b-2 border-sky-600 pb-1"
          : "text-gray-700 hover:text-sky-600"
      }`
    }
  >
    Pastes
  </NavLink>

</div>
  )
}

export default Navbar