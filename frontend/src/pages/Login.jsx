import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if the user is already logged in
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/dashboard'); // Redirect to /dashboard if user is logged in
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/auth/login', { email, password })
            .then((response) => {

                const { token, user } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                toast.success("Login successful!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/dashboard'); // Redirect to /dashboard after successful login
            })
            .catch((error) => {
                console.error(error);
                setError(error);
                toast.error("Login failed. Please check your credentials and try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <div className="flex h-screen">
            <ToastContainer />
            {/* Left Section with Image */}
            <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center relative">
                <img 
                    src="src/assets/etudiant.jpg" // Remplace par l'image que tu souhaites
                    alt="Illustration"
                    className="w-4/4 h-4/4 object-contain" 
                />
            </div>

            {/* Right Section with Login Form */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-16 bg-white">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Welcome Back!</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 py-4 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 py-4 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
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
