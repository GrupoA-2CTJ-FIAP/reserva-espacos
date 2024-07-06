import React from 'react';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import ReservationCalendar from './components/ReservationCalendar';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Sistema de Reserva de Espaços</h1>
      <ReservationForm />
      <ReservationCalendar />
      <ReservationList />
    </div>
  );
};

export default App;
