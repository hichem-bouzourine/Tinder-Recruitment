import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Using React Modal for popups
import Sidebar from '../components/Sidebar';

Modal.setAppElement('#root'); // To avoid accessibility warning

const CandidaturesRecues = () => {
    const [user, setUser] = useState(null);  // Store user object directly

    const [candidacies, setCandidacies] = useState([]);
    const [selectedCandidacy, setSelectedCandidacy] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAccepted, setIsAccepted] = useState(true); // "good" or "bad"
    const [comment, setComment] = useState('');

    const fileDownloadAPI = 'http://localhost:3000/api/users/etudiant/cv/'

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Set user state

        // Fetch candidacies for the recruiter
        axios.get(`http://localhost:3000/api/candidatures/recruiter/${parsedUser.id}`)
            .then(response => {

                setCandidacies(response.data);
            })
            .catch(error => {
                console.error('Error fetching candidacies:', error);
            });
    }, []);

    const openModal = (candidacy) => {
        setSelectedCandidacy(candidacy);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCandidacy(null);
        setIsAccepted(true); // Reset response type
        setComment(''); // Reset comment
    };

    const sendEmail = () => {
        axios.post('http://localhost:3000/api/email/send-email', {
            to: selectedCandidacy.etudiant.user.email,
            subject: isAccepted ? 'Une bonne nouvelle' : 'Le statut de votre candidature',
            isAccepted, // Send response type to the backend
            comment, // Send comment to the backend
            etudiantName: selectedCandidacy.etudiant.nom, // Send student name for personalization
            offreNom: selectedCandidacy.offre.nom // Send offer name for personalization
        })
            .then(response => {
                alert('Email sent successfully!');
                closeModal();
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div className='flex flex-row'>
            <div>
                <Sidebar />
            </div>
            <div className="w-full p-8">
                {candidacies &&
                    <>
                        <h1 className="text-3xl font-bold text-black mb-8">Received Candidacies</h1>
                        <table className="w-full bg-white shadow-md rounded-lg">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="p-4 text-left">Offer Name</th>
                                    <th className="p-4 text-left">Student Name</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidacies.map(candidacy => (
                                    <tr key={candidacy.id} className="border-b">
                                        <td className="p-4">{candidacy.offre.nom}</td>
                                        <td className="p-4">{candidacy.etudiant.nom} {candidacy.etudiant.prenom}</td>
                                        <td className="p-4">{candidacy.etat}</td>
                                        <td className="p-4">
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                                onClick={() => openModal(candidacy)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>}

                {selectedCandidacy && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Candidacy Details"
                        className="p-8 bg-white shadow-2xl rounded-xl max-w-lg mx-auto mt-20 border border-gray-200"
                        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Candidacy Details</h2>

                        {/* Candidate Information */}
                        <div className="space-y-4">
                            <p className="text-lg"><strong className="text-gray-700">Student Name:</strong> {selectedCandidacy.etudiant.nom} {selectedCandidacy.etudiant.prenom}</p>
                            <p className="text-lg"><strong className="text-gray-700">Email:</strong> {selectedCandidacy.etudiant.user.email}</p>
                            <p className="text-lg"><strong className="text-gray-700">Offer:</strong> {selectedCandidacy.offre.nom}</p>
                            <p className="text-lg"><strong className="text-gray-700">Status:</strong>
                                <span className={`ml-2 px-2 py-1 rounded ${selectedCandidacy.etat === 'ACCEPTED' ? 'bg-green-100 text-green-700' : selectedCandidacy.etat === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                    {selectedCandidacy.etat}
                                </span>
                            </p>
                            <p className="text-lg flex items-center"><strong className="text-gray-700">CV:</strong>
                                <a href={fileDownloadAPI + selectedCandidacy.etudiant.user.id} target="_blank" rel="noopener noreferrer" className='ml-2 text-blue-500 hover:underline'>
                                    View CV
                                </a>
                                <span className="text-sm text-gray-500 ml-2">({selectedCandidacy.etudiant.cv})</span>
                            </p>
                        </div>

                        {/* Response Type Selection */}
                        <div className="mt-6">
                            <label htmlFor="isAccepted" className="block text-sm font-semibold text-gray-700">Response Type</label>
                            <select
                                id="isAccepted"
                                value={isAccepted}
                                onChange={(e) => setIsAccepted(e.target.value === 'true')}
                                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value={true}>Good Response (Accepted)</option>
                                <option value={false}>Bad Response (Rejected)</option>
                            </select>
                        </div>

                        {/* Additional Comment Section */}
                        <div className="mt-6">
                            <label htmlFor="comment" className="block text-sm font-semibold text-gray-700">Comment</label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="mt-2 p-3 border border-gray-300 rounded-lg w-full h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Add a comment for the student..."
                            ></textarea>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex justify-end mt-8 space-x-4">
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 text-white py-2 px-5 rounded-lg shadow hover:bg-gray-500 transition-all duration-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={sendEmail}
                                className="bg-blue-500 text-white py-2 px-5 rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
                            >
                                Send Email
                            </button>
                        </div>
                    </Modal>

                )}
            </div>
        </div>
    );
};

export default CandidaturesRecues;
