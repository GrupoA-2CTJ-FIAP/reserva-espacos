import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ReservationForm from './ReservationForm';


function SidePanel({spaceId}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Editar Reserva - nº{spaceId}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ReservationForm requestType="PUT"/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SidePanel;