import React from 'react';
import axios from 'axios';

const RecruiterDashboard = () => {
    const [offers, setOffers] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:3000/api/offers/recruiter/29')
            .then(response => {
                setOffers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Posts Ouverts</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="p-3">Offer Title</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Rythme</th>
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
                                <td className="p-4 border-b">{offer.rythme}</td>
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
