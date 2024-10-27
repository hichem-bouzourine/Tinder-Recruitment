import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Camera } from "lucide-react";

const StudentProfile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: null,
        anneeEtude: "",
        linkToVideo: "",
        cv: "",
        image: "",
    });
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedUnivs, setSelectedUnivs] = useState(null);
    const [competences, setCompetences] = useState([]);
    const [univs, setUnivs] = useState([]);
    const [file, setFile] = useState(null); // File for CV upload
    const [imageFile, setImageFile] = useState(null); // File for image upload
    const [passwordError, setPasswordError] = useState("");

    const fileDownloadAPI = 'http://localhost:3000/api/users/etudiant/cv/';
    const avatarDownloadAPI = 'http://localhost:3000/api/users/image/';
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const getRobotAvatarUrl = (userId) => {
        return `https://robohash.org/${userId}?set=set4`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`http://localhost:3000/api/users/etudiant/${storedUser.id}`)
                    .then((response) => {
                        setFormData({
                            firstName: response.data.prenom || "",
                            lastName: response.data.nom || "",
                            email: response.data.user.email || "",
                            password: "",
                            confirmPassword: "",
                            birthday: response.data.dateNaissance || null,
                            anneeEtude: response.data.anneeEtude || "",
                            linkToVideo: response.data.linkToVideo || "",
                            cv: response.data.cv || "",
                            image: response.data.user.image || "",
                        })
                        setSelectedSkills(response.data.competences.map(skill => ({
                            value: skill.id,
                            label: skill.nom,
                        })));
                        setSelectedUnivs({
                            value: response.data.universite.id,
                            label: response.data.universite.nom
                        });
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });
                axios.get("http://localhost:3000/api/competences")
                    .then((response) => {
                        setCompetences(response.data.map(skill => ({
                            value: skill.id,
                            label: skill.nom,
                        })))
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });
                axios.get("http://localhost:3000/api/universities")
                    .then((response) => {
                        setUnivs(response.data.map(univ => ({
                            value: univ.id,
                            label: univ.nom,
                        })))
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "confirmPassword" || name === "password") {
            setPasswordError(
                formData.password !== value && name === "confirmPassword" ?
                    "Passwords do not match" : ""
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        try {
            await axios.put(`http://localhost:3000/api/users/etudiant/me/${storedUser.id}`, {
                nom: formData.lastName,
                prenom: formData.firstName,
                dateNaissance: formData.birthday,
                anneeEtude: formData.anneeEtude,
                competences: selectedSkills,
                universiteNom: selectedUnivs,
                linkToVideo: formData.linkToVideo,
                email: formData.email,
                password: formData.password
            });
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(
                `http://localhost:3000/api/users/etudiant/upload/${storedUser.id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setFormData(prev => ({ ...prev, cv: file.name }));
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', imageFile);

        try {
            await axios.post(
                `http://localhost:3000/api/users/image/upload/${storedUser.id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setFormData(prev => ({ ...prev, image: imageFile.name }));
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Profile Header with Avatar */}
                    <div className="bg-blue-600 px-6 pt-8 pb-24 relative">
                        <h2 className="text-2xl font-bold text-white">Student Profile</h2>
                    </div>

                    {/* Avatar Section */}
                    <div className="px-6 -mt-20 mb-6">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <img
                                    src={formData.image
                                        ? `${avatarDownloadAPI}${storedUser.id}`
                                        : getRobotAvatarUrl(storedUser.id)}
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
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">
                                {formData.firstName} {formData.lastName}
                            </h3>
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
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account Settings Section - Cant change email because of Unique constraint in the database

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Account Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            placeholder="Leave blank to keep current password"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        {passwordError && (
                                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Academic Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Academic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="birthday" className="block text-gray-700 text-sm font-medium mb-2">Birthday</label>
                                    <DatePicker
                                        id="birthday"
                                        selected={formData.birthday}
                                        onChange={(date) => setFormData(prev => ({ ...prev, birthday: date }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="Select a date"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="anneeEtude" className="block text-gray-700 text-sm font-medium mb-2">Year of Study</label>
                                    <input
                                        type="text"
                                        id="anneeEtude"
                                        name="anneeEtude"
                                        value={formData.anneeEtude}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., 2nd Year"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="linkToVideo" className="block text-gray-700 text-sm font-medium mb-2">Video CV Link</label>
                                <input
                                    type="url"
                                    id="linkToVideo"
                                    name="linkToVideo"
                                    value={formData.linkToVideo}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">University</label>
                                <Select
                                    value={selectedUnivs}
                                    onChange={setSelectedUnivs}
                                    options={univs}
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
                                <label className="block text-gray-700 text-sm font-medium mb-2">Skills</label>
                                <Select
                                    isMulti
                                    value={selectedSkills}
                                    onChange={setSelectedSkills}
                                    options={competences}
                                    className="basic-multi-select"
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
                        </div>

                        {/* CV Upload Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">CV Upload</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                {formData.cv ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <a
                                                href={fileDownloadAPI + storedUser.id}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                View Current CV
                                            </a>
                                            <span className="text-sm text-gray-500">({formData.cv})</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Upload new CV:</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 mb-2">No CV uploaded yet</p>
                                )}
                                <div className="flex items-center space-x-3 mt-2">
                                    <input
                                        type="file"
                                        id="cv"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="flex-grow p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500"
                                    />
                                    {file && (
                                        <button
                                            onClick={handleUpload}
                                            type="button"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                        >
                                            {formData.cv ? 'Update' : 'Upload'}
                                        </button>
                                    )}
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
};

export default StudentProfile;