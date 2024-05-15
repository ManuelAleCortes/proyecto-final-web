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
      actualizarUsuario: (state, action) => {
        const { email, rol } = action.payload;
        
        return {
          ...state,
          email: email,
          rol: rol
        };
      },
      desactualizarUsuario: (state, action) => {
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
