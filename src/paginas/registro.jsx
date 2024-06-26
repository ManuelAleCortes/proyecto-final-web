import React, { useState } from 'react';
import Menu from "../componentes/menu";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../componentesStyle/paginas.css";
import { auth, dataBase} from '../baseDatos/fireBase';
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Registro() {
  const [role, setRole] = useState('usuario');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  const correo = e.target.emailField.value;
  const password = e.target.passwordField.value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
    const user = userCredential.user;
    //console.log(user);

    if (user) {
      await setDoc(doc(dataBase, "Users", user.uid), {
        email: user.email,
        rol: role,
      });
    }
    toast.success('Usuario registrado con éxito!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    // Despacha la acción después de completar la llamada a Firebase
    //console.log("Usuario registrado con exito")
  } catch (error) {
    //console.log(error);
    toast.error("Hubo un error, vuelva a intentarlo", {
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
            <Menu titulo="Ir a login" direccion="/login" nombre="Página de registro"/>
          </div>
          
        </header>
        <div id="pagina-contenido">
        
          <div id="pagina-contenido-contenedor">
          <form id="form-content"  onSubmit={submitHandler}>
                <div id="pagina-form">
                    <div id="form-content1">
                        <label htmlFor="emailField">Correo</label>
                        <input type="email" id="emailField"/>
                    </div>
                    <div id="form-content2">
                        <label htmlFor="passwordField">contraseña</label>
                        <input type="password" id="passwordField"/>
                    </div>
                    <div id="form-content3">
                      <label>
                        <input id='pooint2'
                          type="radio"
                          value="usuario"
                          checked={role === 'usuario'}
                          onChange={handleRoleChange}
                        />
                        Usuario
                      </label>
                      <label>
                        <input id='pooint'
                          type="radio"
                          value="administrador"
                          checked={role === 'administrador'}
                          onChange={handleRoleChange}
                        />
                        Administrador
                      </label>
                    </div>
                  </div>
                  <button id='botones-principales' type="submit">Registrarse</button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </>
    );
}