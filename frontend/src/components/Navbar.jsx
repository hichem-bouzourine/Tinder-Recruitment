// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function Navbar() {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove the user from localStorage
        window.location.href = '/'; // Redirect to the front page
    };

    return (
        <nav className="bg-white border-b border-blue-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="src/assets/logo.png" alt="Logo" className="w-11 h-11" />
                    <span className="font-bold text-lg">WOLF STREET</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                    {user?.role != 'RECRUITER' &&

                        <Link to={`${user?.role == 'STUDENT' ? '/offers' : '/login'}`} className="text-gray-600 hover:text-blue-600">Find an alternation</Link>
                    }
                    {user &&
                        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                    }
                </div>
                {!user &&
                    <div className="flex space-x-4">
                        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:underline">Login</Link>
                        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register Now</Link>
                    </div>
                }
                {user &&
                    <div className="flex space-x-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={handleLogout}
                        >Logout</button>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;
