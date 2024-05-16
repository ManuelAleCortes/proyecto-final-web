import { useEffect, useState } from "react";
import { auth } from "../baseDatos/fireBase";
import "../componentesStyle/menu.css";

export default function Menu(props) {
    //const usuario = "/usuario";
    //const administrador = "/administrador";
    const [texto, setTexto] = useState("");
    const [direccion, setDireccion] = useState("");

    async function handleLogout(){
        if(props.direccion === "/usuario" || props.direccion === "/administrador"){
            await auth.signOut();
        }
        window.location.href = direccion;
    }
    useEffect(() => {
        
        if (props.direccion === "/login") {
            setTexto("Ir al login");
            setDireccion("/login");
        } else if (props.direccion === "/registro") {
            setTexto("Ir al registro");
            setDireccion("/registro");
        } else if (props.direccion === "/usuario"){
            setTexto("Ir al inicio");
            setDireccion("/login");
        }
        else if (props.direccion === "/administrador"){
            setTexto("Ir al inicio");
            setDireccion("/login");
        }else{
            setTexto("Ir al inicio");
            setDireccion("/login");
        }
    }, []);
    return (
        <div id="contenedor-title">
            <div id="contenedor-title-text">
                <div id="title-text">
                    <span style={{ color: "white", fontSize: "14px", fontWeight: "bold"}}>{props.nombre}</span>
                </div>
                <div>
                    <button id="log-out-menu" onClick={handleLogout}>
                        <div id="title-text">
                            <span style={{ color: "black", fontSize: "14px", fontWeight: "bold"}}>{texto}</span>
                        </div>
                    </button>
                </div>
            </div>
      </div>
    );
}