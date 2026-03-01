'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { reservationService } from '@/services/reservationService';

const AvailabilityCalendar = ({ itemId, itemType = 'vehicle', onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedRanges, setBookedRanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchAvailability = useCallback(async () => {
    setLoading(true);
    try {
      const firstDay = new Date(year, month, 1).toISOString();
      const lastDay = new Date(year, month + 1, 0).toISOString();

      const checkFn = itemType === 'vehicle'
        ? reservationService.checkVehicleAvailability
        : reservationService.checkApartmentAvailability;

      const result = await checkFn(itemId, firstDay, lastDay);

      if (result.bookedDates && Array.isArray(result.bookedDates)) {
        // Parse dates and extract day numbers for current month
        const bookedDays = result.bookedDates
          .map(d => {
            const date = new Date(d);
            // Only include dates from current month
            if (date.getMonth() === month && date.getFullYear() === year) {
              return date.getDate();
            }
            return null;
          })
          .filter(d => d !== null);
        setBookedRanges(bookedDays);
      } else {
        setBookedRanges([]);
      }
    } catch {
      setBookedRanges([]);
    } finally {
      setLoading(false);
    }
  }, [itemId, itemType, year, month]);

  useEffect(() => {
    if (itemId) fetchAvailability();
  }, [itemId, fetchAvailability]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isBooked = (day) => bookedRanges.includes(day);
  const isPast = (day) => new Date(year, month, day) < today;

  const handleDayClick = (day) => {
    if (isBooked(day) || isPast(day)) return;
    const clicked = new Date(year, month, day);

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(clicked);
      setSelectedEnd(null);
    } else {
      if (clicked > selectedStart) {
        const startD = selectedStart.getDate();
        const endD = day;
        let hasConflict = false;
        for (let d = startD; d <= endD; d++) {
          if (isBooked(d)) { hasConflict = true; break; }
        }
        if (!hasConflict) {
          setSelectedEnd(clicked);
          if (onDateSelect) {
            onDateSelect({
              startDate: selectedStart.toISOString().split('T')[0],
              endDate: clicked.toISOString().split('T')[0],
            });
          }
        }
      } else {
        setSelectedStart(clicked);
        setSelectedEnd(null);
      }
    }
  };

  const isInRange = (day) => {
    const d = new Date(year, month, day);
    if (selectedStart && selectedEnd) return d >= selectedStart && d <= selectedEnd;
    if (selectedStart && hoverDate && !selectedEnd) return d >= selectedStart && d <= hoverDate;
    return false;
  };

  const isStart = (day) => selectedStart && new Date(year, month, day).getTime() === selectedStart.getTime();
  const isEnd = (day) => selectedEnd && new Date(year, month, day).getTime() === selectedEnd.getTime();

  const getDayClasses = (day) => {
    const base = 'relative w-full aspect-square flex items-center justify-center text-sm cursor-pointer transition-all duration-150 ';
    if (isPast(day)) return base + 'text-gray-300 cursor-not-allowed';
    if (isBooked(day)) return base + 'bg-red-100 text-red-400 cursor-not-allowed line-through';
    if (isStart(day) || isEnd(day)) return base + 'text-white font-bold';
    if (isInRange(day)) return base + 'bg-primary/10 text-primary';
    return base + 'hover:bg-gray-100 text-gray-700 font-medium';
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h5 className="text-lg font-bold text-gray-900 mb-4">Calendrier de disponibilité</h5>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-base font-semibold text-gray-900">{monthNames[month]} {year}</span>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-400"></span> Disponible</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-300"></span> Réservé</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5a5f' }}></span> Sélection</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
          ))}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`e-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
            <div
              key={day}
              className={getDayClasses(day)}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => { if (selectedStart && !selectedEnd && !isPast(day) && !isBooked(day)) setHoverDate(new Date(year, month, day)); }}
              onMouseLeave={() => setHoverDate(null)}
              style={(isStart(day) || isEnd(day)) ? { backgroundColor: '#ff5a5f' } : {}}
            >
              {day}
              {!isPast(day) && !isBooked(day) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400"></span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Selection Info */}
      {selectedStart && (
        <div className="mt-4 p-3 bg-gray-50 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Début :</span>
            <strong>{selectedStart.toLocaleDateString('fr-FR')}</strong>
          </div>
          {selectedEnd && (
            <div className="flex justify-between mt-1">
              <span className="text-gray-500">Fin :</span>
              <strong>{selectedEnd.toLocaleDateString('fr-FR')}</strong>
            </div>
          )}
          {!selectedEnd && <p className="text-gray-400 text-xs mt-2">Cliquez sur une date de fin</p>}
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
