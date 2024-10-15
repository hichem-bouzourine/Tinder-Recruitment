import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); 

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


  const currentOffer = offers[currentIndex];


  const [props, set] = useSpring(() => ({ x: 0, scale: 1 }));

  const bind = useDrag(({ down, movement: [mx], cancel, direction: [xDir] }) => {
    if (!down && Math.abs(mx) > 200) {
      if (xDir > 0) {
        // -> Apply
        setMessage(`Successfully applied to ${currentOffer?.nom}`);
        setTimeout(() => {
          setMessage('');
          setCurrentIndex((prev) => (prev + 1) % offers.length);
        }, 1000);
      } else {
        setCurrentIndex((prev) => (prev + 1) % offers.length); 
      }
      cancel(); 
    }
    set({
      x: down ? mx : 0,
      scale: down ? 1.1 : 1,
    });
  });

  if (!currentOffer) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">No more offers available</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center relative">
      <Navbar />

      <h1>Test - Offers Page Loaded</h1>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Internship Offers</h1>

      {message && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded shadow-lg">
          {message}
        </div>
      )}

      {/* card offre*/}
      <animated.div
        {...bind()}
        style={{
          ...props,
          touchAction: 'none',
          backgroundColor: 'white',
          width: '300px',
          height: '400px',
          padding: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          position: 'relative',
        }}
        className="flex flex-col justify-between"
      >
        {/* Decline Bouton */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % offers.length)}
          className="absolute top-2 left-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Decline
        </button>

        {/* Offre info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">{currentOffer.nom}</h2>
          <p className="text-gray-600 mt-2">Location: {currentOffer.localisation}</p>
          <p className="text-gray-600">Type: {currentOffer.type}</p>
          <p className="text-gray-600">Salary: {currentOffer.salaire}</p>
          <p className="text-gray-600">Start Date: {new Date(currentOffer.dateDebut).toLocaleDateString()}</p>
        </div>

        {/* Apply Bouton */}
        <button
          onClick={() => {
            setMessage(`Successfully applied to ${currentOffer.nom}`);
            setTimeout(() => {
              setMessage('');
              setCurrentIndex((prev) => (prev + 1) % offers.length);
            }, 1000);
          }}
          className="absolute top-2 right-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </animated.div>
    </div>
  );
}

export default Offers;
