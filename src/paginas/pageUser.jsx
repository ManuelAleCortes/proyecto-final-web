import Menu from "../componentes/menu";
import "../componentesStyle/paginas.css";
import TorneoUnirse from '../componentes/participateTorneo';
import { useSelector } from 'react-redux';
import { app, auth, dataBase} from '../baseDatos/fireBase';
import { getDoc, doc } from 'firebase/firestore';
import { useDispatch} from 'react-redux';
import { actualizarUsuario  } from "../state/listaSlice";
import { useEffect } from "react";
import { obtenerTodosLosTorneos } from "../baseDatos/metodos";

import React from 'react'
export default function PageUser() {
  const unirse = "Participa en algun torneo";
  const torneo = {
    nombre: 'La champions',
    fechaLimite: '20/07/2024',
    imagen: 'https://i.pinimg.com/736x/48/9a/1a/489a1ac03e48d69fafbb399e5c8d908c.jpg',
    cantidadMax: 8,
    numParticipantes: 0,
    participantes: [],
  };
  const dispatch = useDispatch();
  //Obtener informacion de los torneos en la base de datos
  const listaTorneos  = useSelector(state => state.torneos.listaTorneos);
  //const [userDetails, set]
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async(user) =>{
      try{

      
      //console.log(user);
      //console.log(email);
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
  useEffect(() => {
    dispatch(obtenerTodosLosTorneos());
  }, [dispatch]);
  const email = useSelector((state) => state.torneos.email);
  const rol = useSelector((state) => state.torneos.rol);
  useEffect(()=>{
    fetchUserData();
    //console.log(email);
  },[])

  async function handleLogout(){
    await auth.signOut();
    window.location.href = "/login";
  }
  return (
    <div>
      <header id="pagina-encabezado">
          <div>
            <Menu titulo="Login" direccion="/login" nombre="Página de usuarios"/>
          </div>
          
        </header>
      {(email && rol === "usuario") ? (
        <>
        <div id="pagina-contenido">
          <div id="pagina-contenido-contenedor">
            <div id="contenido-torneos">
              <div >
                <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{unirse}</span>
                <p>Usuario: {email}</p>
                <p>Rol: {rol}</p>
              </div>
              <div id="contenedor-torneos">
                {listaTorneos.map((torneo, index) => (
                         <TorneoUnirse key={index} dataTorneo={torneo} />
                ))}
              </div>
            </div>
            <button onClick={handleLogout}>Log out</button>
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