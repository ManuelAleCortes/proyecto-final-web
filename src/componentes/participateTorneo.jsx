import "../componentesStyle/createTorneo.css";
import { Link } from "react-router-dom";

export default function ParticipateTorneo({dataTorneo}) {
    const { nombre, fechaLimite, imagen, cantidadMax, numPaticipantes, participantes } = dataTorneo;
    const Paricipar = "Paricipar";
    const handleParticipar = () => {
        
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
                <button id="boton-agregar" onClick={handleParticipar}>
                    <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{Paricipar}</span>
                </button>
            </div>
            
      </div>
    );
}