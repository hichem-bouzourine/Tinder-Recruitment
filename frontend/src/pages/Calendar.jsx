// src/components/Calendar.jsx
import React, { useState } from 'react';
import './Calendar.css'; // Réutilise ton fichier CSS

const Calendar = () => {
    const [days, setDays] = useState([
        { name: 'Monday', appointments: [] },
        { name: 'Tuesday', appointments: [] },
        { name: 'Wednesday', appointments: [] },
        { name: 'Thursday', appointments: [] },
        { name: 'Friday', appointments: [] },
        { name: 'Saturday', appointments: [] },
        { name: 'Sunday', appointments: [] }
    ]);

    const [newAppointment, setNewAppointment] = useState({ title: '', time: '' });
    const [selectedDay, setSelectedDay] = useState('Monday');

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
    };

    return (
        <div className="calendar-wrapper">
            <h1>Calendar</h1>
            {/* Formulaire pour ajouter des rendez-vous */}
            <form onSubmit={handleAddAppointment}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={newAppointment.title}
                        onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                    />
                </label>
                <label>
                    Time:
                    <input
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
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

            {/* Calendrier affichant les rendez-vous */}
            <div className="calendar-table">
                {days.map((day) => (
                    <div className="day-column" key={day.name}>
                        <div className="heading">{day.name}</div>
                        {day.appointments.map((appointment, index) => (
                            <div key={index} className="entry">
                                <h3>{appointment.title}</h3>
                                <p>{appointment.time}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;