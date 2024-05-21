import React from 'react';
import Menu from "../componentes/menu";
import "../componentesStyle/paginas.css";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, dataBase} from '../baseDatos/fireBase';

import { getDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';


export default function Login() {
  
  const submitHandler = async (e) => {
    e.preventDefault();
      const correo = e.target.emailField.value;
      const password = e.target.passwordField.value;
      try{
        const userCredential = await signInWithEmailAndPassword(auth,correo,password);
        const user = userCredential.user;
        if (user) {
          // Obtener el rol del usuario desde Firestore
          const userDoc = await getDoc(doc(dataBase, "Users", user.uid));
          const userData = userDoc.data();
          
          if (userData) {
            const { rol } = userData;
            // Redirigir basado en el rol del usuario
            
            if (rol === "administrador") {
              window.location.href = "/administrador";
            } else {
              window.location.href = "/usuario";
            }
            toast.success('Inicio de sesión con éxito!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          } else {
            // Manejar el caso en que no se encuentre información del usuario en Firestore
            //console.log("No se encontró información del usuario en Firestore");
            toast.error("No se encontró información del usuario en la base de datos", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
        }else{

        }
      }catch(error){
        //console.log(error);
        toast.error("El usuario no se encuentra registrado en la página", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }

    };
    return (
    <>
        <header id="pagina-encabezado">
          <div>
            <Menu titulo="Ir a registro" direccion="/registro" nombre="Página login"/>
          </div>
          
        </header>
        <div id="pagina-contenido">
          <div id="pagina-contenido-contenedor">
            <form id="form-content" onSubmit={submitHandler}>
                  <div id="pagina-form">
                      <div id="form-content1">
                          <label htmlFor="emailField">Correo</label>
                          <input type="email" id="emailField"/>
                      </div>
                      <div id="form-content2"></div>
                          <label htmlFor="passwordField">contraseña</label>
                          <input type="password" id="passwordField"/>
                  </div>

                  <button id='botones-principales' type="submit">Iniciar sesión</button>
                  
              </form>
          </div>
        </div>
        <ToastContainer />
      </>
    );
}