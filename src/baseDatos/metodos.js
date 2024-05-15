
import { collection, getDocs,addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { dataBase, imageDb} from '../baseDatos/fireBase';
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
  const { nombre, fechaLimite, imagen, cantidadMax,numParticipantes, participantes } = nuevoTorneo;
  try {
    const docRef = await addDoc(collection(dataBase, "Torneos"), {
      nombre: nombre,
      fechaLimite: fechaLimite,
      imagen: imagen,
      cantidadMax: cantidadMax,
      numParticipantes: numParticipantes,
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
async function updateTorneo(dataBase, idTorneo, updateTorneo) {
  const { nombre, fechaLimite, imagen, cantidadMax } = updateTorneo;
  try {
    // Obtener una referencia al documento del torneo
    const torneoRef = doc(dataBase, 'Torneos', idTorneo);

    // Actualizar el documento en Firestore con los nuevos datos
    await updateDoc(torneoRef, {
      nombre: nombre,
      fechaLimite: fechaLimite,
      imagen: imagen,
      cantidadMax: cantidadMax
      // Puedes agregar aquí otros campos que desees actualizar
    });

    //console.log("El torneo ha sido actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el documento del torneo: ", error);
  }
}
async function agregarParticipanteTorneo(dataBase, id, email,numParticipantes) {
  try {
    // Obtener una referencia al documento del torneo
    const torneoRef = doc(dataBase, 'Torneos', id);

    // Obtener los datos actuales del documento
    const torneoDoc = await getDoc(torneoRef);
    if (torneoDoc.exists()) {
      // Obtener el array de participantes actual
      const participantesActuales = torneoDoc.data().participantes || [];

      // Agregar el nuevo participante al array
      participantesActuales.push(email);

      // Incrementar el número de participantes
      const nuevoNumeroDeParticipantes = numParticipantes + 1;

      // Actualizar el documento en Firestore con el nuevo array de participantes
      await updateDoc(torneoRef, { participantes: participantesActuales, numParticipantes: nuevoNumeroDeParticipantes  });

      //console.log(`El participante ${email} ha sido agregado al torneo.`);
    } else {
      //console.error('No se encontró el documento del torneo.');
    }
  } catch (error) {
    //console.error('Error al agregar participante al torneo:', error);
  }
}
async function eliminarParticipanteTorneo(dataBase, id, email,numParticipantes) {
  try {
    // Obtener una referencia al documento del torneo
    const torneoRef = doc(dataBase, 'Torneos', id);

    // Obtener los datos actuales del documento
    const torneoDoc = await getDoc(torneoRef);
    if (torneoDoc.exists()) {
      // Obtener el array de participantes actual
      let participantesActuales = torneoDoc.data().participantes || [];

      // Verificar si el nombre del participante está en el array
      const index = participantesActuales.indexOf(email);
      if (index !== -1) {
        // Eliminar el nombre del participante del array
        participantesActuales.splice(index, 1);

        // Decrementar el número de participantes
        const nuevoNumeroDeParticipantes = numParticipantes - 1;

        // Actualizar el documento en Firestore con el nuevo array de participantes
        await updateDoc(torneoRef, { participantes: participantesActuales, numParticipantes: nuevoNumeroDeParticipantes  });

        //console.log(`El participante ${email} ha sido eliminado del torneo.`);
      } else {
        //console.error(`El participante ${email} no está registrado en el torneo.`);
      }
    } else {
      //console.error('No se encontró el documento del torneo.');
    }
  } catch (error) {
    //console.error('Error al eliminar participante del torneo:', error);
  }
}
export { obtenerTodosLosTorneos, addTorneo,removeTorneo, agregarParticipanteTorneo, eliminarParticipanteTorneo,updateTorneo };