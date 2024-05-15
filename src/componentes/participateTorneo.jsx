import { useEffect, useState } from "react";
import "../componentesStyle/createTorneo.css";
import { Link } from "react-router-dom";
import { agregarParticipanteTorneo, eliminarParticipanteTorneo, obtenerTodosLosTorneos } from "../baseDatos/metodos";
import { dataBase } from "../baseDatos/fireBase";
import { useDispatch, useSelector } from "react-redux";

export default function ParticipateTorneo({dataTorneo}) {
    const { nombre, fechaLimite, imagen, cantidadMax, numParticipantes, participantes, id } = dataTorneo;
    const [registrado, setRegistrado] = useState(false);
    const email = useSelector((state) => state.torneos.email);
    const dispatch = useDispatch();
    const listaTorneos  = useSelector(state => state.torneos.listaTorneos);
    const handleParticipar = async () => {
        //console.log(email);
        if(registrado === false){
            await agregarParticipanteTorneo(dataBase,id,email,numParticipantes);
        }else{
            await eliminarParticipanteTorneo(dataBase,id,email,numParticipantes);
        }
        dispatch(obtenerTodosLosTorneos());
        setRegistrado(!registrado);
    };

    useEffect(() => {
        const verificarRegistro = () => {
          listaTorneos.forEach(torneo => {
            if (torneo.id === id && torneo.participantes.includes(email)) {
              setRegistrado(true);
              // Si el usuario está registrado en al menos un torneo, no necesitamos seguir iterando
              return;
            }
          });
        };
    
        verificarRegistro();
      }, [listaTorneos, email]);
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
                    <span style={{ color: "black", fontSize: "13px", fontWeight: "bold"}}>{`Numero de participantes actuales: ${numParticipantes}`}</span>
                </div>
            </div>
            <div id="botones-bajos">
                <button onClick={handleParticipar} disabled={cantidadMax === numParticipantes && participantes.includes(email) === false} style={{ backgroundColor: registrado ? 'green' : '', color: registrado ? 'white' : 'black' }}>
                     <span style={{ fontSize: "15px", fontWeight: "bold" }}>{registrado ? "Registrado" : "Registrarse"}</span>
                 </button>
            </div>
            
      </div>
    );
}