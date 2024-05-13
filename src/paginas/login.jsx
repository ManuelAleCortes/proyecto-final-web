import React, { useState } from 'react';
import Menu from "../componentes/menu";
import "../componentesStyle/paginas.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { app, auth, dataBase} from '../baseDatos/fireBase';
import PageUser from './pageUser';
import {useSubmit, Form} from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { actualizarUsuario } from "../state/listaSlice";
import { useDispatch} from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();
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
            const { rol, email } = userData;
            // Redirigir basado en el rol del usuario
            
            if (rol === "administrador") {
              window.location.href = "/administrador";
            } else {
              window.location.href = "/usuario";
            }
          
          } else {
            // Manejar el caso en que no se encuentre información del usuario en Firestore
            console.log("No se encontró información del usuario en Firestore");
          }
        }else{

        }
      }catch(error){
        //console.log(error);
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

                  <button type="submit">Iniciar sesión</button>
                  
              </form>
          </div>
        </div>
      </>
    );
}