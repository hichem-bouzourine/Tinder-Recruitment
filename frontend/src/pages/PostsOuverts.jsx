import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewOfferCard from '../components/AddNewOfferCard';
import { useNavigate } from 'react-router-dom';

const PostsOuverts = () => {
  const [user, setUser] = useState({});
  const [offers, setOffers] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

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

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser.id);
      setUserRole(parsedUser.role);
    } else {
      console.log("No user found");
      navigate('/');
    }
  }, [navigate]);

  const swiped = async (direction, offerToDelete) => {
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

      const token = localStorage.getItem('token');
      console.log('Token:', token); // 打印 token
      if (!token) {
        console.error('No token found');
        return;
      }

      const currentUserId = userId;

      if (!token || !currentUserId) {
        console.error('No token or userId found');
        return;
      }

      try {
        console.log("Offer ID:", offerToDelete.id);
        console.log("User ID:", currentUserId);

        const response = await axios.post('http://localhost:3000/api/candidature', {
          offreId: offerToDelete.id,
          userId: currentUserId
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 201) {
          console.log('Candidature created:', response.data);
        }
      } catch (error) {
        console.error('Error creating candidature:', error);
        toast.error('Error creating candidature');
        if (error.response && error.response.status === 403) {
          console.error('Error message:', error.response.data.error); // 会打印 "Seuls les étudiants peuvent postuler à des offres."
        }
      }
    }
  };

  const outOfFrame = (nom) => {
    console.log(nom + ' left the screen!');
  };

  if (userRole === null) {
    return <p>Loading...</p>;
  }

  // If user is STUDENT, show Tinder-style offers page
  if (userRole === 'STUDENT') {
    return (
      <div className="flex">
        <Sidebar />

        <div className="bg-offre-background h-screen relative flex-1">
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
                  <div className="card shadow-lg">
                    <div className="cardContent overflow-y-scroll">
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
      </div>
    );
  }

  // If user is RECRUITER, show offers table
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-grow bg-white p-4 md:p-6 shadow-md rounded-lg overflow-x-auto w-full">
        <h1 className="text-3xl font-bold text-blue-500 mb-8 text-center md:text-left">Posts Ouverts</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 mb-6"
        >
          Ajouter un Poste
        </button>
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
                  <td className="p-4 border-b text-ellipsis overflow-hidden" title={offer.description}>{offer.description}</td>
                  <td className="p-4 border-b">{offer.localisation}</td>
                  <td className="p-4 border-b">{offer.salaire}</td>
                  <td className="p-4 border-b">{offer.applications ? offer.applications : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <AddNewOfferCard user={user} offers={offers} setOffers={setOffers} setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default PostsOuverts;
