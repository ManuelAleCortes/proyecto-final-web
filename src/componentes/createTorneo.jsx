import "../componentesStyle/createTorneo.css";
//import { eliminarTorneo } from "../state/listaSlice";
import { useDispatch} from 'react-redux';
import { removeTorneo, obtenerTodosLosTorneos } from "../baseDatos/metodos";
import ActualizarTorneo from '../componentes/actualizarTorneo';
import { dataBase } from "../baseDatos/fireBase";
import { useState } from "react";
export default function CreateTorneo({dataTorneo}) {
    //const { nombre, fechaLimite, imagen, cantidadMax, numParticipantes, participantes, id } = dataTorneo;
    const { nombre, fechaLimite, imagen, cantidadMax, numParticipantes, id } = dataTorneo;
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
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