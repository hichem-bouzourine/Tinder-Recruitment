import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar'; 

function Simple() {
  const [offers, setOffers] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);
  const [userRole, setUserRole] = useState(null); // 用于存储用户角色

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

    // 获取用户角色
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role); // 将用户角色存储到状态中
    }
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

  // 确保 `userRole` 被正确获取后再渲染
  if (userRole === null) {
    return <p>Loading...</p>;
  }

  // 如果用户角色是 STUDENT，则显示学生页面
  if (userRole === 'STUDENT') {
    return (
      <div className="flex">
        {/* 左侧导航栏 */}
        <Sidebar />

        {/* 右侧内容 */}
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
      </div>
    );
  }

  // 如果用户角色是 RECRUITER，则显示招聘者页面
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
}

export default Simple;
