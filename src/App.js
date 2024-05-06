import './App.css';
import { BrowserRouter,Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/login";
import Registro from "./paginas/registro";
import Users from "./paginas/pageUser";
import Admin from "./paginas/pageAdmin";
import NoPage from "./paginas/noPage";
function App() {
  //<Router></Router>
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            
            <Route index element={<Login />} />
            
            <Route path="/login" element={<Login />} />
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
