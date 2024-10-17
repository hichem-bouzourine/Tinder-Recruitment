import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const PostsOuverts = () => {
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser);

            // Récupérer les offres du recruteur après avoir récupéré les informations de l'utilisateur
            axios.get(`http://localhost:3000/api/offers/recruiter/${parsedUser.id}`)
                .then(response => {
                    setOffers(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des offres:', error);
                });
        } else {
            console.log("pas de user");
            navigate('/'); // Rediriger vers la page de connexion si l'utilisateur n'est pas trouvé
        }
    }, [navigate]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <div className="flex-grow bg-white p-4 md:p-6 shadow-md rounded-lg overflow-x-auto w-full">
                <h1 className="text-3xl font-bold text-blue-500 mb-8 text-center md:text-left">Posts Ouverts</h1>
                <div className="overflow-auto w-full">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <th className="p-3">Title</th>
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
                                    <td className="p-4 border-b truncate" title={offer.description}>{offer.description}</td>
                                    <td className="p-4 border-b">{offer.localisation}</td>
                                    <td className="p-4 border-b">{offer.salaire}</td>
                                    <td className="p-4 border-b">{offer.applications ? offer.applications : 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PostsOuverts;