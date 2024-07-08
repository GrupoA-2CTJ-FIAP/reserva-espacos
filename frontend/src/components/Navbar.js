import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary " bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home" className='navbar-title'>Sistema de Reserva de Espaços</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default BasicExample;