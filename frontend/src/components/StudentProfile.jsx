import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from "react-select"; // Import react-select htmlFor the Combobox
import DatePicker from "react-datepicker"; // Import react-datepicker htmlFor the date picker

function StudentProfile() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [anneeEtude, setAnneeEtude] = useState('');
    const [competences, setCompetences] = useState([]); // Array of skills
    const [selectedSkills, setSelectedSkills] = useState([]); // To store selected skills
    const [univs, setUnivs] = useState([]); // Array of skills
    const [selectedUnivs, setSelectedUnivs] = useState([]); // To store selected skills
    const [cv, setCv] = useState('');
    const [file, setFile] = useState(null);
    const [linkToVideo, setLinkToVideo] = useState('');

    const fileDownloadAPI = 'http://localhost:3000/api/users/etudiant/cv/'

    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    // Form submit handler 
    const handleSubmit = (e) => {
        e.preventDefault();
        const api = `http://localhost:3000/api/users/etudiant/me/${user.id}`;
        axios.put(api, {
            nom: lastName,
            prenom: firstName,
            dateNaissance: birthday,
            anneeEtude: anneeEtude,
            competences: selectedSkills,
            universiteNom: selectedUnivs,
            cv: cv,
            linkToVideo: linkToVideo
        })
            .catch(error => console.log(error))
            .finally(() => {
                window.location.reload();
            });
    }
    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        axios.post(`http://localhost:3000/api/users/etudiant/upload/${user.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setCv(file.name);
        })
    }


    // Fetch the user data from the API
    useEffect(() => {
        const api = `http://localhost:3000/api/users/etudiant/${user.id}`;
        axios.get(api)
            .then(response => {
                setFirstName(response.data.prenom);
                setLastName(response.data.nom);
                // setEmail(response.data.user.email);
                response.data.anneeEtude ? setAnneeEtude(response.data.anneeEtude) : setAnneeEtude('');
                setBirthday(response.data.dateNaissance);
                setSelectedSkills(response.data.competences.map(skill => ({
                    value: skill.id,
                    label: skill.nom,
                })));
                setSelectedUnivs({
                    value: response.data.universite.id,
                    label: response.data.universite.nom
                });
                response.data.cv ? setCv(response.data.cv) : setCv('');
                response.data.linkToVideo ? setLinkToVideo(response.data.linkToVideo) : setLinkToVideo('');
            }
            )
            .catch(error => console.log(error));
        axios.get("http://localhost:3000/api/competences")
            .then(response => {
                const skillsOptions = response.data.map(skill => ({
                    value: skill.id,
                    label: skill.nom,
                }));
                setCompetences(skillsOptions); // Formatting the competences for react-select
            })
            .catch(error => {
                console.error("There was an error fetching the skills!", error);
            });

        axios.get("http://localhost:3000/api/universities")
            .then(response => {
                const univsOptions = response.data.map(univ => ({
                    value: univ.id,
                    label: univ.nom,
                }));

                setUnivs(univsOptions); // Formatting the univs for react-select

            })
            .catch(error => {
                console.error("There was an error fetching the universities!", error);
            });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl mx-auto my-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Nom</label>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) => setLastName(e.target.value)}
                                name="name"
                                value={lastName}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            />
                        </div>
                        <div>
                            <label htmlFor="prenom" className="block text-gray-700 text-sm font-semibold mb-2">Prénom</label>
                            <input
                                type="text"
                                id="prenom"
                                onChange={(e) => setFirstName(e.target.value)}
                                name="prenom"
                                value={firstName}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="cv" className="block text-gray-700 text-sm font-semibold mb-2">CV</label>
                        {cv ? (
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <a href={fileDownloadAPI + user.id} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                                        View Current CV
                                    </a>
                                    <span className="text-sm text-gray-500">({cv})</span>
                                </div>
                                <p className="text-sm text-gray-600">Upload or Replace CV:</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600 mb-2">No CV uploaded yet. Upload your CV:</p>
                        )}
                        <div className="flex items-center space-x-3 mt-2">
                            <input
                                type="file"
                                id="cv"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);;
                                }}
                                name="cv"
                                className="flex-grow p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            />
                            {file && (
                                <button
                                    onClick={handleUpload}
                                    type="button"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                                >
                                    {cv ? 'Update' : 'Upload'}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="birthday" className="block text-gray-700 text-sm font-semibold mb-2">Birthday</label>
                            <DatePicker
                                id="birthday"
                                selected={birthday}
                                onChange={(date) => setBirthday(date)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                dateFormat="yyyy/MM/dd"
                                placeholderText="Select a date"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="linkToVideo" className="block text-gray-700 text-sm font-semibold mb-2">Link to Video CV</label>
                            <input
                                type="url"
                                id="linkToVideo"
                                onChange={(e) => setLinkToVideo(e.target.value)}
                                name="linkToVideo"
                                value={linkToVideo}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Universities</label>
                        <Select
                            isMulti={false}
                            value={selectedUnivs}
                            onChange={(selectedOption) => setSelectedUnivs(selectedOption)}
                            options={univs}
                            className="basic-select"
                            classNamePrefix="select"
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: '#3B82F6',
                                    primary25: '#BFDBFE',
                                },
                            })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Select Skills</label>
                        <Select
                            isMulti
                            value={selectedSkills}
                            onChange={(selectedOptions) => setSelectedSkills(selectedOptions)}
                            options={competences}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: '#3B82F6',
                                    primary25: '#BFDBFE',
                                },
                            })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out font-semibold"
                    >
                        Save Your Settings
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StudentProfile