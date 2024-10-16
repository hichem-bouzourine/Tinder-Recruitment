import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Navbar from '../components/Navbar';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState(''); 
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

  const currentOffer = offers[currentIndex];

  const [props, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));

  const bind = useDrag(({ down, movement: [mx, my], cancel }) => {
    if (!down && Math.abs(mx) > 150) {
      if (mx > 0) {
        // Apply logic
        setMessage(`Successfully applied to ${currentOffer?.nom}`);
        setTimeout(() => {
          setMessage('');
          setCurrentIndex((prev) => (prev + 1) % offers.length);
        }, 1000);
      } else {
        // Decline logic
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }
      cancel(); // Prevent further dragging after action
    }
    set({
      x: down ? mx : 0,
      y: down ? my : 0,
      scale: down ? 1.1 : 1,
    });
  });

  if (!currentOffer) {
    return <div>No more offers available.</div>;
  }

  return (
    <div className="bg-gray-50">
      <Navbar />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Internship Offers</h1>

      {message && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded shadow-lg">
          {message}
        </div>
      )}

      {/* Decline and Apply buttons */}
      <button
        className="absolute top-20 left-10 bg-red-500 text-white px-6 py-3 rounded"
        style={{ zIndex: 1 }}
      >
        Decline
      </button>
      <button
        className="absolute top-20 right-10 bg-green-600 text-white px-6 py-3 rounded"
        style={{ zIndex: 1 }}
      >
        Apply
      </button>

      {/* Draggable offer card */}
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
        <h2 className="text-2xl font-bold text-blue-600">{currentOffer.nom}</h2>
        <p className="text-gray-600 mt-2">Location: {currentOffer.localisation}</p>
        <p className="text-gray-600">Type: {currentOffer.type}</p>
        <p className="text-gray-600">Salary: {currentOffer.salaire}</p>
        <p className="text-gray-600">Start Date: {new Date(currentOffer.dateDebut).toLocaleDateString()}</p>
      </animated.div>
    </div>
  );
}

export default Offers;
