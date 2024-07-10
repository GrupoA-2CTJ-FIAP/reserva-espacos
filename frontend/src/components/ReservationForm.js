import React, { useState, useEffect } from 'react';
import axios from '../api';

function ReservationForm() {
  const [spaces, setSpaces] = useState([]);
  const [spaceId, setSpaceId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('1');

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const response = await axios.get('/spaces');
        console.log('Fetched spaces:', response.data); // Debugging log
        setSpaces(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    }
    fetchSpaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startDateTime = new Date(startDate + 'T' + startTime).toISOString();
      const endDateTime = new Date(new Date(startDateTime).getTime() + endTime * 60 * 60 * 1000).toISOString();
      await axios.post('/reservations', { "spaceId": spaceId, "clientId": 1, "startDate": startDateTime, "endDate": endDateTime });
      alert('Reserva criada com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar reserva', error);
      alert('Erro ao criar reserva');
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Espaço:</label>
          <div className='space-container'>
            <select
              className="form-control form-control-sm"
              value={spaceId}
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
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={getTodayDate()} // Set min attribute to today's date
              required
            />
            <select defaultValue="00:00" onChange={(e) => setStartTime(e.target.value)}
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
          </div>
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
          <button type="submit" className="btn btn-primary btn-sm mt-3">Fazer Reserva</button>
        </div>
      </form>
    </section>
  );
}

export default ReservationForm;