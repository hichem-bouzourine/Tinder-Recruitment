// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiMessageSquare, FiHeart, FiCalendar, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove the user from localStorage
        navigate('/'); // Redirect to the front page
    };

    return (
        <div className="h-screen w-64 bg-white shadow-md">
            <div className="p-4 flex justify-center items-center cursor-pointer">
                <Link to="/">
                    <img src="src/assets/logo.png" alt="Logo" className="w-20" />
                </Link>
            </div>
            <ul className="space-y-8 p-4">
                <li>
                    <Link to="/dashboard" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiHome className="mr-3" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/posts" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiFileText className="mr-3" /> Posts Ouverts
                    </Link>
                </li>
                <li>
                    <Link to="/applications" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiMessageSquare className="mr-3" /> Candidatures en cours
                    </Link>
                </li>
                <li>
                    <Link to="/messages" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiMessageSquare className="mr-3" /> Messenger
                    </Link>
                </li>
                <li>
                    <Link to="/favourites" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiHeart className="mr-3" /> Favourites
                    </Link>
                </li>
                <li>
                    <Link to="/calendar" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiCalendar className="mr-3" /> Calendar
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiSettings className="mr-3" /> Settings
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-gray-800 hover:text-blue-500 w-full text-left"
                    >
                        <FiLogOut className="mr-3" /> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
