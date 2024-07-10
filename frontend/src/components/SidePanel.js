import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import EditReservationForm from './EditReservationForm';


function SidePanel({spaceId}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Editar
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Editar Reserva - nº{spaceId}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <EditReservationForm  reservationSpaceId={spaceId}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SidePanel;