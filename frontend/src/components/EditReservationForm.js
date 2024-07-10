import React, { useState, useEffect } from 'react';
import axios from '../api';

function EditReservationForm({ reservationSpaceId }) {
  const [spaces, setSpaces] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [spaceId, setSpaceId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('1');

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const response = await axios.get('/spaces');
        setSpaces(response.data);
        const response2 = await axios.get('/reservations/' + reservationSpaceId);
        console.log('Fetched reservation:', response2.data);
        setReservation(response2.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    }
    fetchSpaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answer = window.confirm("Tem certeza que deseja alterar a reserva?");
    if (answer) {
      try {
        const startDateTime = new Date(startDate + 'T' + startTime).toISOString();
        const endDateTime = new Date(new Date(startDateTime).getTime() + endTime * 60 * 60 * 1000).toISOString();
        await axios.put('/reservations/' + reservationSpaceId, { "spaceId": spaceId, "clientId": 1, "startDate": startDateTime, "endDate": endDateTime });
        alert('Reserva alterada com sucesso!');
        window.location.reload();
      } catch (error) {
        console.error('Erro ao alterar reserva', error);
        alert('Erro ao alterar reserva');
      }
    } else { console.log("Changes NOT sent to the database.") }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (isoDateTimeString) => {
    const date = new Date(isoDateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  };

  const formatTime = (isoDateTimeString) => { 
    const date = new Date(isoDateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    console.log(`${hours}:${minutes}`);
    return `${hours}:${minutes}`;
  }

  const cancelReservation = async (e) => {
    e.preventDefault();
    const answer = window.confirm("Tem certeza que deseja cancelar a reserva?");
    if (answer) {
      try {
        await axios.put('/reservations/' + reservationSpaceId + '/cancel');
        alert('Reserva cancelada!');
        window.location.reload();
      } catch (error) {
        console.error('Erro ao cancelar reserva', error);
        alert('Erro ao editar reserva');
      }
    } else { console.log("Changes NOT sent to the database.") }
  }

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Espaço:</label>
          <div className='space-container'>
            <select
              className="form-control form-control-sm"
              value={reservation.spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
              required
            >
              <option value="">Selecione um espaço</option>
              {spaces.length > 0 ? (
                spaces.map((space) => (
                  <option key={space.id} value={space.id}>{space.name}</option>
                ))
              ) : (
                <option disabled>Loading spaces...</option>
              )}
            </select>
          </div>
          <label>Data e Hora de Início:</label>
          <div className='datetime-container'>
            <input
              type="date"
              className="form-control form-control-sm"
              value={formatDate(reservation.startDate)}
              onChange={(e) => setStartDate(e.target.value)}
              min={getTodayDate()} // Set min attribute to today's date
              required
            />
          </div>
          <select defaultValue={formatTime} onChange={(e) => setStartTime(e.target.value)}
            required>
            <option value="00:00">00:00</option>
            <option value="01:00">01:00</option>
            <option value="02:00">02:00</option>
            <option value="03:00">03:00</option>
            <option value="04:00">04:00</option>
            <option value="05:00">05:00</option>
            <option value="06:00">06:00</option>
            <option value="07:00">07:00</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
            <option value="22:00">22:00</option>
            <option value="23:00">23:00</option>
          </select>
          <div className='slider-container'>
            <label htmlFor="slider">Quantidade de horas: </label>
            <input
              id="slider"
              type="range"
              min="1"
              max="8"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <span id='slider-value'>{endTime} hora(s).</span>
          </div>
          <button type="submit" className="btn btn-primary btn-sm mt-3">Alterar Reserva</button>
          <button className="btn btn-danger btn-sm mt-3" onClick={cancelReservation}>Cancelar Reserva</button>
        </div>
      </form>
    </section>
  );
}

export default EditReservationForm;