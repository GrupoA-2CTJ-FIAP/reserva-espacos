import React, { useState, useEffect } from 'react';
import axios from '../api';
import Calendar from 'react-calendar'; // Import react-calendar

function ReservationCalendar() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredReservations, setFilteredReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await axios.get('/reservations');
        console.log('Fetched reservations:', response.data); // Debug
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Failed to load reservations');
        setLoading(false);
      }
    }
    fetchReservations();
  }, []);

  function formatDate(isoDateTimeString) {
    const date = new Date(isoDateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  function formatHour(isoDateTimeString) {
    const date = new Date(isoDateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    if (selectedDate) {
      const formattedSelectedDate = formatDate(selectedDate); // Format selected date as ISO string
      const filtered = reservations.filter(reservation => {
        return formatDate(reservation.startDate).startsWith(formattedSelectedDate); // Filter reservations for selected date
      });
      setFilteredReservations(filtered);
    }
  }, [selectedDate, reservations]);

  const handleDayClick = (value) => {
    setSelectedDate(value); // Update selectedDate state on day click
  };

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2>Calendário</h2>
      <div className="grid-container">
        <div className="calendar-container">
          <Calendar
            className="calendar"
            value={selectedDate}
            onClickDay={handleDayClick} // Handle day click event
            tileContent={({ date }) => {
              // Customize how each calendar tile (day) displays content
              const matchingReservations = reservations.filter(reservation => {
                const reservationDate = new Date(reservation.startDate);
                return reservationDate.getDate() === date.getDate() &&
                  reservationDate.getMonth() === date.getMonth() &&
                  reservationDate.getFullYear() === date.getFullYear();
              });

              if (matchingReservations.length > 0) {
                return <p className="reservation-markup">{matchingReservations.length}</p>;
              }

              return null;
            }}
            tileClassName={({ date }) => {
              // Customize how each calendar tile (day) gets styled
              const reservationExists = reservations.some(reservation => {
                const reservationDate = new Date(reservation.startDate);
                return reservationDate.getDate() === date.getDate() &&
                  reservationDate.getMonth() === date.getMonth() &&
                  reservationDate.getFullYear() === date.getFullYear();
              });

              return reservationExists ? 'reserved-day' : '';
            }}
          />
        </div>
        <div className="reservation-list-container">
          {selectedDate && (
            <div className="reservation-details">
              <h3>Reservas para {formatDate(selectedDate)}</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Espaço</th>
                    <th>Hora de Início</th>
                    <th>Hora de Fim</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map(reservation => (
                    <tr key={reservation.id}>
                      <td>{reservation.spaceId || 'N/A'}</td>
                      <td>{formatHour(reservation.startDate) || 'N/A'}</td>
                      <td>{formatHour(reservation.endDate) || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationCalendar;