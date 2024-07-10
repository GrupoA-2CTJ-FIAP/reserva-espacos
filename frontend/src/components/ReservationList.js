import React, { useState, useEffect } from 'react';
import axios from '../api';
import SidePanel from './SidePanel';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function formatDate(isoDateTimeString) {
    const date = new Date(isoDateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  return (
    <div className="reservation-list">
      <h2>Todas as Reservas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Espaço</th>
            <th>Data de Início</th>
            <th>Data de Fim</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.spaceName || 'N/A'}</td>
              <td>{formatDate(reservation.startDate) || 'N/A'}</td>
              <td>{formatDate(reservation.endDate) || 'N/A'}</td>
              <SidePanel spaceId={reservation.id}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;