import React from 'react'
import Sidebar from '../components/Sidebar'
import StudentProfile from '../components/StudentProfile'
import RecruiterProfile from '../components/RecruiterProfile'

function Settings() {
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    const role = user.role;
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6 bg-gray-100">
                {
                    role == 'STUDENT' ? <StudentProfile /> : <RecruiterProfile />
                }
            </div>
        </div>
    )
}

export default Settings