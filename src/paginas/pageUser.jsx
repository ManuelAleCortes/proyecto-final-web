import Menu from "../componentes/menu";
import "../componentesStyle/paginas.css";
import TorneoUnirse from '../componentes/participateTorneo';
import { useSelector } from 'react-redux';
export default function PageUser() {
  const unirse = "Participa en algun torneo";
  const torneo = {
    nombre: 'La champions',
    fechaLimite: '20/07/2024',
    imagen: 'https://i.pinimg.com/736x/48/9a/1a/489a1ac03e48d69fafbb399e5c8d908c.jpg',
    cantidadMax: 8,
    numPaticipantes: 0,
    participantes: [],
  };
  //Obtener informacion de los torneos en la base de datos
  const listaTorneos  = useSelector(state => state.torneos.listaTorneos);
  return (
    <>
        <header id="pagina-encabezado">
          <div>
            <Menu titulo="Login" direccion="/login" nombre="Página de usuarios"/>
          </div>
          
        </header>
        <div id="pagina-contenido">
          <div id="pagina-contenido-contenedor">
            <div id="contenido-torneos">
              <div id="boton-crear" >
                <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{unirse}</span>
              </div>
              <div id="contenedor-torneos">
                {listaTorneos.map((torneo, index) => (
                         <TorneoUnirse key={index} dataTorneo={torneo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}