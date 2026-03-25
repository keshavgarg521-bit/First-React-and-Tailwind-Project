import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full flex gap-10 justify-center border-b border-gray-700'>
      <NavLink to={"/"}>
        Home
      </NavLink>
      <NavLink to={"/pastes"}>
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar