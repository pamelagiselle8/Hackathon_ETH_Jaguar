import { useState } from 'react';
import { Center, Stack, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router';

// const rutas = [
//   { icon: IconHome2, label: 'Inicio', route: '/' },
//   { icon: IconUsers, label: 'Comunidad', route: '/comunidad' },
//   { icon: IconMessage, label: 'Mis publicaciones', route: '/mis-publicaciones' },
//   { icon: IconUser, label: 'Perfil', route: '/perfil' },
//   { icon: IconLogout, label: 'Cerrar sesión', route: '/logout' },
// ];
import rutas from '../services/routing';

function Navbar() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const links = rutas.map((link, index) => (
    link.navbar && (
    <NavLink
      key={link.label}
      label={link.label}
      leftSection={<link.icon size={20} stroke={1.5} />}
      active={index === active}
      onClick={() => {
        setActive(index)
        navigate(link.route)
      }}
      style={{ borderRadius: 15 }}
    />
  ))
  );

  return (
    <nav className="navbar">
      <Center>
        
      </Center>

      <div className="navbarMain">
        <Stack justify="start" gap={5}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;