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
    component: Home,
    icon: IconMessage,
    navbar: true
  },
  {
    label: "Perfil",
    route: "/perfil",
    component: Home,
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
