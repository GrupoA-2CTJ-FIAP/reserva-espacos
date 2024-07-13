import React, { useState, useEffect } from 'react';
import axios from '../api';

function SpaceForm() {
  const [spaceName, setSpaceName] = useState('');
  const [spaceCapacity, setSpaceCapacity] = useState('');
  const [spaceDescription, setSpaceDescription] = useState('');

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/spaces', { "name": spaceName, "capacity": spaceCapacity, "description": spaceDescription});
      alert('Espaço criado com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar espaço', error);
      alert('Erro ao criar espaço');
    }
  };

  return (
    <section className="form-container">
      <form>
        <div className="form-group">
          <label>Nome do Espaço:</label>
          <input className='input-space-name' onChange={(e) => setSpaceName(e.target.value)}/>
          <label>Capacidade:</label>
          <input className='input-space-capacity' onChange={(e) => setSpaceCapacity(e.target.value)}/>
          <label>Descrição:</label>
          <textarea className='input-space-description' onChange={(e) => setSpaceDescription(e.target.value)}/>
          <button type="button" className="btn btn-primary btn-sm mt-3" onClick={handleSubmit}>Novo Espaço</button>
        </div>
      </form>
    </section>
  );
}

export default SpaceForm;