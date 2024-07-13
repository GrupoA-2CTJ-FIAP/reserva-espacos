import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SpaceList from '../components/SpaceList'
import SpaceForm from './SpaceForm';

function Example() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async (e) => {
        e.preventDefault();
        setShow(true)
    };
    return (
        <>
            <Button type="button" variant="primary" onClick={handleShow} className='button-init-modal'>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Espaços</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SpaceForm />
                    <SpaceList />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;