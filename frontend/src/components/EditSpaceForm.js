import React, { useState, useEffect } from 'react';
import axios from '../api';

function EditSpaceForm({ spaceId, name, capacity, description }) {
    const [editedSpaceId, setEditedSpaceId] = useState('');
    const [editedName, setEditedName] = useState('');
    const [editedCapacity, setCapacity] = useState('');
    const [editedDescription, setDescription] = useState('');

    useEffect(() => {
        setEditedSpaceId(spaceId);
        setEditedName(name);
        setCapacity(capacity);
        setDescription(description);
    }, [spaceId, name, capacity, description]); // dependencies to ensure useEffect runs when these props change

    const handleUpdate = async () => {
        try {
            await axios.put(`/spaces/${editedSpaceId}`, {
                name: editedName,
                capacity: editedCapacity,
                description: editedDescription,
            });
            alert('Espaço alterado com sucesso!');
            window.location.reload();
        } catch (error) {
            console.error("There was an error updating the space!", error);
        }
    };
    const handleDelete = async () => {
        const answer = window.confirm("Tem certeza que deseja excluir o espaço?");
        if (answer) {
            try {
                await axios.delete('/spaces/' + spaceId);
                alert('Espaço deletado com sucesso!');
                window.location.reload();
            } catch (error) {
                console.log(error.response.data.error);
                if (error.response.data.error.includes("violates foreign key constraint")) {
                    alert('Não é possivel excluir o espaço pois há reservas realizadas.');
                }
                console.error("There was an error deleting the space!", error);
            }
        } else { console.log("Changes NOT sent to the database.") }
    };

    return (
        <section className="form-container">
            <form>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Capacidade:</label>
                    <input
                        type="number"
                        value={editedCapacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="button" className='btn btn-primary btn-sm mt-3' onClick={handleUpdate}>Alterar</button>
                <button type="button" className='btn btn-danger btn-sm mt-3' onClick={handleDelete}>Excluir</button>
            </form>
        </section>
    );
}

export default EditSpaceForm;