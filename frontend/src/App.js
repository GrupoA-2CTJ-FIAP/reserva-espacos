import React from 'react';
import Navbar from './components/Navbar'
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import ReservationCalendar from './components/ReservationCalendar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <h2 className='title'>Fazer Reserva</h2>
      <ReservationForm /> 
      <ReservationCalendar />
      <ReservationList />
      <Footer/>
    </div>
  );
};

export default App;
