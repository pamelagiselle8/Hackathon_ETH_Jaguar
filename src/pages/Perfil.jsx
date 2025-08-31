import React from 'react';
import {
  Container,
  Paper,
  Avatar,
  Text,
  Group,
  Stack,
  Badge,
  Grid,
  Card,
  Title,
  Divider,
  SimpleGrid,
  RingProgress,
  Center,
  Loader,
  Tabs,
} from '@mantine/core';
import {
  IconUser,
  IconTrophy,
  IconCoin,
  IconCalendar,
  IconMessage,
  IconList,
} from '@tabler/icons-react';
import { useContract } from '../hooks/useContract';
import PostCard from '../components/PostCard';

function Perfil() {
  // 1. Obtener datos del usuario y sus posts desde el blockchain
  const {
    userAddress,
    posts: allPosts,
    isLoadingPosts,
    getPostsByAuthor
  } = useContract();
  const { postIds, isLoading: isLoadingIds } = getPostsByAuthor(userAddress);

  // Filtrar los posts que pertenecen al usuario actual
  const userPosts = (allPosts || [])
    .filter((post) =>
      (postIds || []).map((id) => parseInt(id.toString())).includes(post.id)
    )
    .sort((a, b) => b.id - a.id);

  // Estadísticas basadas en datos del blockchain (ejemplos)
  const userStats = {
    posts: userPosts.length,
    reputation: 850, // Este valor podría venir del contrato en el futuro
    joinDate: 'Agosto 2025', // Este valor podría venir del contrato en el futuro
  };

  if (isLoadingPosts || isLoadingIds) {
    return (
      <Container size="md">
        <Center style={{ height: '50vh' }}>
          <Stack align="center">
            <Loader size="lg" />
            <Text c="dimmed">Cargando perfil del blockchain...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* Header del Perfil anónimo */}
        <Paper withBorder p="xl" radius="md">
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: "auto" }}>
              <Avatar size={100} radius="xl" color="blue">
                <IconUser size={50} />
              </Avatar>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="xs">
                <Title order={2} size="h3" align="left">
                  {userAddress
                    ? `${userAddress.substring(0, 6)}...${userAddress.substring(38)}`
                    : 'Usuario Anónimo'}
                </Title>
                <Group gap="md">
                  <Badge color="gray" variant="light" size="sm">
                    Dirección de Wallet
                  </Badge>
                  <Group gap="xs">
                    <IconCalendar size={16} color="var(--mantine-color-gray-6)" />
                    <Text size="sm" c="dimmed">Miembro desde {userStats.joinDate}</Text>
                  </Group>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Estadísticas */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Card withBorder p="md" radius="md">
            <Stack align="center" gap="xs" py="md">
              <Text fw={700} size="xl" c="blue">{userStats.posts}</Text>
              <Text size="sm" c="dimmed">Publicaciones</Text>
            </Stack>
          </Card>
          <Card withBorder p="md" radius="md">
            <Stack align="center" gap="xs">
              <RingProgress
                size={50}
                thickness={6}
                sections={[{ value: (userStats.reputation / 1000) * 100, color: 'gold' }]}
                label={
                  <Center>
                    <IconCoin size={14} />
                  </Center>
                }
              />
              <Text size="sm" c="dimmed" ta="center">Reputación<br/>{userStats.reputation}/1000</Text>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* Tabs de contenido */}
        <Tabs defaultValue="posts" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="posts" leftSection={<IconList size={16} />}>
              Mis Publicaciones ({userPosts.length})
            </Tabs.Tab>
            {/* <Tabs.Tab value="achievements" leftSection={<IconTrophy size={16} />}>
              Logros
            </Tabs.Tab> */}
          </Tabs.List>

          <Tabs.Panel value="posts" pt="md">
            <Stack>
              {userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <Paper p="xl" withBorder radius="md" style={{ textAlign: 'center' }}>
                  <Text c="dimmed">Aún no has realizado ninguna publicación.</Text>
                </Paper>
              )}
            </Stack>
          </Tabs.Panel>

          {/* <Tabs.Panel value="achievements" pt="md">
            <Paper withBorder p="md" radius="md">
              <Stack align="center" gap="md">
                <IconTrophy size={40} color="var(--mantine-color-gray-5)" />
                <Text c="dimmed">La sección de logros estará disponible próximamente.</Text>
              </Stack>
            </Paper>
          </Tabs.Panel> */}
        </Tabs>
      </Stack>
    </Container>
  );
}

export default Perfil;