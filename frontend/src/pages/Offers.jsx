import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Simple() {
  const [offers, setOffers] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);

  useEffect(() => {
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

  const swiped = (direction, offerToDelete) => {
    setLastDirection(direction);

    if (direction === 'left') {
      toast.error(`You declined the job: ${offerToDelete.nom}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (direction === 'right') {
      toast.success(`You applied for the job: ${offerToDelete.nom}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const outOfFrame = (nom) => {
    console.log(nom + ' left the screen!');
  };

  return (
    <div className="bg-offre-background h-screen relative">
      <Navbar />
      <h1 className="text-center text-6xl font-bold mt-10">Available Offers</h1>

      <div className="cardContainer">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <TinderCard
              className="swipe"
              key={offer.id}
              onSwipe={(dir) => swiped(dir, offer)}
              onCardLeftScreen={() => outOfFrame(offer.nom)}
            >
              <div className="card">
                <div className="cardContent">
                  <h2>{offer.nom}</h2>
                  <p><strong>Location:</strong> {offer.localisation}</p>
                  <p><strong>Salary:</strong> {offer.salaire} €</p>
                  <p><strong>Start Date:</strong> {new Date(offer.dateDebut).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> {offer.description}</p>
                </div>
              </div>
            </TinderCard>
          ))
        ) : (
          <p>Loading offers...</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Simple;
