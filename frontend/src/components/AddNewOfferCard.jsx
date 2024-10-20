import axios from 'axios';
import React, { useState } from 'react'

const AddNewOfferCard = ({ user, offers, setOffers, setShowForm }) => {
    const [newOffer, setNewOffer] = useState({
        nom: '',
        type: '',
        description: '',
        salaire: '',
        localisation: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOffer({ ...newOffer, [name]: value });
    }

    const handleAddOffer = () => {
        const userId = user.id;
        axios.post('http://localhost:3000/api/offers', { ...newOffer, userId })
            .then(response => {
                setOffers([...offers, response.data]);
                setNewOffer({ nom: '', type: '', description: '', salaire: '', localisation: '' });
                setShowForm(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 overflow-y-auto">
            <div className="bg-white py-10 px-6 shadow-md rounded-lg w-full max-w-2xl max-h-2xl relative">
                <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">Ajouter un Poste</h2>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Titre du poste</label>
                        <textarea
                            id="nom"
                            name="nom"
                            value={newOffer.nom}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            id="type"
                            name="type"
                            value={newOffer.type}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg w-full appearance-none"
                        >
                            <option value="">Sélectionner le type</option>
                            <option value="Alternance">Alternance</option>
                            <option value="Stage">Stage</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newOffer.description}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg w-full h-32"
                        />
                    </div>
                    <div>
                        <label htmlFor="salaire" className="block text-sm font-medium text-gray-700 mb-1">Salaire</label>
                        <input
                            id="salaire"
                            name="salaire"
                            type="number"
                            value={newOffer.salaire}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="localisation" className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                        <input
                            id="localisation"
                            name="localisation"
                            type="text"
                            value={newOffer.localisation}
                            onChange={handleInputChange}
                            className="p-3 border rounded-lg w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <button
                        onClick={() => setShowForm(false)}
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
    )
}

export default AddNewOfferCard