import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from "react-select";
import { Camera } from "lucide-react";

function RecruiterProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        poste: null,
        entreprise: null,
        image: null,
        email: "",
        id: null,
    });
    const [entrepriseList, setEntrepriseList] = useState([]);
    const [imageFile, setImageFile] = useState(null);

    const avatarDownloadAPI = 'http://localhost:3000/api/users/image/';

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
                setFormData({
                    firstName: response.data.prenom,
                    lastName: response.data.nom,
                    poste: {
                        value: response.data.poste,
                        label: response.data.poste
                    },
                    entreprise: {
                        value: response.data.entreprise.id,
                        label: response.data.entreprise.nom
                    },
                    image: response.data.user.image,
                    email: response.data.user.email
                });
            })
            .catch(error => console.log(error));

        axios.get("http://localhost:3000/api/entreprises")
            .then(response => {
                setEntrepriseList(response.data.map(entreprise => ({
                    value: entreprise.id,
                    label: entreprise.nom,
                })));
            })
            .catch(error => {
                console.error("There was an error fetching the companies!", error);
            });
    }, []);

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const api = `http://localhost:3000/api/users/recruteur/me/${user.id}`;
        axios.put(api, {
            nom: formData.lastName,
            prenom: formData.firstName,
            poste: formData.poste.value,
            email: formData.userEmail,
            entrepriseId: formData.entreprise.value,
            entrepriseNom: formData.entreprise.label
        }).catch(error => console.log(error));
        window.location.reload();

    };

    const getRobotAvatarUrl = (userId) => {
        return `https://robohash.org/${userId}?set=set4`;
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', imageFile);

        try {
            await axios.post(
                `http://localhost:3000/api/users/image/upload/${user.id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setFormData(prev => ({ ...prev, image: imageFile.name }));
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Profile Header with Avatar */}
                    <div className="bg-blue-600 px-6 pt-8 pb-24 relative">
                        <h2 className="text-2xl font-bold text-white">Recruiter Profile</h2>
                    </div>

                    {/* Avatar Section */}
                    <div className="px-6 -mt-20 mb-6">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <img
                                    src={formData.image
                                        ? `${avatarDownloadAPI}${user.id}`
                                        : getRobotAvatarUrl(user.id)}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                                />
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                                >
                                    <Camera className="w-5 h-5 text-white" />
                                </label>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            {imageFile && (
                                <button
                                    onClick={handleImageUpload}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Upload New Avatar
                                </button>
                            )}
                            <p className="text-gray-600">{formData.email}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            lastName: e.target.value
                                        }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            firstName: e.target.value
                                        }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Position</label>
                                    <Select
                                        value={formData.poste}
                                        onChange={(value) => setFormData(prev => ({
                                            ...prev,
                                            poste: value
                                        }))}
                                        options={posteList}
                                        className="basic-select"
                                        classNamePrefix="select"
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: '#2563EB',
                                                primary25: '#BFDBFE',
                                            },
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Company</label>
                                    <Select
                                        value={formData.entreprise}
                                        onChange={(value) => setFormData(prev => ({
                                            ...prev,
                                            entreprise: value
                                        }))}
                                        options={entrepriseList}
                                        className="basic-select"
                                        classNamePrefix="select"
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: '#2563EB',
                                                primary25: '#BFDBFE',
                                            },
                                        })}
                                        menuPortalTarget={document.body}
                                        menuPlacement="auto"
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold"
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecruiterProfile;