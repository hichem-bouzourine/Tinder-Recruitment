import React from 'react';
import { FaFileAlt, FaUserCheck, FaClipboardList } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StudentDashboard = () => {
    // Hypothetical data for weekly application activity
    const weeklyActivityData = [
        { day: 'Mon', applications: 2 },
        { day: 'Tue', applications: 4 },
        { day: 'Wed', applications: 1 },
        { day: 'Thu', applications: 3 },
        { day: 'Fri', applications: 5 },
        { day: 'Sat', applications: 0 },
        { day: 'Sun', applications: 2 },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Hello, Student!</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                    <FaFileAlt className="text-blue-500 text-4xl mb-4 mx-auto" />
                    <p className="text-gray-700 text-xl font-semibold">20 Offres Sauvegardé</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                    <FaUserCheck className="text-green-500 text-4xl mb-4 mx-auto" />
                    <p className="text-gray-700 text-xl font-semibold">12 Offres Postulées</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                    <FaClipboardList className="text-yellow-500 text-4xl mb-4 mx-auto" />
                    <p className="text-gray-700 text-xl font-semibold">12 Candidatures avec Réponses</p>
                </div>
            </div>

            {/* Line Chart for Weekly Application Activity */}
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-blue-500 mb-4">Weekly Application Activity</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StudentDashboard;
