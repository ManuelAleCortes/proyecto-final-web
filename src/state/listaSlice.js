import { createSlice } from "@reduxjs/toolkit";

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
