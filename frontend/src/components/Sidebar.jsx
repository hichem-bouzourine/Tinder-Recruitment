import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiMessageSquare, FiHeart, FiCalendar, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false); // State to toggle sidebar
    const navigate = useNavigate();

    const [user, setUser] = useState({});  // Store user object directly

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Set user state

    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove the user from localStorage
        navigate('/'); // Redirect to the front page
    };

    return (
        <div className={`h-screen bg-white shadow-md transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            {/* Toggle Button */}
            <div className="flex justify-between items-center cursor-pointer">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="focus:outline-none bg-white hover:bg-slate-200">
                    <FiMenu className="text-gray-800 bg-inherit " size={24} />
                </button>
                {!isCollapsed && (
                    <Link to="/">
                        <img src="src/assets/logo.png" alt="Logo" className="w-20" />
                    </Link>
                )}
            </div>

            {/* Navigation Links */}
            <ul className="space-y-8 p-4">
                <li>
                    <Link to="/dashboard" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiHome className="mr-3" size={20} />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/postsOuverts" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiFileText className="mr-3" size={20} />
                        {!isCollapsed && <span>Posts Ouverts</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/candidaturesRecus" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiMessageSquare className="mr-3" size={20} />
                        {!isCollapsed &&
                            (user?.role === 'RECRUITER' ? <span>Candidatures reçues</span> :
                                <span>Candidatures en cours</span>)}
                    </Link>
                </li>
                <li>
                    <Link to="/messaging" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiMessageSquare className="mr-3" size={20} />
                        {!isCollapsed && <span>Messenger</span>}
                    </Link>
                </li>
                {/* <li>
                    <Link to="/favourites" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiHeart className="mr-3" size={20} />
                        {!isCollapsed && <span>Favourites</span>}
                    </Link>
                </li> */}
                <li>
                    <Link to="/calendar" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiCalendar className="mr-3" size={20} />
                        {!isCollapsed && <span>Calendar</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className="flex items-center text-gray-800 hover:text-blue-500">
                        <FiSettings className="mr-3" size={20} />
                        {!isCollapsed && <span>Settings</span>}
                    </Link>
                </li>
                <li
                    onClick={handleLogout}
                    className="flex items-center text-gray-800 hover:text-blue-500 w-full text-left cursor-pointer"
                >
                    <FiLogOut className="mr-3" size={20} />
                    {!isCollapsed && <span>Logout</span>}

                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
