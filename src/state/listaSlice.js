import { createSlice } from "@reduxjs/toolkit";
const torneosSlice = createSlice({
    name: 'torneos',
    initialState: {
      listaTorneos: [],
    },
    reducers: {
      agregarTorneo: (state, action) => {
        //Crear añadir un objeto a la lista
        const { nombre, fechaLimite, imagen, cantidadMax,numPaticipantes, participantes } = action.payload;
        const torneo = {
            nombre: nombre,
            fechaLimite: fechaLimite,
            imagen: imagen,
            cantidadMax: cantidadMax,
            numPaticipantes: numPaticipantes,
            participantes: participantes,
        }
        state.listaTorneos.push(torneo);
      },
      eliminarTorneo: (state, action) => {
        //Acción decrementar cantidad de un elemento en la lista
        const { nombre } = action.payload;
        const torneoExistente = state.listaTorneos.find(torneo => torneo.nombre === nombre);
        if (torneoExistente) {
            const index = state.listaTorneos.findIndex(torneo => torneo.nombre === nombre);
            if (index !== -1) {
                state.listaTorneos.splice(index, 1);
            }
        }
      }
    }
  });
  
  export const { agregarTorneo, eliminarTorneo} = torneosSlice.actions;
  
  export default torneosSlice.reducer;
