import { useState } from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
  IconLogout,
} from '@tabler/icons-react';
import { Center, Stack, NavLink } from '@mantine/core';

const mockdata = [
  { icon: IconHome2, label: 'Inicio' },
  { icon: IconGauge, label: 'Comunidad' },
  { icon: IconDeviceDesktopAnalytics, label: 'Mis publicaciones' },
  { icon: IconCalendarStats, label: 'Perfil' },
  { icon: IconLogout, label: 'Cerrar sesión' },
];

function Navbar() {
  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavLink
      key={link.label}
      label={link.label}
      leftSection={<link.icon size={20} stroke={1.5} />}
      active={index === active}
      onClick={() => setActive(index)}
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