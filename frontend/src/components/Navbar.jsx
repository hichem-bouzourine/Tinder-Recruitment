// src/components/Navbar.js
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white border-b border-blue-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="src/assets/logo.png" alt="Logo" className="w-11 h-11" />
                    <span className="font-bold text-lg">WOLF STREET</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                    <Link to="/offers" className="text-gray-600 hover:text-blue-600">Trouver une alternance</Link>
                    <Link to="/community" className="text-gray-600 hover:text-blue-600">Community</Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:underline">Login</Link>
                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register Now</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
