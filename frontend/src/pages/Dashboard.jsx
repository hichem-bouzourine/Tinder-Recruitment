import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import RecruiterDashboard from '../components/RecruiterDashboard';
import StudentDashboard from '../components/StudentDashboard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);  // Store user object directly
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            navigate('/'); // Redirect to home if no user is found in localStorage
        } else {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser); // Set user state
        }
    }, [navigate]);

    if (!user) {
        return null; // You can return a loader here if necessary while redirecting
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6 bg-gray-100">
                {user.role === 'RECRUITER'
                    ? <RecruiterDashboard user={user} />
                    : <StudentDashboard user={user} />
                }
            </div>
        </div>
    );
};

export default Dashboard;
