import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // For handling the birthday input
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker
import wolfImage from "../assets/wolf-sidebar.jpeg"; // Path to your left image
import axios from "axios";
import Select from "react-select"; // Import react-select for the Combobox

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("STUDENT"); // default role
    const [birthday, setBirthday] = useState(null);
    const [posteRecruiter, setPosteRecruiter] = useState("HR"); // default role
    const [entreprise, setEntreprise] = useState("");
    const [univ, setUniv] = useState("");

    const postes = ["HR", "CEO", "CTO"].map(poste => ({
        value: poste,
        label: poste,
    }));

    const [competences, setCompetences] = useState([]); // Array of skills
    const [selectedSkills, setSelectedSkills] = useState([]); // To store selected skills

    const [univs, setUnivs] = useState([]); // Array of skills
    const [selectedUnivs, setSelectedUnivs] = useState([]); // To store selected skills

    // Fetch skills from the API when component is mounted
    useEffect(() => {
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

    // Handle skill selection
    const handleSkillChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions);
    };

    const handleUnivsChange = (selectedOptions) => {
        setSelectedUnivs(selectedOptions);
    };

    const handleSubmit = async (e) => {
        // Handle the submission logic here
        e.preventDefault();
        const skillsToSend = selectedSkills.map(option => ({
            id: option.value,
            nom: option.label
        }));

        const univsToSend = {
            id: selectedUnivs.value,
            nom: selectedUnivs.label
        };
        let obj = {
            email,
            password,
            role,
            nom: lastName,
            prenom: firstName,
        }

        if (role === "STUDENT") {

            obj = {
                ...obj,
                universiteId: univsToSend.id,
                dateNaissance: birthday,
                competences: skillsToSend,
            }

        } else {
            // poste
            obj = {
                ...obj,
                poste: posteRecruiter?.value,
            }
            console.log(obj);

        }

        await axios.post("http://localhost:3000/auth/signup", obj)
            .then(response => {
                console.log("User created successfully!", response);
                // Redirect to login page
                window.location.href = "/login";
            })
            .catch(error => {
                console.error("An error occurred while creating the user!", error);
            });

    };

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex md:w-1/3 justify-center items-center bg-gray-100">
                <img src={wolfImage} alt="Wolf" className="h-full object-cover" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center items-center bg-white p-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-6">Set up your account</h1>
                <p className="text-gray-500 mb-4">Your details</p>
                <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                    <div className="mb-4 flex flex-row justify-center items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-row justify-center items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />

                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Email</label>
                        <input
                            type="email"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4 flex flex-row justify-center items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-6 flex flex-row justify-start items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2 mr-5">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="STUDENT">Student</option>
                            <option value="RECRUITER">Recruiter</option>
                        </select>
                    </div>

                    {role === "STUDENT" ? (
                        <>
                            <div className="mb-4 flex flex-row justify-start items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Birthday</label>
                                <DatePicker
                                    selected={birthday}
                                    onChange={(date) => setBirthday(date)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="Select a date"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Univsersities</label>
                                <Select
                                    isMulti={false}
                                    value={selectedUnivs}
                                    onChange={handleUnivsChange}
                                    options={univs}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>

                            {/* Skills Combobox */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Select Skills</label>
                                <Select
                                    isMulti
                                    value={selectedSkills}
                                    onChange={handleSkillChange}
                                    options={competences}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4 flex flex-row justify-start items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                                <input
                                    type="text"
                                    value={entreprise}
                                    onChange={(e) => setEntreprise(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex flex-row justify-start items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 mr-3">Poste</label>
                                <Select
                                    isMulti={false}
                                    value={posteRecruiter}
                                    onChange={(e) => setPosteRecruiter(e)}
                                    options={postes}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>

                        </>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Continue
                    </button>
                    <p className="mt-4 text-gray-500 text-sm">
                        Already have an account? <a href="/login" className="text-blue-600">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
