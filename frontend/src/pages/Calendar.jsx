import React, { useState } from 'react';
import './Calendar.css'; // Ajout des styles améliorés
import logo from '../assets/logo.png'; // Logo du site
import { useNavigate } from 'react-router-dom'; // Pour la navigation

const HOURS = Array.from({ length: 14 }, (_, i) => i + 6); // Créneaux horaires de 6h à 19h

// Fonction pour obtenir le premier jour de la semaine
const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday as 0
    start.setDate(diff);
    return start;
};

// Fonction pour formater la date
const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
};

const Calendar = () => {
    const [days, setDays] = useState([
        { name: 'Monday', appointments: [] },
        { name: 'Tuesday', appointments: [] },
        { name: 'Wednesday', appointments: [] },
        { name: 'Thursday', appointments: [] },
        { name: 'Friday', appointments: [] }
    ]);

    const [newAppointment, setNewAppointment] = useState({ title: '', time: '' });
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [showForm, setShowForm] = useState(false); // Contrôle la visibilité du formulaire
    const [currentDate, setCurrentDate] = useState(new Date()); // Date actuelle

    const navigate = useNavigate(); // Navigation pour redirection

    const handleAddAppointment = (e) => {
        e.preventDefault();

        const updatedDays = days.map(day => {
            if (day.name === selectedDay) {
                return { ...day, appointments: [...day.appointments, newAppointment] };
            }
            return day;
        });

        setDays(updatedDays);
        setNewAppointment({ title: '', time: '' });
        setShowForm(false); // Cache le formulaire après soumission
    };

    // Gérer la navigation des semaines
    const handleWeekChange = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + direction * 7);
        setCurrentDate(newDate);
    };

    // Obtenir le début et la fin de la semaine
    const startOfWeek = getStartOfWeek(currentDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Limiter la semaine à 5 jours (lundi-vendredi)

    return (
        <div className="calendar-container">
            {/* Logo qui redirige vers le dashboard */}
            <header className="calendar-header">
                <a href="/dashboard" className="logo-link">
                    <img src={logo} alt="Logo" className="site-logo" />
                </a>
            </header>

            {/* Titre centré */}
            <h1 className="calendar-title">My Weekly Calendar</h1>

            {/* Bouton "Create Event" */}
            <div className="sidebar-header">
                <button className="create-button" onClick={() => setShowForm(true)}>
                    CREATE EVENT
                </button>
            </div>

            {/* Formulaire d'ajout de rendez-vous */}
            {showForm && (
                <form className="appointment-form" onSubmit={handleAddAppointment}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={newAppointment.title}
                            onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Time:
                        <input
                            type="time"
                            value={newAppointment.time}
                            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Select Day:
                        <select
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                        >
                            {days.map((day) => (
                                <option key={day.name} value={day.name}>
                                    {day.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Add Appointment</button>
                </form>
            )}

            {/* Affichage du calendrier */}
            <div className="main-calendar">
                <div className="calendar-navigation-header">
                    <button className="calendar-navigation" onClick={() => handleWeekChange(-1)}>&lt;</button>
                    <h3>{formatDate(startOfWeek)} - {formatDate(endOfWeek)}</h3>
                    <button className="calendar-navigation" onClick={() => handleWeekChange(1)}>&gt;</button>
                </div>
                <div className="calendar-table">
                    <div className="hours-column">
                        {HOURS.map((hour) => (
                            <div key={hour} className="hour-cell">
                                {hour}:00
                            </div>
                        ))}
                    </div>
                    {days.map((day) => (
                        <div className="day-column" key={day.name}>
                            <div className="heading">{day.name}</div>
                            {HOURS.map((hour) => (
                                <div key={hour} className="hour-cell">
                                    {day.appointments.map((appointment, index) => {
                                        const appointmentHour = parseInt(appointment.time.split(':')[0], 10);
                                        if (appointmentHour === hour) {
                                            return (
                                                <div key={index} className="appointment-entry">
                                                    <h3>{appointment.title}</h3>
                                                    <p>{appointment.time}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
