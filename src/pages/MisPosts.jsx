import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Button,
  Center,
  Loader,
  Paper,
  Select,      // 1. Importar Select
  TagsInput,   // 2. Importar TagsInput
} from "@mantine/core";
import { IconPlus, IconFilter, IconSearch } from "@tabler/icons-react"; // 3. Importar iconos
import { useNavigate } from "react-router";
import { useContract } from "../hooks/useContract";
import PostCard from "../components/PostCard";
import { categories } from "../services/contract"; // 4. Importar categorías

function MisPosts() {
  const navigate = useNavigate();
  // 5. Añadir estados para filtros y búsqueda
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTags, setSearchTags] = useState([]);

  const { posts: allPosts, isLoadingPosts, userAddress, getPostsByAuthor } = useContract();
  const { postIds, isLoading: isLoadingIds } = getPostsByAuthor(userAddress);

  // 6. Actualizar lógica de filtrado para incluir categoría y tags
  const userPosts = (allPosts || [])
    .filter((post) => // Primero, filtrar por autor
      (postIds || []).map((id) => parseInt(id.toString())).includes(post.id)
    )
    .filter((post) => { // Luego, por categoría
      return selectedCategory === "all" || post.category === selectedCategory;
    })
    .filter((post) => { // Finalmente, por tags
      if (searchTags.length === 0) {
        return true;
      }
      return post.topics && post.topics.some((tag) => searchTags.includes(tag));
    })
    .sort((a, b) => b.id - a.id); // Ordenar por más reciente

  const handleNewPost = () => {
    navigate("/nueva-publicacion");
  };

  if (isLoadingPosts || isLoadingIds) {
    return (
      <Container size="md">
        <Center style={{ height: "50vh" }}>
          <Stack align="center">
            <Loader size="lg" />
            <Text c="dimmed">Cargando tus publicaciones...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Title order={1} size="h2">
            Mis Publicaciones
          </Title>
        </Group>
        <Text align="left" c="dimmed" size="sm">
          Aquí puedes ver, filtrar y buscar todas las publicaciones que has creado en el
          blockchain.
        </Text>

        {/* 7. Añadir controles de filtro y búsqueda */}
        <Group grow>
          <TagsInput
            placeholder="Buscar por temas..."
            value={searchTags}
            onChange={setSearchTags}
            leftSection={<IconSearch size={16} />}
            clearable
          />
          <Select
            placeholder="Filtrar por categoría"
            data={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            leftSection={<IconFilter size={16} />}
            clearable={false}
          />
        </Group>

        <div>
          {userPosts.length === 0 ? (
            <Paper p="xl" radius="md" style={{ textAlign: "center" }}>
              <Text c="dimmed" mb="md">
                No se encontraron publicaciones con los filtros actuales.
              </Text>
              <Button
                variant="light"
                onClick={handleNewPost}
                leftSection={<IconPlus size={16} />}
              >
                Crear tu primera publicación
              </Button>
            </Paper>
          ) : (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </Stack>
    </Container>
  );
}

export default MisPosts;