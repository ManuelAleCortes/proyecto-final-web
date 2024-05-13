
import {collection, getDocs,addDoc, doc, updateDoc, deleteDoc, where, query } from "firebase/firestore";
import { app, auth, dataBase, imageDb} from '../baseDatos/fireBase';
import { actualizarListaTorneos } from "../state/listaSlice";
import { deleteObject, ref } from "firebase/storage";
 const obtenerTodosLosTorneos = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(dataBase, 'Torneos'));
    const listaTorneos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(actualizarListaTorneos(listaTorneos));
  } catch (error) {
    console.error('Error al obtener todos los torneos:', error);
    // Manejar el error, si es necesario
  }
};
async function addTorneo(dataBase, nuevoTorneo) {
  //Crear añadir un objeto a la lista
  const { nombre, fechaLimite, imagen, cantidadMax,numPaticipantes, participantes } = nuevoTorneo;
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
}
async function removeTorneo(dataBase, id, imagen) {
    //Eliminar remover un objeto de la lista
    try {
      const docRef = doc(dataBase, "Torneos", id);
      await deleteDoc(docRef);

      // Obtener una referencia al almacenamiento a partir de la URL de la imagen
      const imageRef = ref(imageDb, imagen);

      // Eliminar la imagen del almacenamiento
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      //throw error; // Propaga el error para que pueda ser manejado por quien llama a esta función
  }
}
export { obtenerTodosLosTorneos, addTorneo,removeTorneo };