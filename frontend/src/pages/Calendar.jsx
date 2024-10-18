// src/pages/Calendar.jsx
import React, { useState } from 'react';
import './Calendar.css'; // Ajout des styles améliorés

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9); // Créneaux horaires de 9h à 17h

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
            <h1>Weekly Calendar</h1>
            {/* Formulaire pour ajouter des rendez-vous */}
            <form className="appointment-form" onSubmit={handleAddAppointment}>
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

            {/* Affichage du calendrier */}
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
                                    const appointmentHour = parseInt(appointment.time.split(':')[0]);
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
    );
};

export default Calendar;
