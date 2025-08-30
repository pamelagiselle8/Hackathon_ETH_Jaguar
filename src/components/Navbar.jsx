import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Center, Stack, NavLink } from '@mantine/core';
import rutas from '../services/routing';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Encontrar el índice activo basado en la ruta actual
  const activeIndex = rutas.findIndex(ruta => ruta.route === location.pathname);
  const [active, setActive] = useState(activeIndex >= 0 ? activeIndex : 0);

  const handleNavigation = (ruta, index) => {
    setActive(index);
    if (ruta.route === '/logout') {
      
      return;
    }
    navigate(ruta.route);
  };

  // Filtrar solo las rutas que deben aparecer en el navbar
  const navbarRoutes = rutas.filter(ruta => ruta.navbar);

  const links = navbarRoutes.map((ruta, index) => (
    <NavLink
      key={ruta.label}
      label={ruta.label}
      leftSection={<ruta.icon size={20} stroke={1.5} />}
      active={index === active}
      onClick={() => handleNavigation(ruta, index)}
      style={{ borderRadius: 15 }}
    />
  ));

  return (
    <nav className="navbar">
      <Center>
        {/* Logo aquí si lo necesitas */}
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