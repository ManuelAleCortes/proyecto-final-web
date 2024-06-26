import Menu from "../componentes/menu";
import React, { useState } from 'react';
import "../componentesStyle/paginas.css";
import TorneoCreado from '../componentes/createTorneo';
import FormularioTorneo from '../componentes/formularioTorneo';
import { useSelector } from 'react-redux';
import { auth, dataBase} from '../baseDatos/fireBase';
import { getDoc, doc } from 'firebase/firestore';
import { useDispatch} from 'react-redux';
import { actualizarUsuario  } from "../state/listaSlice";
import { useEffect } from "react";
import { obtenerTodosLosTorneos } from "../baseDatos/metodos";
import { ToastContainer, toast } from "react-toastify";
export default function PageAdmin() {
  const dispatch = useDispatch();
  const crear = "Crear un torneo";

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    const listaTorneos  = useSelector(state => state.torneos.listaTorneos);
    const showToast = () => {
      toast.success('¡Torneo agregado con éxito!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
    const showInfo = () => {
      toast.info('Se ha modificado un torneo', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
    const fetchUserData = async (dispatch) => {
      auth.onAuthStateChanged(async(user) =>{
        try{
  
        
        //console.log(user);
        
        const docRef = doc(dataBase, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          const { rol, email } = docSnap.data();
          
          dispatch(actualizarUsuario(({rol, email})));
        }else{
          //console.log("El usuario no esta logeado")
        }
        }catch(error){
          //console.log("No poseé una cuenta",error)
        }
      })
    };
    useEffect(()=>{
      fetchUserData(dispatch);
    },[dispatch])
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
    <div id="pagina-admin">
        <header id="pagina-encabezado">
          <div>
            <Menu titulo="Login" direccion="/administrador" nombre="Página de administrador"/>
          </div>
          
        </header>
        {(email && rol === "administrador") ? (
          <>
        <div id="pagina-contenido-admin">
          <div id="pagina-contenido-contenedor-admin">
            <button id="boton-crear" onClick={openModal}>
                <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{crear}</span>
            </button>
          <div id="contenido-torneos"> 
              {modalVisible && <FormularioTorneo onClose={closeModal} showToast={showToast} />}
              <div id="contenedor-torneos">

                {listaTorneos.map((torneo, index) => (
                         <TorneoCreado key={index} dataTorneo={torneo} showInfo={showInfo} />
                ))}
              </div>
            </div>
            
            <p>Usuario: {email}</p>
            <p>Rol: {rol}</p>
            <button id="log-out" onClick={handleLogout}>Log out</button>
            
          </div>
        </div>
        </>
        ) : (
          <>

        
        <p>Usted no poseé una cuenta</p>
        
        </>
      )}
      <ToastContainer />
      </div>
    );
}