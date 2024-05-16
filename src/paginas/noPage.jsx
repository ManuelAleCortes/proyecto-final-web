import Menu from "../componentes/menu";
import "../componentesStyle/paginas.css";
export default function NoPage() {
    return (
    <>
        <header id="pagina-encabezado">
          <div>
            <Menu titulo="Login" direccion="/*" nombre="Página error 404"/>
          </div>
          
        </header>
        <div id="pagina-contenido">
          <div id="pagina-contenido-contenedor">

          </div>
        </div>
      </>
    );
}