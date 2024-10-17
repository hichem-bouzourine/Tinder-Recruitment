import React, { useState } from 'react';
import axios from 'axios';

const RecruiterDashboard = ({ user }) => {
    const [offers, setOffers] = useState([]);
    const [newOffer, setNewOffer] = useState({ 
                                        nom: '', 
                                        type: '',
                                        description: '',
                                        rythme: '',
                                        salaire: '',
                                        localisation: ''});
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOffer({ ...newOffer, [name]: value});
    }

    const handleAddOffer = () => {
        const userId = user.id;
        axios.post('http://localhost:3000/api/offers', { ...newOffer, userId })
            .then(response => {
                setOffers([...offers, response.data]);
                setNewOffer({ nom: '', type: '', description: '', rythme: '', salaire: '', localisation: '' });
                setShowForm(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Hello, Recruiter!</h1>
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <p className="text-gray-700">{offers ? offers.length : 0} Posts Ouverts</p>
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <p className="text-gray-700">12 Candidatures en cours</p>
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <p className="text-gray-700">12 Candidatures Shortlistés</p>
                </div>
            </div>
        
            <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-500 text-white w-full py-3 rounded-lg shadow-md hover:bg-blue-600 mb-6"
                    >
                        Ajouter un Poste
            </button>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-10 shadow-md rounded-lg w-full max-w-2xl">
                        <h2 className="text-xl font-bold text-gray-700 mb-6">Ajouter un Poste</h2>
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <textarea
                                name="nom"
                                value={newOffer.nom}
                                onChange={handleInputChange}
                                placeholder="Titre du poste"
                                className="p-3 border rounded-lg w-full"
                            />
                            <select
                                name="type"
                                value={newOffer.type}
                                onChange={handleInputChange}
                                className="p-3 border rounded-lg w-full appearance-none"
                            >
                                <option value="">Type</option>
                                <option value="Alternance">Alternance</option>
                                <option value="Stage">Stage</option>
                            </select>
                            <textarea
                                name="description"
                                value={newOffer.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="p-3 border rounded-lg w-full h-32"
                            />
                            <textarea
                                name="rythme"
                                value={newOffer.rythme}
                                onChange={handleInputChange}
                                placeholder="Rythme"
                                className="p-3 border rounded-lg w-full"
                            />
                            <input
                                type="number"
                                name="salaire"
                                value={newOffer.salaire}
                                onChange={handleInputChange}
                                placeholder="Salaire"
                                className="p-3 border rounded-lg w-full"
                            />
                            <textarea
                                name="localisation"
                                value={newOffer.localisation}
                                onChange={handleInputChange}
                                placeholder="Localisation"
                                className="p-3 border rounded-lg w-full"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={() => {setShowForm(false)}}
                                className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleAddOffer}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                            >
                                Ajouter le Poste
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Posts Ouverts</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="p-3">Offer Title</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Localisation</th>
                            <th className="p-3">Salaire</th>
                            <th className="p-3">Nombre de Candidature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer, index) => (
                            <tr key={offer.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} text-gray-600`}>
                                <td className="p-4 border-b">{offer.nom}</td>
                                <td className="p-4 border-b">{offer.type}</td>
                                <td className="p-4 border-b">{offer.description}</td>
                                <td className="p-4 border-b">{offer.localisation}</td>
                                <td className="p-4 border-b">{offer.salaire}</td>
                                <td className="p-4 border-b">{offer.applications ? offer.applications : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecruiterDashboard;
