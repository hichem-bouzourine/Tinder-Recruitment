import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function Navbar() {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove the user from localStorage
        localStorage.removeItem('token'); // Remove the token from localStorage
        window.location.href = '/'; // Redirect to the front page
    };

    return (
        <nav className="bg-white py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/src/assets/logo.png" alt="Logo" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-gray-800">WOLF STREET</span>
                    </Link>
                </div>

                {/* Links */}
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
                    {user?.role !== 'RECRUITER' &&
                        <Link to={user?.role === 'STUDENT' ? '/offers' : '/login'} className="text-gray-600 hover:text-blue-600 font-medium">
                            Find an alternation
                        </Link>
                    }
                    {user && <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>}
                </div>

                {/* Auth Buttons */}
                {!user ? (
                    <div className="flex space-x-4">
                        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition">
                            Login
                        </Link>
                        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition">
                            Register
                        </Link>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition"
                            onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
