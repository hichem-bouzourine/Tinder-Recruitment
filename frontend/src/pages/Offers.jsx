// src/pages/Offers.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null); 
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/offers');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  
  const toggleDrawer = (offer) => {
    setSelectedOffer(offer);
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Internship Offers</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-bold text-blue-600">{offer.nom}</h2>
              <p className="text-gray-600 mt-2">Location: {offer.localisation}</p>
              <p className="text-gray-600">Type: {offer.type}</p>
              <p className="text-gray-600">Salary: {offer.salaire}</p>
              <p className="text-gray-600">Start Date: {new Date(offer.dateDebut).toLocaleDateString()}</p>
              <button
                onClick={() => toggleDrawer(offer)} 
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {}
      {selectedOffer && (
        <div
          className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 transition-opacity ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setDrawerOpen(false)} 
        >
          <div
            className={`fixed bg-white p-6 rounded-lg shadow-lg transition-transform transform ${
              isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              right: '20px', 
              top: '100px', 
              width: '300px',
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose an Option</h2>
            <p className="text-gray-600 mb-4">
              You are applying for: <strong>{selectedOffer.nom}</strong>
            </p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  navigate('/login'); 
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  navigate('/submit', { state: { offer: selectedOffer } }); 
                }}
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              >
                Submit Directly
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offers;
