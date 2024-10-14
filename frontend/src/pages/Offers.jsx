// src/pages/Offers.jsx
import React from 'react';
import Navbar from '../components/Navbar';

function Offers() {
    // 假设有一些职位数据，后续可以从 API 获取
    const offers = [
        { id: 1, title: "Finance Analyst Intern", location: "New York, NY", type: "Full-Time", salary: "$50,000/year" },
        { id: 2, title: "Investment Banking Intern", location: "London, UK", type: "Part-Time", salary: "$40,000/year" },
        { id: 3, title: "Accounting Intern", location: "Paris, France", type: "Internship", salary: "$30,000/year" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Internship Offers</h1>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {offers.map((offer) => (
                        <div key={offer.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                            <h2 className="text-2xl font-bold text-blue-600">{offer.title}</h2>
                            <p className="text-gray-600 mt-2">Location: {offer.location}</p>
                            <p className="text-gray-600">Type: {offer.type}</p>
                            <p className="text-gray-600">Salary: {offer.salary}</p>
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
