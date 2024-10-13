// src/pages/Login.js
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className='flex flex-row justify-start items-center'>
                        <label htmlFor="email" className="block text-gray-700">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className='flex flex-row justify-start items-center'>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center mt-6 text-gray-600">
                    Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
