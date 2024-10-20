import React, { useState } from 'react';
import axios from 'axios';
import { FaFileAlt, FaUserCheck, FaClipboardList, FaPlus } from 'react-icons/fa';
import AddNewOfferCard from './AddNewOfferCard';
import CandidaciesGraph from './CandidaciesGraph'; // New component for the graph

const RecruiterDashboard = ({ user }) => {
    const [offers, setOffers] = useState([]);
    const [showForm, setShowForm] = useState(false);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/offers/recruiter/${user.id}`)
            .then(response => {
                setOffers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [user.id]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-blue-500 mb-8 text-center md:text-left">Hello, Recruiter!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                    <FaFileAlt className="text-blue-500 text-4xl mb-4 mx-auto" />
                    <p className="text-gray-700 text-xl font-semibold">{offers ? offers.length : 0} Posts Ouverts</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                    <FaUserCheck className="text-green-500 text-4xl mb-4 mx-auto" />
                    <p className="text-gray-700 text-xl font-semibold">12 Candidatures en cours</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
                    <FaClipboardList className="text-yellow-500 text-4xl mb-4 mx-auto" />
                    <p className="text-gray-700 text-xl font-semibold">12 Candidatures Shortlistés</p>
                </div>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Candidatures Over Time</h2>
                <CandidaciesGraph offers={offers} /> {/* Graph for candidacies over the past week */}
            </div>

            <button
                onClick={() => setShowForm(true)}
                className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
            >
                <FaPlus className="text-xl" />
            </button>

            {showForm && (
                <AddNewOfferCard user={user} offers={offers} setOffers={setOffers} setShowForm={setShowForm} />
            )}
        </div>
    );
};

export default RecruiterDashboard;
