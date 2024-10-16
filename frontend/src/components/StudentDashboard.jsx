import React from 'react';

const StudentDashboard = () => {

    return (
        <div>
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Hello, Student!</h1>
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <p className="text-gray-700">20 Offres Sauvegardé</p>
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <p className="text-gray-700">12 Offres Postulées</p>
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <p className="text-gray-700">12 Candidatures avec Réponses</p>
                </div>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Offers Applied</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th>Id Offer</th>
                            <th>Offer Title</th>
                            <th>Company</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Add table rows dynamically */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDashboard;
