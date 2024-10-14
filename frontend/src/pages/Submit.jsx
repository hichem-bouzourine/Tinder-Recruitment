// src/pages/Submit.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar';

function Submit() {
  const location = useLocation();
  const { offer } = location.state || {}; 

  const [formData, setFormData] = useState({
    name: '',
    school: '',
    cv: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setMessage('Submission successful!');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Your Application</h1>

        {}
        {offer && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold">Applying for: {offer.nom}</h2>
            <p>Location: {offer.localisation}</p>
            <p>Type: {offer.type}</p>
            <p>Salary: {offer.salaire}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">School</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">CV</label>
            <input
              type="file"
              name="cv"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Submit;
