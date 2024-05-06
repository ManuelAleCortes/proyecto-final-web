import Menu from "../componentes/menu";
import React, { useState } from 'react';
import "../componentesStyle/paginas.css";
import TorneoCreado from '../componentes/createTorneo';
import FormularioTorneo from '../componentes/formularioTorneo';
import { useSelector } from 'react-redux';
export default function PageAdmin() {
  const crear = "Crear un torneo";
  const torneo = {
    nombre: 'La champions',
    fechaLimite: '20/07/2024',
    imagen: 'https://i.pinimg.com/736x/48/9a/1a/489a1ac03e48d69fafbb399e5c8d908c.jpg',
    cantidadMax: 8,
    numPaticipantes: 0,
    participantes: [],
  };
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    const listaTorneos  = useSelector(state => state.torneos.listaTorneos);
    return (
    <>
        <header id="pagina-encabezado">
          <div>
            <Menu titulo="Login" direccion="/login" nombre="Página de administrador"/>
          </div>
          
        </header>
        <div id="pagina-contenido">
          <div id="pagina-contenido-contenedor">
          <div id="contenido-torneos">
              <button id="boton-crear" onClick={openModal}>
                <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{crear}</span>
              </button>
              {modalVisible && <FormularioTorneo onClose={closeModal} />}
              <div id="contenedor-torneos">

                {listaTorneos.map((torneo, index) => (
                         <TorneoCreado key={index} dataTorneo={torneo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}