import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ListFutbolistasComponent = () => {
    const [futbolistas, setFutbolistas] = useState([]);
    const [selectedFutbolista, setSelectedFutbolista] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        fetch('http://localhost:8090/futbolistas/')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setFutbolistas(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleShowModal = (id) => {
        fetch(`http://localhost:8090/futbolistas/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setSelectedFutbolista(data[0]);
                    setShowModal(true);
                } else {
                    console.error('No data found for the given ID');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

   

    const handleCloseModal = () => setShowModal(false);


    return (
        <div className='container'>
            <h2 className='text-center'>Lista de Futbolistas</h2>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Posicion</th>
                        <th>Caracteristicas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {futbolistas.map(futbolista => (
                        <tr key={futbolista.id}>
                            <td>{futbolista.id}</td>
                            <td>{futbolista.nombres}</td>
                            <td>{futbolista.apellidos}</td>
                            <td>{futbolista.posicion.nombre}</td>
                            <td>{futbolista.caracteristicas}</td>
                            <td>
                                <Button onClick={() => handleShowModal(futbolista.id)}>Ver detalles</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Futbolista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedFutbolista && (
                        <div>
                            <p><strong>ID:</strong> {selectedFutbolista.id}</p>
                            <p><strong>Nombre:</strong> {selectedFutbolista.nombres}</p>
                            <p><strong>Apellidos:</strong> {selectedFutbolista.apellidos}</p>
                            <p><strong>Posicion:</strong> {selectedFutbolista.posicion.nombre}</p>
                            <p><strong>Caracteristicas:</strong> {selectedFutbolista.caracteristicas}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            
        </div>
    );
};

export default ListFutbolistasComponent;
