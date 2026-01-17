'use client';

import React from 'react';

const VehicleAvailabilityCalendar = () => {
    // Mock data for January 2026
    const daysInMonth = 31;
    const startDay = 4; // Jan 1, 2026 is a Thursday (4th day if Sun=0)

    // Mock booked dates
    const bookedDates = [5, 6, 7, 15, 16, 22, 23, 24];

    const days = [];
    // Empty slots for start of month
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const isBooked = bookedDates.includes(i);
        days.push(
            <div key={i} className={`calendar-day ${isBooked ? 'booked' : 'available'}`}>
                <span>{i}</span>
                <div className="status-dot"></div>
            </div>
        );
    }

    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    return (
        <div className="vehicle-calendar-wrapper mt30">
            <div className="calendar-header mb20">
                <h5>Calendrier de disponibilité</h5>
                <div className="month-nav">
                    <span>Janvier 2026</span>
                </div>
            </div>

            <div className="calendar-legend mb15">
                <div className="legend-item">
                    <span className="dot available"></span>
                    <span>Disponible</span>
                </div>
                <div className="legend-item">
                    <span className="dot booked"></span>
                    <span>Déjà loué</span>
                </div>
            </div>

            <div className="calendar-grid">
                {dayNames.map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                ))}
                {days}
            </div>
        </div>
    );
};

export default VehicleAvailabilityCalendar;
