import { createSlice } from "@reduxjs/toolkit";
import { app, auth, dataBase} from '../baseDatos/fireBase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc } from 'firebase/firestore';
import { addDoc, doc, collection, getDocs, updateDoc, deleteDoc, where, query } from "firebase/firestore";

import { useDispatch} from 'react-redux';
import { obtenerTodosLosTorneos } from "../baseDatos/metodos";
const torneosSlice = createSlice({
    name: 'torneos',
    initialState: {
      listaTorneos: [],
      email: null,
      rol: null,
    },
    reducers: {
      /*
       agregarTorneo: async (state, action) => {
        //Crear añadir un objeto a la lista
        
        const { nombre, fechaLimite, imagen, cantidadMax,numPaticipantes, participantes } = action.payload;
        try {
          const docRef = await addDoc(collection(dataBase, "Torneos"), {
            nombre: nombre,
            fechaLimite: fechaLimite,
            imagen: imagen,
            cantidadMax: cantidadMax,
            numPaticipantes: numPaticipantes,
            participantes: participantes,
          });
          
           await updateDoc(docRef, {
            id: docRef.id
          });
          //console.log("Document written with ID: ", docRef.id);
          
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      },
      eliminarTorneo:   (state, action) => {
        //Eliminar remover un objeto de la lista
        const { id } = action.payload;
        const docRef = doc(dataBase, "Torneos", id);
       deleteDoc(docRef)
      },
      */
      actualizarUsuario: (state, action) => {
        const { email, rol } = action.payload;
        
        return {
          ...state,
          email: email,
          rol: rol
        };
      },
      desactualizarUsuario: (state, action) => {
        //Eliminar remover un objeto de la lista
        state.email = null;
        state.rol = null;
      },
      actualizarListaTorneos: (state, action) => {
        state.listaTorneos = action.payload;
      },
    }
  });
  
  export const { actualizarUsuario, desactualizarUsuario, actualizarListaTorneos } = torneosSlice.actions;
  
  export default torneosSlice.reducer;
