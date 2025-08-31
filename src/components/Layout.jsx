import { useDisclosure } from '@mantine/hooks';
import { AppShell, Group, Burger } from '@mantine/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Navbar from './Navbar';

function Layout({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 80 }}
      footer={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      transitionDuration={350}
      transitionTimingFunction="ease"
      padding="sm"
    >
      <AppShell.Header>
        <Group h="100%" px="lg" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <img src="src/assets/logo.png" alt="Logo" style={{ height: 90 }} />
          </Group>
          <ConnectButton />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main style={{ position: 'relative', width: '100%' }}>
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </AppShell.Main>
      <AppShell.Footer p="md" style={{ fontSize: '12px', textAlign: 'center' }} c="dimmed">© REDE 2025 - Powered by Blockchain</AppShell.Footer>
    </AppShell>
  );
}

export default Layout;