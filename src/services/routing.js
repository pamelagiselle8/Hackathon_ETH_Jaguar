import {
  IconHome2,
  IconLogout,
  IconUser,
  IconMessage,
  IconUsers,
} from "@tabler/icons-react";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import Comunidad from "../pages/Comunidad";
import MisPosts from "../pages/MisPosts";
import Perfil from "../pages/Perfil";

const rutas = [
  { 
    icon: IconHome2,
    label: "Inicio",
    route: "/",
    component: Home,
    navbar: true
  },
  {
    label: "Comunidad",
    route: "/comunidad",
    component: Comunidad,
    icon: IconUsers,
    navbar: true
  },
  {
    label: "Mis publicaciones",
    route: "/mis-publicaciones",
    component: MisPosts,
    icon: IconMessage,
    navbar: true
  },
  {
    label: "Perfil",
    route: "/perfil",
    component: Perfil,
    icon: IconUser,
    navbar: true
  },
  {
    label: "Cerrar sesión",
    route: "/logout",
    component: Home,
    icon: IconLogout,
    navbar: true
  },
  {
    label: "Nueva Publicación",
    route: "/nueva-publicacion",
    component: NewPost,
    icon: IconMessage,
    navbar: false
  }
];

export default rutas;