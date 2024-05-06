import React, { useState } from 'react';
import Menu from "../componentes/menu";
import "../componentesStyle/paginas.css";
import { fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { app, auth, database} from '../baseDatos/fireBase';
import PageUser from './pageUser';
import {useSubmit, Form} from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function Login() {


  const [role, setRole] = useState('usuario');
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefaul();
      const correo = e.target.emailField.value;
      const password = e.target.passwordField.value;
      fetchSignInMethodsForEmail(auth, correo)
          .then((signInMethods) => {
          if (signInMethods.length === 0) {
              // Si signInMethods.length es 0, significa que no hay una cuenta asociada con el correo electrónico
              console.log('No hay cuenta asociada con este correo electrónico.');
              navigate('/page');
              // Aquí podrías redirigir al usuario a una página de registro o mostrar un mensaje de error
          } else {
              // Si hay métodos de inicio de sesión disponibles, intenta iniciar sesión con el correo electrónico y la contraseña proporcionados
              signInWithEmailAndPassword(auth, correo, password)
              .then((userCredential) => {
                  // Usuario autenticado correctamente
                  console.log('Usuario autenticado:', userCredential);
                  // Aquí podrías redirigir al usuario a la otra página

                })
          .catch((error) => {
            // Error al iniciar sesión
            console.error('Error al iniciar sesión:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
          });
          }
      })
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
                      <div id="form-content3">
                      <label>
                        <input
                          type="radio"
                          value="usuario"
                          checked={role === 'usuario'}
                          onChange={handleRoleChange}
                        />
                        Usuario
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="administrador"
                          checked={role === 'administrador'}
                          onChange={handleRoleChange}
                        />
                        Administrador
                      </label>
                    </div>
                  <button type="submit">Iniciar sesión</button>
                  
              </form>
          </div>
        </div>
      </>
    );
}