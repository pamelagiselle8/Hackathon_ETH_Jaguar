import { useDisclosure } from '@mantine/hooks';
import { AppShell, Group, Burger, Text, Image, Center } from '@mantine/core';
import Navbar from './Navbar';

function Layout({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 80 }}
      footer={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      // aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      transitionDuration={350}
      transitionTimingFunction="ease"
      padding="sm"
    >
      <AppShell.Header>
        <Group h="100%" px="lg">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img src="/logo.png" alt="Logo" style={{ height: 90 }} />
          {/* <Text fw={700} size='xl' color="light-blue">REDE</Text> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      {/* <AppShell.Aside p="md">Aside</AppShell.Aside> */}
      <AppShell.Main style={{ position: 'relative', width: '100%' }}>
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </AppShell.Main>
      <AppShell.Footer p="md">© REDE 2025</AppShell.Footer>
    </AppShell>
  );
}

export default Layout;