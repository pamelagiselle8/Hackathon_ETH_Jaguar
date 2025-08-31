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
  Menu,
  Divider,
  Tabs,
  Center,
  Loader,
  Modal,
  TextInput,
  Textarea,
  Select,
} from "@mantine/core";
import {
  IconArrowUp,
  IconArrowDown,
  IconMessageCircle,
  IconPlus,
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
  IconTrendingUp,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { myPosts, categories } from "../services/data";

// Componente para cada post del usuario
function MyPostCard({ post, onEdit, onDelete }) {
  const [userVote, setUserVote] = useState(null);

  const getCategoryBadge = () => {
    const category = categories.find((cat) => cat.value === post.category);
    if (!category || category.value === "all") return null;

    return (
      <Badge color={category.color} variant="light" size="sm">
        {category.label}
      </Badge>
    );
  };

  const getStatusBadge = () => {
    const statusConfig = {
      published: { color: "green", label: "Publicado", icon: IconCheck },
      draft: { color: "yellow", label: "Borrador", icon: IconEdit },
      archived: { color: "gray", label: "Archivado", icon: IconX },
    };

    const status = statusConfig[post.status] || statusConfig.published;
    const StatusIcon = status.icon;

    return (
      <Badge
        color={status.color}
        variant="light"
        size="xs"
        leftSection={<StatusIcon size={12} />}
      >
        {status.label}
      </Badge>
    );
  };

  return (
    <Paper withBorder p="lg" radius="md" style={{ marginBottom: "1rem" }}>
      <Stack gap="sm">
        {/* Header del post */}
        <Group justify="space-between" align="flex-start">
          <Group>
            <Avatar color="blue" radius="xl" size="sm">
              TU
            </Avatar>
            <div>
              <Text fw={600} size="sm">
                Tú
              </Text>
              <Group gap="xs">
                <Text size="xs" c="dimmed">
                  {post.timeAgo}
                </Text>
                {getStatusBadge()}
                {post.trending && (
                  <Badge
                    color="orange"
                    variant="light"
                    size="xs"
                    leftSection={<IconTrendingUp size={12} />}
                  >
                    Trending
                  </Badge>
                )}
              </Group>
            </div>
          </Group>

          <Group gap="xs">
            {getCategoryBadge()}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Acciones</Menu.Label>
                <Menu.Item
                  leftSection={<IconEye size={14} />}
                  onClick={() => console.log("Ver post completo")}
                >
                  Ver completo
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconEdit size={14} />}
                  onClick={() => onEdit(post)}
                >
                  Editar
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  onClick={() => onDelete(post)}
                >
                  Eliminar
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        {/* Contenido del post */}
        <div>
          <Title order={4} size="h5" mb="xs" style={{ textAlign: "left" }}>
            {post.title}
          </Title>
          <Text
            size="sm"
            style={{ textAlign: "left", lineHeight: 1.5 }}
            lineClamp={3}
          >
            {post.content}
          </Text>
        </div>

        {/* Estadísticas del post */}
        <Group gap="md" mt="sm">
          <Group gap="xs">
            <ActionIcon variant="subtle" color="blue" size="sm">
              <IconArrowUp size={16} />
            </ActionIcon>
            <Text size="sm" fw={500}>
              {post.upvotes}
            </Text>
            <ActionIcon variant="subtle" color="red" size="sm">
              <IconArrowDown size={16} />
            </ActionIcon>
            <Text size="sm" fw={500}>
              {post.downvotes}
            </Text>
          </Group>

          <Group gap="xs">
            <ActionIcon variant="subtle" color="gray" size="sm">
              <IconMessageCircle size={16} />
            </ActionIcon>
            <Text size="sm" c="dimmed">
              {post.comments} comentarios
            </Text>
          </Group>

          <Group gap="xs">
            <ActionIcon variant="subtle" color="gray" size="sm">
              <IconEye size={16} />
            </ActionIcon>
            <Text size="sm" c="dimmed">
              {post.views} vistas
            </Text>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}

// Modal para editar post
function EditPostModal({ post, opened, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category,
      });
    }
  }, [post]);

  const handleSave = () => {
    onSave({ ...post, ...formData });
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar Publicación"
      size="lg"
    >
      <Stack gap="md">
        <TextInput
          label="Título"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />

        <Select
          label="Categoría"
          value={formData.category}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
          data={categories.filter((cat) => cat.value !== "all")}
          required
        />

        <Textarea
          label="Contenido"
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          minRows={4}
          required
        />

        <Group justify="flex-end">
          <Button variant="subtle" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </Group>
      </Stack>
    </Modal>
  );
}

function MisPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [editingPost, setEditingPost] = useState(null);
  const [editModalOpened, setEditModalOpened] = useState(false);

  // Simular carga de posts del usuario
  useEffect(() => {
    const loadMyPosts = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPosts(myPosts);
      setLoading(false);
    };

    loadMyPosts();
  }, []);

  // Filtrar posts por estado
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "all") return true;
    return post.status === activeTab;
  });

  // Estadísticas
  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    drafts: posts.filter((p) => p.status === "draft").length,
    totalUpvotes: posts.reduce((sum, p) => sum + p.upvotes, 0),
    totalComments: posts.reduce((sum, p) => sum + p.comments, 0),
    totalViews: posts.reduce((sum, p) => sum + p.views, 0),
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditModalOpened(true);
  };

  const handleDelete = (post) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")
    ) {
      setPosts(posts.filter((p) => p.id !== post.id));
    }
  };

  const handleSaveEdit = (updatedPost) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  };

  const handleNewPost = () => {
    navigate("/new-post");
  };

  if (loading) {
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
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleNewPost}
            size="sm"
          >
            Nueva Publicación
          </Button>
        </Group>
        <Text align="left" c="dimmed" size="sm">
          Gestiona y revisa todas tus publicaciones
        </Text>

        {/* Estadísticas */}
        <Paper withBorder p="md" radius="md">
          <Group gap="xl">
            <div style={{ textAlign: "center" }}>
              <Text size="xl" fw={700} c="blue">
                {stats.total}
              </Text>
              <Text size="xs" c="dimmed">
                Total Posts
              </Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="xl" fw={700} c="green">
                {stats.published}
              </Text>
              <Text size="xs" c="dimmed">
                Publicados
              </Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="xl" fw={700} c="yellow">
                {stats.drafts}
              </Text>
              <Text size="xs" c="dimmed">
                Borradores
              </Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="xl" fw={700} c="violet">
                {stats.totalUpvotes}
              </Text>
              <Text size="xs" c="dimmed">
                Total Votos
              </Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="xl" fw={700} c="orange">
                {stats.totalComments}
              </Text>
              <Text size="xs" c="dimmed">
                Comentarios
              </Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="xl" fw={700} c="gray">
                {stats.totalViews}
              </Text>
              <Text size="xs" c="dimmed">
                Vistas
              </Text>
            </div>
          </Group>
        </Paper>

        <Divider />

        {/* Filtros por estado */}
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="all">Todas ({stats.total})</Tabs.Tab>
            <Tabs.Tab value="published" color="green">
              Publicadas ({stats.published})
            </Tabs.Tab>
            <Tabs.Tab value="draft" color="yellow">
              Borradores ({stats.drafts})
            </Tabs.Tab>
            <Tabs.Tab value="archived" color="gray">
              Archivadas (0)
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Lista de posts */}
        <div>
          {filteredPosts.length === 0 ? (
            <Paper p="xl" radius="md" style={{ textAlign: "center" }}>
              <Text c="dimmed" mb="md">
                {activeTab === "all"
                  ? "Aún no tienes publicaciones."
                  : `No tienes publicaciones en estado "${activeTab}".`}
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
            filteredPosts.map((post) => (
              <MyPostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Tips */}
        <Paper p="md" radius="md" bg="blue.0">
          <Text size="xs" c="dimmed" ta="center">
            💡 Tip: Mantén tus publicaciones actualizadas y responde a los
            comentarios para generar más engagement.
          </Text>
        </Paper>
      </Stack>

      {/* Modal de edición */}
      <EditPostModal
        post={editingPost}
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        onSave={handleSaveEdit}
      />
    </Container>
  );
}

export default MisPosts;
