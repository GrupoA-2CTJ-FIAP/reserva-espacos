import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import axios from '../api';
import EditSpaceForm from './EditSpaceForm';

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
    <div className="container">
      <Accordion>
        {spaces.map((space) => (
          <Accordion.Item eventKey={space.id} key={space.id}>
            <Accordion.Header>{space.name}</Accordion.Header>
            <Accordion.Body>
              <EditSpaceForm spaceId={space.id} name={space.name} capacity={space.capacity} description={space.description}/>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default SpaceList;
