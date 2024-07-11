import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
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


  const handleDelete = async (id) => {
    const answer = window.confirm("Tem certeza que deseja excluir o espaço?");
    if (answer) {
      try {
        await axios.delete('/spaces/' + id);
        // Update the state to remove the deleted space
        setSpaces(spaces.filter((space) => space.id !== id));
      } catch (error) {
        console.log(error.response.data.error);
        if (error.response.data.error.includes("violates foreign key constraint")) {
          alert('Não é possivel excluir o espaço pois há reservas realizadas.');
        }
        console.error("There was an error deleting the space!", error);
      }
    } else { console.log("Changes NOT sent to the database.") }
  };

  const handleUpdate = async (id, name, capacity, description) => {
    const answer = window.confirm("Tem certeza que deseja alterar o espaço?");
    if (answer) {
      try {
        console.log('/spaces/' + id, { "name": name, "capacity": capacity, "description": description });
        await axios.put('/spaces/' + id, { "name": name, "capacity": capacity, "description": description });
        alert('Espaço alterado com sucesso!');
        window.location.reload();
      } catch (error) {
        console.error("There was an error updating the space!", error);
      }
    } else { console.log("Changes NOT sent to the database.") }
  };

  return (
    <div className="container">
      <Accordion>
        {spaces.map((space) => (
          <Accordion.Item eventKey={space.id} key={space.id}>
            <Accordion.Header>{space.name}</Accordion.Header>
            <Accordion.Body>
              <form>
                <p>Capacidade:</p>
                <input type='number' defaultValue={space.capacity} className='input-space-capacity' />
                <p>Descrição: </p>
                <textarea defaultValue={space.description} className='input-space-description' />
                <button type="button" className='btn btn-primary btn-sm mt-3' onClick={() => handleUpdate(space.id, space.name, space.capacity, space.description)}>Alterar</button>
                <button type="button" className='btn btn-danger btn-sm mt-3' onClick={() => handleDelete(space.id)}>Excluir</button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default SpaceList;
