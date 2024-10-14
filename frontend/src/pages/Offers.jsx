// src/pages/Offers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Offers() {
  const [offers, setOffers] = useState([]);

  // 获取 offers 数据
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/offers'); // 使用后端 API
        setOffers(response.data); // 将数据保存到状态中
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

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
              <button className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offers;
