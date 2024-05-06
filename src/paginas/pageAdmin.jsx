import Menu from "../componentes/menu";
import "../componentesStyle/paginas.css";
import TorneoCreado from '../componentes/createTorneo';
export default function PageAdmin() {
  const crear = "Crear un torneo";
  const torneo = {
    nombre: 'La champions',
    fechaLimite: '20/07/2024',
    imagen: 'https://i.pinimg.com/736x/48/9a/1a/489a1ac03e48d69fafbb399e5c8d908c.jpg',
    cantidadMax: 8,
    numPaticipantes: 0,
    participantes: [],
  };
  //Obtener informacion de los torneos en la base de datos
    const handleCrearTorneo = () => {
        
    };
    
    return (
    <>
        <header id="pagina-encabezado">
          <div>
            <Menu titulo="Login" direccion="/login" nombre="Página de administrador"/>
          </div>
          
        </header>
        <div id="pagina-contenido">
          <div id="pagina-contenido-contenedor">
          <div id="contenido-torneos">
              <button id="boton-crear" onClick={handleCrearTorneo}>
                <span style={{ color: "black", fontSize: "15px", fontWeight: "bold"}}>{crear}</span>
              </button>
              <div id="contenedor-torneos">
                <TorneoCreado dataTorneo={torneo}/>
                <TorneoCreado dataTorneo={torneo}/>
                <TorneoCreado dataTorneo={torneo}/>
                <TorneoCreado dataTorneo={torneo}/>
                <TorneoCreado dataTorneo={torneo}/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}