import React from "react";
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Button,
  Stack,
  Badge,
  SimpleGrid,
  Card,
  Avatar,
  Divider,
} from "@mantine/core";
import {
  IconTrendingUp,
  IconUsers,
  IconMessageCircle,
  IconPlus,
  IconStar,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useContract } from "../hooks/useContract";

function Home() {
  const navigate = useNavigate();
  const { posts, userAddress } = useContract();

  // Estadísticas rápidas
  const totalPosts = posts.length;
  const trendingPosts = posts.filter((post) => post.upvotes >= 50 || post.downvotes >= 50).length;
  const recentPosts = posts.slice(-3); // sacar los ultimos 3 en la lista, no los primeros

  const statsCards = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: IconMessageCircle,
      color: "blue",
    },
    {
      title: "Trending",
      value: trendingPosts,
      icon: IconTrendingUp,
      color: "orange",
    },
    {
      title: "Usuarios Activos",
      value: new Set(posts.map((p) => p.authorAddress)).size,
      icon: IconUsers,
      color: "green",
    },
  ];

  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* Hero Section */}
        <Paper
          p="xl"
          radius="md"
          style={{
            color: "white",
            background:
              "linear-gradient(90deg,rgba(2, 0, 110, 1) 0%, rgba(10, 7, 175, 1) 30%, rgba(80, 103, 255, 1) 58%, rgba(84, 14, 232, 1) 100%)",
          }}
        >
          <Group justify="center" h={200}>
              <div>
                <Title size="h1" mb="md" align="center">
                  ¡Bienvenido a REDE! 🚀
                </Title>
                <Text size="lg">
                  La primera red social descentralizada para estudiantes
                  universitarios
                </Text>
                <Text size="md" opacity={0.9}>
                  Conecta, comparte y construye comunidad en el blockchain
                </Text>
              </div>
            {/* {userAddress ? (
              <Button
                size="lg"
                variant="white"
                leftSection={<IconPlus size={20} />}
                onClick={() => navigate("/nueva-publicacion")}
              >
                Crear Post
              </Button>
            ) : (
              <Text size="sm" opacity={0.8}>
                Conecta tu wallet para comenzar
              </Text>
            )} */}
          </Group>
        </Paper>

        {/* Estadísticas rápidas */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} padding="md" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                      {stat.title}
                    </Text>
                    <Text fw={700} size="xl">
                      {stat.value}
                    </Text>
                  </div>
                  <Icon
                    size={28}
                    color={`var(--mantine-color-${stat.color}-6)`}
                  />
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Posts recientes */}
        <div>
          <Group justify="space-between" mb="md">
            <Title size="h3">Posts Recientes</Title>
            <Button variant="subtle" onClick={() => navigate("/comunidad")}>
              Ver todos
            </Button>
          </Group>

          {recentPosts.length > 0 ? (
            <Stack gap="md">
              {recentPosts.map((post) => (
                <Paper key={post.id} p="md" withBorder radius="md">
                  <Group justify="space-between" mb="sm">
                    <Group>
                      <Avatar color="blue" size="sm" radius="xl">
                        {post.authorAddress?.substring(2, 4).toUpperCase()}
                      </Avatar>
                      <div>
                        <Text size="sm" fw={500}>
                          {post.authorName}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {post.timeAgo}
                        </Text>
                      </div>
                    </Group>
                    {post.upvotes >= 50 && (
                      <Badge color="orange" variant="light" size="sm">
                        Trending
                      </Badge>
                    )}
                  </Group>
                  <Text size="sm" lineClamp={2} mb="sm">
                    {post.content}
                  </Text>
                  <Group gap="md">
                    <Text size="xs" c="dimmed">
                      👍 {post.upvotes} • 💬 {post.comments || 0}
                    </Text>
                  </Group>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Paper p="xl" ta="center" c="dimmed">
              <IconMessageCircle
                size={48}
                style={{ opacity: 0.5, marginBottom: "1rem" }}
              />
              <Text>No hay posts aún</Text>
              <Button
                mt="md"
                onClick={() => navigate("/nueva-publicacion")}
                disabled={!userAddress}
              >
                Crear el primer post
              </Button>
            </Paper>
          )}
        </div>

        {/* Enlaces rápidos */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Card padding="md" radius="md" withBorder>
            <Group mb="md">
              <IconUser size={24} />
              <Title size="h4">Mi Perfil</Title>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              Ve tus posts, configuración y estadísticas
            </Text>
            <Button
              variant="light"
              fullWidth
              onClick={() => navigate("/perfil")}
              disabled={!userAddress}
            >
              Ver Perfil
            </Button>
          </Card>

          <Card padding="md" radius="md" withBorder>
            <Group mb="md">
              <IconStar size={24} />
              <Title size="h4">Trending</Title>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              Explora los posts más populares en la comunidad
            </Text>
            <Button
              variant="light"
              fullWidth
              onClick={() => navigate("/comunidad")}
              disabled={!userAddress}
            >
              Ver posts trending
            </Button>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default Home;
