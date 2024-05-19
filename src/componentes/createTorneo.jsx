import "../componentesStyle/createTorneo.css";
//import { eliminarTorneo } from "../state/listaSlice";
import { useDispatch} from 'react-redux';
import { removeTorneo, obtenerTodosLosTorneos } from "../baseDatos/metodos";
import ActualizarTorneo from '../componentes/actualizarTorneo';
import { dataBase } from "../baseDatos/fireBase";
import { useState } from "react";
export default function CreateTorneo({dataTorneo}) {
    const { nombre, fechaLimite, imagen, cantidadMax, numParticipantes, id, participantes} = dataTorneo;
    const [modalVisible, setModalVisible] = useState(false);
    // Estado local para controlar si se muestra la lista desplegable
    const [mostrarLista, setMostrarLista] = useState(false);
    const openModal = () => {
      setModalVisible(true);
    };
    const toggleLista = () => {
        setMostrarLista(!mostrarLista);
      };
    const closeModal = () => {
      setModalVisible(false);
    };

    const modificar = "Modificar";
    const eliminar = "eliminar";
    const dispatch = useDispatch();
    const handleEliminar = async () => {
        //await dispatch(eliminarTorneo({ id: id }));
        await removeTorneo(dataBase, id, imagen);
        /*
        toast.info('Se ha eliminado un torneo', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });*/
        dispatch(obtenerTodosLosTorneos());
    };

    return (    
        <div id="contenedor-torneo">
            <div id="contenedor-torneo-image-create">
                <div>
                    <img id="imagen-banner" src={imagen} alt="Imagen del torneo" style={{ width: '125px', height: '100px' }} />
                </div>
            </div>
            <div id="contenedor-torneo-detalle-participate">
                <div className="title-nombre">
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`Nombre del torneo: ${nombre}`}</span>
                </div>
                <div className="title-fecha">
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`La fecha límite es: ${fechaLimite}`}</span>
                </div>
            
                <div className="title-nombre">
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`Cantidad maxmima de participantes: ${cantidadMax}`}</span>
                </div>
                <div className="title-fecha">
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`Numero de participantes actuales: ${numParticipantes}`}</span>
                </div>
                <button id="boton-lista" onClick={toggleLista}>
                    {mostrarLista ? 'Ocultar Participantes ▲' : 'Mostrar Participantes ▼'}
                </button>

                {/* Lista desplegable */}
                {mostrarLista && (
                    <ul id="contenedor-lista">
                    {participantes.map((participante, index) => (
                    <li id="contenedor-texto" key={index}>{participante}</li>
                    ))}
                </ul>
            )}
            <div id="botones-bajos">
                <button className="boton-admin" onClick={openModal}>
                    <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{modificar}</span>
                </button>
                {modalVisible && <ActualizarTorneo onClose={closeModal} dataTorneo={dataTorneo} />}
                <button className="boton-adminE" onClick={handleEliminar}>
                    <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{eliminar}</span>
                </button>
                </div>
            </div>
            
      </div>
    );
}