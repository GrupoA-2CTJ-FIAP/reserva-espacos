import React, { useState, useEffect } from 'react';
import axios from '../api';

function SpaceList() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    async function fetchSpaces() {
      const response = await axios.get('/spaces');
      setSpaces(response.data);
    }
    fetchSpaces();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Espaços</h2>
      <div className="list-group">
        {spaces.map((space) => (
          <button key={space.id} className="list-group-item list-group-item-action">
            {space.name} - Capacidade: {space.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SpaceList;
