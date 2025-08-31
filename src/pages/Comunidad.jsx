import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Avatar,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Button,
  Divider,
  Tabs,
  Select,
  Center,
  Loader,
  Alert,
} from "@mantine/core";
import {
  IconArrowUp,
  IconArrowDown,
  IconMessageCircle,
  IconPlus,
  IconFilter,
  IconTrendingUp,
  IconAlertCircle,
  IconRefresh,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import PostCard from "../components/PostCard";
import { categories } from "../services/contract";
import { useContract } from "../hooks/useContract";

function Comunidad() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recent");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Usar el hook del contrato
  const { posts, isLoadingPosts, refetchPosts, userAddress, isUsingFallback } =
    useContract();

  // Filtrar posts por categoría
  const filteredPosts = posts.filter(
    (post) => selectedCategory === "all" || post.category === selectedCategory
  );

  // Ordenar posts según la tab activa
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === "trending") {
      return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
    }
    return 0; // Para 'recent' mantener el orden original
  });

  const handleNewPost = () => {
    navigate("/new-post");
  };

  if (isLoadingPosts) {
    return (
      <Container size="md">
        <Center style={{ height: "50vh" }}>
          <Stack align="center">
            <Loader size="lg" />
            <Text c="dimmed">Cargando posts del blockchain...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Stack gap="lg">
        {/* Alerta de conexión */}
        {!userAddress && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Wallet no conectada"
            color="yellow"
            align="left"
          >
            <Text size="sm" c="dimmed">Conecta tu wallet para votar, comentar y crear posts en el
            blockchain.</Text>
          </Alert>
        )}

        {/* Header */}
        <Group justify="space-between" align="center">
          <Group>
            <Title size="h2">Comunidad Universitaria</Title>
          </Group>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleNewPost}
            size="sm"
            disabled={!userAddress}
          >
            Nuevo Post
          </Button>
        </Group>
        <Text c="dimmed" size="sm" align="left">
          Comparte, discute y conecta con otros estudiantes en el blockchain
        </Text>

        <Divider />

        {/* Filtros y Tabs */}
        <Group justify="space-between">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="recent">Recientes</Tabs.Tab>
              <Tabs.Tab
                value="trending"
                leftSection={<IconTrendingUp size={14} />}
              >
                Trending
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Select
            placeholder="Filtrar por categoría"
            data={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            leftSection={<IconFilter size={16} />}
            clearable={false}
            w={250}
          />
        </Group>

        {/* Feed de posts */}
        <div>
          {sortedPosts.length === 0 ? (
            <Paper p="xl" radius="md" style={{ textAlign: "center" }}>
              <Text c="dimmed">
                {selectedCategory === "all"
                  ? "No hay posts disponibles en el blockchain."
                  : "No hay posts en esta categoría."}
              </Text>
              <Button
                mt="md"
                variant="light"
                onClick={handleNewPost}
                leftSection={<IconPlus size={16} />}
                disabled={!userAddress}
              >
                Crear el primer post
              </Button>
            </Paper>
          ) : (
            sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>

        {/* Información adicional */}
        <Paper p="md" radius="md" bg="gray.0">
          <Text size="xs" c="dimmed" ta="center">
            💡 Todos los posts están almacenados en el blockchain de forma
            permanente e inmutable.
          </Text>
        </Paper>
      </Stack>

      {/* Botón flotante alternativo para móviles */}
      <ActionIcon
        onClick={handleNewPost}
        size="xl"
        radius="xl"
        variant="filled"
        color="blue"
        disabled={!userAddress}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          width: "56px",
          height: "56px",
          display: "block",
        }}
        aria-label="Crear nuevo post"
        hiddenFrom="sm"
      >
        <IconPlus size={24} />
      </ActionIcon>

      {/* Alerta informativa sobre rate limiting */}
      {/* {isUsingFallback ? (
          <Alert 
            icon={<IconAlertCircle size={16} />} 
            title="Modo sin conexión" 
            color="orange"
          >
            Usando datos de demostración debido a limitaciones del servidor. Reintentando conexión automáticamente...
          </Alert>
        ) : (
          <Alert 
            icon={<IconRefresh size={16} />} 
            title="Optimización de carga" 
            color="blue"
          >
            Los datos se actualizan automáticamente cada 30 segundos para optimizar el rendimiento del blockchain.
          </Alert>
        )} */}
    </Container>
  );
}

export default Comunidad;
