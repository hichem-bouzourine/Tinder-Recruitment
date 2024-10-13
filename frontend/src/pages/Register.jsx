import React, { useState } from "react";
import DatePicker from "react-datepicker"; // For handling the birthday input
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker
import wolfImage from "../assets/wolf-sidebar.jpeg"; // Path to your left image

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("student"); // default role
    const [birthday, setBirthday] = useState(null);
    const [entreprise, setEntreprise] = useState("");
    const [univ, setUniv] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the submission logic here
    };

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex md:w-1/3 justify-center items-center bg-gray-100">
                <img src={wolfImage} alt="Wolf" className="h-full object-cover" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center items-center bg-white p-6">
                <h1 className="text-3xl font-bold text-purple-600 mb-6">Set up your account</h1>
                <p className="text-gray-500 mb-4">Your details</p>
                <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                    <div className="mb-4 flex flex-row justify-center items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-row justify-center items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Email</label>
                        <input
                            type="email"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4 flex flex-row justify-center items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-6 flex flex-row justify-start items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2 mr-5">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>

                    {role === "student" && (
                        <div className="mb-4 flex flex-row justify-start items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Birthday</label>
                            <DatePicker
                                selected={birthday}
                                onChange={(date) => setBirthday(date)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                dateFormat="yyyy/MM/dd"
                                placeholderText="Select a date"
                                required
                            />
                        </div>
                    )}
                    {role === "student" ? (
                        <div className="mb-4 flex flex-row justify-start items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2">University</label>
                            <input
                                type="text"
                                value={univ}
                                onChange={(e) => setUniv(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    ) : (
                        <div className="mb-4 flex flex-row justify-start items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                            <input
                                type="text"
                                value={entreprise}
                                onChange={(e) => setEntreprise(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Continue
                    </button>
                    <p className="mt-4 text-gray-500 text-sm">
                        Already have an account? <a href="/login" className="text-purple-600">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
