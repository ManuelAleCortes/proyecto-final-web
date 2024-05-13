import Menu from "../componentes/menu";
import React, { useState } from 'react';
import "../componentesStyle/paginas.css";
import TorneoCreado from '../componentes/createTorneo';
import FormularioTorneo from '../componentes/formularioTorneo';
import { useSelector } from 'react-redux';
import { app, auth, dataBase} from '../baseDatos/fireBase';
import { getDoc, doc } from 'firebase/firestore';
import { useDispatch} from 'react-redux';
import { actualizarUsuario  } from "../state/listaSlice";
import { useEffect } from "react";
import { obtenerTodosLosTorneos } from "../baseDatos/metodos";
export default function PageAdmin() {
  const dispatch = useDispatch();
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

    const fetchUserData = async () => {
      auth.onAuthStateChanged(async(user) =>{
        try{
  
        
        //console.log(user);
        
        const docRef = doc(dataBase, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          const { rol, email } = docSnap.data();
          
          dispatch(actualizarUsuario(({rol, email})));
        }else{
          console.log("El usuario no esta logeado")
        }
        }catch(error){
          console.log("No poseé una cuenta",error)
        }
      })
    };
    useEffect(()=>{
      fetchUserData();
    },[])
    useEffect(() => {
      dispatch(obtenerTodosLosTorneos());
    }, [dispatch]);
    
    async function handleLogout(){
      await auth.signOut();
      window.location.href = "/login";
    }
    const email = useSelector((state) => state.torneos.email);
    const rol = useSelector((state) => state.torneos.rol);
    return (
    <div>
        <header id="pagina-encabezado">
          <div>
            <Menu titulo="Login" direccion="/login" nombre="Página de administrador"/>
          </div>
          
        </header>
        {(email && rol === "administrador") ? (
          <>
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
            <button onClick={handleLogout}>Log out</button>
            <p>Usuario: {email}</p>
                <p>Rol: {rol}</p>
          </div>
        </div>
        </>
        ) : (
          <>
        <br/>
        <br/>
        <br/>
        
        <p>Usted no poseé una cuenta</p>
        
        </>
      )}
      </div>
    );
}