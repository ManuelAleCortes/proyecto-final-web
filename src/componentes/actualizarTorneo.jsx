import React, { useState } from 'react';
import "../componentesStyle/paginas.css";
//import { agregarTorneo } from "../state/listaSlice";
import { useDispatch} from 'react-redux';
import { dataBase, imageDb} from '../baseDatos/fireBase';
import { ref, uploadBytes , getDownloadURL, deleteObject} from 'firebase/storage';
import { obtenerTodosLosTorneos, updateTorneo } from "../baseDatos/metodos";

export default function ActualizarTorneo({ onClose, dataTorneo }) {
    const dispatch = useDispatch();
    
    
    const [nombre, setNombre] = useState(dataTorneo.nombre);
    const [fechaLimite, setFechaLimite] = useState(dataTorneo.fechaLimite);
    const [imagen, setImagen] = useState(dataTorneo.imagen);
    //const [imagenUrl, setImagenUrl] = useState(null);
    const [cantidadMax, setCantidadMax] = useState(dataTorneo.cantidadMax);
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
        if (dataTorneo.numParticipantes>cantidadMax) {
            setError('El numero de participantes actuales excede la cantidad maxima');
            return;
            }

          try{
            let imagenUrl = null;
            if(imagen !== dataTorneo.imagen){
                const imageRef = ref(imageDb, dataTorneo.imagen);
              // Eliminar la imagen del almacenamiento
                await deleteObject(imageRef);
                if (imagen) {
                    const storageRef = ref(imageDb,`files/${imagen.name}`);
                    const snapshot = await uploadBytes(storageRef, imagen);
                    imagenUrl = await getDownloadURL(snapshot.ref);
                
                }else{
                    return;
                }
            }else if(imagen === dataTorneo.imagen){
                imagenUrl = dataTorneo.imagen;
            }
          const nuevoTorneo = {
            nombre,
            fechaLimite,
            imagen: imagenUrl,
            cantidadMax,
            numParticipantes: dataTorneo.numParticipantes,
            participantes: [], // Inicialmente no hay participantes
          };
          //console.log(nuevoTorneo);
          await updateTorneo(dataBase, dataTorneo.id, nuevoTorneo);
          //await dispatch(agregarTorneo(nuevoTorneo));
          /*
          toast.info('Se ha modificado un torneo', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });*/
          // Después de agregar el torneo, obtener la lista actualizada
          dispatch(obtenerTodosLosTorneos());
          // Restablecer los campos del formulario después de enviar
          setError('');
          //onClose();
        }catch(error){
          console.error('Error al subir la imagen:', error);
        }
      };
      const handleImagenChange = (e) => {
        const imagenSeleccionada = e.target.files[0]; // Obtén el archivo de imagen seleccionado por el usuario
        setImagen(imagenSeleccionada);
        //dataTorneo.imagen
        //console.log(imagenSeleccionada);
      };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Actualización de un torneo</h2>
        <form id="form-content-torneo" onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label>Nombre del torneo:</label>
                <input id="nombreInput" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
                <label>Fecha límite:</label>
                <input id="fechaLimiteInput" type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" accept="image/*" onChange={handleImagenChange} />
            </div>
            <div>Imagen actual: 
                <a href={dataTorneo.imagen} target="_blank" rel="noopener noreferrer">
                     {dataTorneo.imagen.length > 20 ? dataTorneo.imagen.substring(0, 20) + '...' : dataTorneo.imagen}
                </a>
            </div>
            <div>
                <label>Cantidad de participantes actuales: {dataTorneo.numParticipantes}</label>
            </div>
            <div>
                <label>Cantidad máxima de participantes:</label>
                <input id="cantidadMaxInput" type="number" value={cantidadMax} onChange={(e) => setCantidadMax(parseInt(e.target.value))} />
            </div>
            <button id="boton-form-content-guardar" type="submit">Actualizar</button>
            <button id="boton-form-content-cerrar" onClick={onClose}>Cerrar</button>
        </form>
        
      </div>
      
    </div>
  );
}