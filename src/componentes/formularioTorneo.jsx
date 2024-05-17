import React, { useState } from 'react';
import "../componentesStyle/paginas.css";
//import { agregarTorneo } from "../state/listaSlice";
import { useDispatch} from 'react-redux';
import { dataBase, imageDb} from '../baseDatos/fireBase';
import { ref, uploadBytes , getDownloadURL} from 'firebase/storage';
import { addTorneo, obtenerTodosLosTorneos } from "../baseDatos/metodos";
export default function FormularioTorneo({ onClose }) {
    const dispatch = useDispatch();
    
    const [nombre, setNombre] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [imagen, setImagen] = useState(null);
    //const [imagenUrl, setImagenUrl] = useState(null);
    const [cantidadMax, setCantidadMax] = useState(0);
    const [error, setError] = useState('');
    //const [numParticipantes, setNumParticipantes] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nombre.length < 3 || nombre.length > 15) {
            setError('El nombre del torneo debe tener entre 3 y 15 caracteres');
            return;
          }
          if (!nombre || !fechaLimite || !imagen) {
            setError('Todos los campos son obligatorios');
            return;
          }
          if (cantidadMax <= 1) {
            setError('La cantidad maxima de participantes debe ser mayor a 1');
            return;
          }
          try{
            let imagenUrl = null;
            if (imagen) {
              const storageRef = ref(imageDb,`files/${imagen.name}`);
              const snapshot = await uploadBytes(storageRef, imagen);
              imagenUrl = await getDownloadURL(snapshot.ref);
              
            }else{
              return;
            }
          const nuevoTorneo = {
            nombre,
            fechaLimite,
            imagen: imagenUrl,
            cantidadMax,
            numParticipantes:0,
            participantes: [], // Inicialmente no hay participantes
          };
          await addTorneo(dataBase,nuevoTorneo);
          //await dispatch(agregarTorneo(nuevoTorneo));

          // Después de agregar el torneo, obtener la lista actualizada
          dispatch(obtenerTodosLosTorneos());
          // Restablecer los campos del formulario después de enviar
          setNombre('');
          setFechaLimite('');
          setImagen(null);
          setCantidadMax(0);
          setError('');
        }catch(error){
          console.error('Error al subir la imagen:', error);
        }
      };
      const handleImagenChange = (e) => {
        const imagenSeleccionada = e.target.files[0]; // Obtén el archivo de imagen seleccionado por el usuario
        setImagen(imagenSeleccionada);
        //console.log(imagenSeleccionada);
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