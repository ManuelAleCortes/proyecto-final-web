import React, { useState } from 'react';
import "../componentesStyle/paginas.css";
import { agregarTorneo } from "../state/listaSlice";
import { useDispatch} from 'react-redux';

export default function FormularioTorneo({ onClose }) {
    const dispatch = useDispatch();
    
    const [nombre, setNombre] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [imagen, setImagen] = useState(null);
    const [cantidadMax, setCantidadMax] = useState(0);
    const [error, setError] = useState('');
    //const [numPaticipantes, setNumParticipantes] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (nombre.length < 3 || nombre.length > 15) {
            setError('El nombre del torneo debe tener entre 3 y 15 caracteres');
            return;
          }
          if (!nombre || !fechaLimite || !imagen) {
            setError('Todos los campos son obligatorios');
            return;
          }
        
        const nuevoTorneo = {
          nombre,
          fechaLimite,
          imagen: imagen ? URL.createObjectURL(imagen) : null,
          cantidadMax,
          numPaticipantes:0,
          participantes: [], // Inicialmente no hay participantes
        };
        dispatch(agregarTorneo(nuevoTorneo));
        // Restablecer los campos del formulario después de enviar
        setNombre('');
        setFechaLimite('');
        setImagen(null);
        setCantidadMax(0);
        setError('');
      };
      const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Solo se toma el primer archivo si el usuario selecciona varios
        setImagen(file);
      };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Creación de un torneo</h2>
        <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label>Nombre del torneo:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
                <label>Fecha límite:</label>
                <input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" accept="image/*" onChange={handleImagenChange} />
            </div>
            <div>
                <label>Cantidad máxima de participantes:</label>
                <input type="number" value={cantidadMax} onChange={(e) => setCantidadMax(parseInt(e.target.value))} />
            </div>
            <button type="submit">Guardar torneo</button>
            <button onClick={onClose}>Cerrar</button>
        </form>
        
      </div>
    </div>
  );
}