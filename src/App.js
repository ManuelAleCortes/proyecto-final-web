import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./paginas/login";
import Registro from "./paginas/registro";
import Users from "./paginas/pageUser";
import Admin from "./paginas/pageAdmin";
import NoPage from "./paginas/noPage";
import { useSelector } from 'react-redux';
function App() {
  //<Router></Router>
  const email = useSelector((state) => state.torneos.email);
  const rol = useSelector((state) => state.torneos.rol);
  
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            
            <Route index element={<Login />} />
            
            <Route path="/login" element={email !== null ? rol === "usuario" ? <Navigate to="/usuario"/>:<Navigate to="/administrador"/>:<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/usuario" element={<Users />} />
            <Route path="/administrador" element={<Admin />} />
            <Route path="*" element={<NoPage />} />
            
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
