import React from 'react';
import { Link, NavLink } from 'react-router';


const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 pt-10 pb-5 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                {/* Logo & About */}
                <div>
                    <div className='flex items-center gap-1'>
                        <img src="/readtracker.png" alt="" className='w-[46px]' />
                        <NavLink to="/" className="text-2xl font-bold text-[#2D3436]">Read<span className='text-2xl font-bold text-sky-400'>Tracker</span></NavLink>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Your smart bookshelf. Discover, track, and review your favorite books.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/bookshelf">Bookshelf</Link></li>
                        <li><Link to="/add-book">Add Book</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Resources</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Terms & Privacy</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
                    <p className="text-sm">Email: support@readtracker.app</p>
                    <p className="text-sm">Dhaka, Bangladesh</p>
                    <div className="flex gap-3 mt-2">
                        <a href="#" className="text-indigo-500 hover:text-indigo-700"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="text-indigo-500 hover:text-indigo-700"><i className="fab fa-github"></i></a>
                        <a href="#" className="text-indigo-500 hover:text-indigo-700"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="text-center text-sm mt-10 border-t pt-5 text-gray-400">
                © {new Date().getFullYear()} ReadTracker. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
