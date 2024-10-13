import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-white shadow-md">
            <div className="p-4 flex justify-center items-center">
                <img src="src/assets/logo.png" alt="Logo" className="w-20" />
            </div>
            <ul className="space-y-8 p-4">
                <li><Link to="/dashboard" className="text-gray-800 hover:text-blue-500">Dashboard</Link></li>
                <li><Link to="/posts" className="text-gray-800 hover:text-blue-500">Posts Ouverts</Link></li>
                <li><Link to="/applications" className="text-gray-800 hover:text-blue-500">Candidatures en cours</Link></li>
                <li><Link to="/messages" className="text-gray-800 hover:text-blue-500">Messenger</Link></li>
                <li><Link to="/favourites" className="text-gray-800 hover:text-blue-500">Favourites</Link></li>
                <li><Link to="/calendar" className="text-gray-800 hover:text-blue-500">Calendar</Link></li>
                <li><Link to="/settings" className="text-gray-800 hover:text-blue-500">Settings</Link></li>
                <li><Link to="/logout" className="text-gray-800 hover:text-blue-500">Logout</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
