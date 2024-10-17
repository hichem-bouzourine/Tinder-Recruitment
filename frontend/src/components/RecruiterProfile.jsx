import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from "react-select"; // Import react-select htmlFor the Combobox
import DatePicker from "react-datepicker"; // Import react-datepicker htmlFor the date picker

function RecruiterProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [poste, setPoste] = useState(null);
    const [entreprise, setEntreprise] = useState(null);
    const [entrepriseList, setEntrepriseList] = useState([]);
    const posteList = [{
        value: "HR",
        label: "HR"
    }, {
        value: "CTO",
        label: "CTO"
    }, {
        value: "CEO",
        label: "CEO"
    }];
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    // Fetch the user data from the API
    useEffect(() => {
        const api = `http://localhost:3000/api/users/recruteur/${user.id}`;
        axios.get(api)
            .then(response => {
                setFirstName(response.data.prenom);
                setLastName(response.data.nom);
                setPoste({
                    value: response.data.poste,
                    label: response.data.poste
                });
                setEntreprise({
                    value: response.data.entreprise.id,
                    label: response.data.entreprise.nom
                });
            }
            )
            .catch(error => console.log(error));
        axios.get("http://localhost:3000/api/entreprises")
            .then(response => {
                setEntrepriseList(response.data.map(entreprise => ({
                    value: entreprise.id,
                    label: entreprise.nom,
                })));
            })
            .catch(error => {
                console.error("There was an error fetching the skills!", error);
            });
    }, []);

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const api = `http://localhost:3000/api/users/recruteur/me/${user.id}`;
        axios.put(api, {
            nom: lastName,
            prenom: firstName,
            poste: poste.value,
            entrepriseId: entreprise.value,
            entrepriseNom: entreprise.label
        }).catch(error => console.log(error));
        // window.location.reload();
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="sm:flex sm:space-x-4 space-y-6 sm:space-y-0 -mx-2 sm:mx-0">
                        <div className="w-full"> <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) => setLastName(e.target.value)}
                                name="name"
                                value={lastName}
                                className="w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="w-full px-2">  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input
                                type="text"
                                id="prenom"
                                onChange={(e) => setFirstName(e.target.value)}
                                name="prenom"
                                value={firstName}
                                className="w-3/4  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                        <Select
                            isMulti={false}
                            value={entreprise}
                            onChange={(selectedOption) => setEntreprise(selectedOption)}
                            options={entrepriseList}
                            classNamePrefix="select"
                            className='w-3/4'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                        <Select
                            isMulti={false}
                            value={poste}
                            onChange={(selectedOption) => setPoste(selectedOption)}
                            options={posteList}
                            classNamePrefix="select"
                            className='w-3/4'
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                        Save Your Settings
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RecruiterProfile