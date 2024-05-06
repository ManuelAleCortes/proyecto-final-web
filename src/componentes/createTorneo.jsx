import "../componentesStyle/createTorneo.css";
import { Link } from "react-router-dom";
import { eliminarTorneo } from "../state/listaSlice";
import { useDispatch} from 'react-redux';
export default function CreateTorneo({dataTorneo}) {
    const { nombre, fechaLimite, imagen, cantidadMax, numPaticipantes, participantes } = dataTorneo;
    const modificar = "Modificar";
    const eliminar = "eliminar";
    const dispatch = useDispatch();
    const handleModificar = () => {
        
    };
    const handleEliminar = () => {
        dispatch(eliminarTorneo({ nombre: nombre }));
    };

    return (    
        <div id="contenedor-torneo">
            <div className="contenedor-title-text">
                <div className="title-nombre">
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`Nombre del torneo: ${nombre}`}</span>
                </div>
                <div className="title-fecha">
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`La fecha límite es: ${fechaLimite}`}</span>
                </div>
            </div>
            <div>
                <img id="imagen-banner" src={imagen} alt="Imagen del torneo" style={{ width: '125px', height: '100px' }} />
            </div>
            <div className="contenedor-title-text">
                <div className="title-nombre">
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`Cantidad maxmima de participantes: ${cantidadMax}`}</span>
                </div>
                <div className="title-fecha">
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`Numero de participantes actuales: ${numPaticipantes}`}</span>
                </div>
            </div>
            <div id="botones-bajos">
                <button id="boton-agregar" onClick={handleModificar}>
                    <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{modificar}</span>
                </button>
                <button id="boton-agregar" onClick={handleEliminar}>
                    <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{eliminar}</span>
                </button>
            </div>
            
      </div>
    );
}