import React from 'react';
import Sidebar from '../components/Sidebar';
import RecruiterDashboard from '../components/RecruiterDashboard';
import StudentDashboard from '../components/StudentDashboard';

const Dashboard = ({ userType }) => {
    userType = 'recruiter';
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6 bg-gray-100">
                {userType === 'recruiter' ? <RecruiterDashboard /> : <StudentDashboard />}
            </div>
        </div>
    );
};

export default Dashboard;
