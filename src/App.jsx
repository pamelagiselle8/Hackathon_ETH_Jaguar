import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Comunidad from "./pages/Comunidad";
import MisPosts from "./pages/MisPosts";
import rutas from "./services/routing";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/mis-publicaciones" element={<MisPosts />} />
        <Route path="/perfil" element={<div>Perfil - Próximamente</div>} />
        <Route path="/logout" element={<div>Cerrando sesión...</div>} />
      </Routes>
    </Layout>
    // <Layout>
    //   <Routes>
    //     {rutas.map((ruta) => (
    //       <Route key={ruta.route} path={ruta.route} element={ruta.component} />
    //     ))}
    //   </Routes>
    // </Layout>
  );
}

export default App;
