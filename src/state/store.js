import { configureStore } from "@reduxjs/toolkit";
import listaReducer from "./listaSlice";

const store = configureStore({
    reducer: {
      torneos: listaReducer
    }
  });
  
  export default store;
