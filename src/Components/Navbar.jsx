import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, userLogout } = use(AuthContext)
    const handleLogout = () => {
        userLogout()
            .then(() => {
                console.log('Logout user')
            })
            .catch(error => {
                console.log(error)
            })
    }
   const navLinks = (
        <>
            <li>
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-sky-400 font-semibold' : 'hover:text-indigo-400'}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to='/bookshelf' className={({ isActive }) => isActive ? 'text-sky-400 font-semibold' : 'hover:text-indigo-400'}>
                    Book Shelf
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-gray-50 shadow-md px-4 py-2 sticky top-0 z-50">
            {/* Left: Logo & Mobile menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10m-10 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
               <div className='flex items-center gap-1'>
                    <img src="/readtracker.png" alt="" className='w-[46px]' />
                    <NavLink to="/" className="text-2xl font-bold text-[#2D3436]">Read<span className='text-2xl font-bold text-sky-400'>Tracker</span></NavLink>
                </div>
            </div>

            {/* Center: Links (Desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3 text-gray-700">
                    {navLinks}
                </ul>
            </div>

            {/* Right: Auth buttons */}
            <div className="navbar-end space-x-2">
                {user ? (
                    <button onClick={handleLogout} className="btn bg-indigo-500 text-white hover:bg-indigo-600">
                        Logout
                    </button>
                ) : (
                    <>
                        <NavLink to="/register" className="btn btn-outline btn-primary">
                            Register
                        </NavLink>
                        <NavLink to="/login" className="btn btn-outline btn-info">
                            Login
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;