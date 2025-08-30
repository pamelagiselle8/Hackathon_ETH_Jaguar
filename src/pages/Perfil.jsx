import React, { useState } from 'react';
import {
  Container,
  Paper,
  Avatar,
  Text,
  Group,
  Stack,
  Badge,
  Button,
  Grid,
  Card,
  Title,
  Divider,
  ActionIcon,
  Modal,
  TextInput,
  Textarea,
  Select,
  Switch,
  Tabs,
  SimpleGrid,
  RingProgress,
  Center,
  ThemeIcon
} from '@mantine/core';
import {
  IconUser,
  IconEdit,
  IconSettings,
  IconBell,
  IconEye,
  IconHeart,
  IconMessage,
  IconTrophy,
  IconCoin,
  IconCalendar,
  IconMail,
  IconSchool,
  IconMapPin,
  IconCheck,
  IconX,
  IconCamera,
  IconPalette,
  IconLock,
  IconNotification
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function Perfil() {
  const [opened, { open, close }] = useDisclosure(false);
  const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
  
  // Estados para el perfil del usuario
  const [userProfile, setUserProfile] = useState({
    name: 'María González',
    username: '@maria_gonzalez',
    email: 'maria.gonzalez@universidad.edu',
    bio: 'Estudiante de Ingeniería en Sistemas. Apasionada por la tecnología blockchain y el desarrollo web.',
    faculty: 'Ingeniería',
    career: 'Ingeniería en Sistemas',
    semester: '6to Semestre',
    location: 'Ciudad Universitaria',
    joinDate: 'Enero 2023',
    avatar: null
  });

  const [editForm, setEditForm] = useState(userProfile);

  // Estadísticas del usuario
  const userStats = {
    posts: 24,
    comments: 156,
    likes: 89,
    followers: 45,
    following: 32,
    reputation: 850
  };

  // Actividad reciente
  const recentActivity = [
    { type: 'post', title: 'Nueva propuesta para el cafetería', time: '2 horas', icon: IconMessage },
    { type: 'like', title: 'Le gustó tu comentario sobre...', time: '5 horas', icon: IconHeart },
    { type: 'comment', title: 'Comentó en "Mejoras del WiFi"', time: '1 día', icon: IconMessage },
    { type: 'achievement', title: 'Logró "Colaborador Activo"', time: '3 días', icon: IconTrophy }
  ];

  const handleSaveProfile = () => {
    setUserProfile(editForm);
    close();
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        {/* Header del Perfil */}
        <Paper withBorder p="xl" radius="md">
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack align="center" gap="md">
                <div style={{ position: 'relative' }}>
                  <Avatar
                    size={120}
                    radius="xl"
                    color="blue"
                    src={userProfile.avatar}
                  >
                    <IconUser size={60} />
                  </Avatar>
                  <ActionIcon
                    size="sm"
                    radius="xl"
                    variant="filled"
                    color="blue"
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      right: 5
                    }}
                  >
                    <IconCamera size={14} />
                  </ActionIcon>
                </div>
                <Stack align="center" gap={4}>
                  <Text fw={700} size="xl">{userProfile.name}</Text>
                  <Text c="dimmed" size="sm">{userProfile.username}</Text>
                  <Badge color="blue" variant="light" size="sm">
                    {userProfile.semester}
                  </Badge>
                </Stack>
              </Stack>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="md">
                <Group justify="space-between">
                  <Title order={2} size="h3">Información Personal</Title>
                  <Group gap="xs">
                    <Button 
                      leftSection={<IconEdit size={16} />} 
                      variant="light"
                      onClick={open}
                    >
                      Editar Perfil
                    </Button>
                    <ActionIcon 
                      variant="light" 
                      color="gray"
                      onClick={openSettings}
                    >
                      <IconSettings size={18} />
                    </ActionIcon>
                  </Group>
                </Group>

                <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                  {userProfile.bio}
                </Text>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  <Group gap="xs">
                    <IconSchool size={16} color="var(--mantine-color-blue-6)" />
                    <Text size="sm">{userProfile.faculty} - {userProfile.career}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconMapPin size={16} color="var(--mantine-color-blue-6)" />
                    <Text size="sm">{userProfile.location}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconMail size={16} color="var(--mantine-color-blue-6)" />
                    <Text size="sm">{userProfile.email}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconCalendar size={16} color="var(--mantine-color-blue-6)" />
                    <Text size="sm">Miembro desde {userProfile.joinDate}</Text>
                  </Group>
                </SimpleGrid>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Estadísticas */}
        <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md">
          <Card withBorder p="md" radius="md">
            <Stack align="center" gap="xs">
              <Text fw={700} size="xl" c="blue">{userStats.posts}</Text>
              <Text size="sm" c="dimmed">Publicaciones</Text>
            </Stack>
          </Card>
          <Card withBorder p="md" radius="md">
            <Stack align="center" gap="xs">
              <Text fw={700} size="xl" c="green">{userStats.comments}</Text>
              <Text size="sm" c="dimmed">Comentarios</Text>
            </Stack>
          </Card>
          <Card withBorder p="md" radius="md">
            <Stack align="center" gap="xs">
              <Text fw={700} size="xl" c="red">{userStats.likes}</Text>
              <Text size="sm" c="dimmed">Me Gusta</Text>
            </Stack>
          </Card>
          <Card withBorder p="md" radius="md">
            <Stack align="center" gap="xs">
              <Text fw={700} size="xl" c="violet">{userStats.followers}</Text>
              <Text size="sm" c="dimmed">Seguidores</Text>
            </Stack>
          </Card>
          <Card withBorder p="md" radius="md">
            <Stack align="center" gap="xs">
              <Text fw={700} size="xl" c="orange">{userStats.following}</Text>
              <Text size="sm" c="dimmed">Siguiendo</Text>
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
        <Tabs defaultValue="activity" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="activity" leftSection={<IconBell size={16} />}>
              Actividad Reciente
            </Tabs.Tab>
            <Tabs.Tab value="achievements" leftSection={<IconTrophy size={16} />}>
              Logros
            </Tabs.Tab>
            <Tabs.Tab value="privacy" leftSection={<IconEye size={16} />}>
              Privacidad
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="activity" pt="md">
            <Paper withBorder p="md" radius="md">
              <Stack gap="md">
                {recentActivity.map((activity, index) => (
                  <Group key={index}>
                    <ThemeIcon
                      size="lg"
                      radius="xl"
                      variant="light"
                      color={activity.type === 'post' ? 'blue' : 
                             activity.type === 'like' ? 'red' :
                             activity.type === 'comment' ? 'green' : 'yellow'}
                    >
                      <activity.icon size={18} />
                    </ThemeIcon>
                    <div style={{ flex: 1 }}>
                      <Text size="sm">{activity.title}</Text>
                      <Text size="xs" c="dimmed">{activity.time}</Text>
                    </div>
                  </Group>
                ))}
              </Stack>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="achievements" pt="md">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              <Card withBorder p="md" radius="md">
                <Stack align="center" gap="xs">
                  <ThemeIcon size="xl" radius="xl" color="gold">
                    <IconTrophy size={24} />
                  </ThemeIcon>
                  <Text fw={600} size="sm">Colaborador Activo</Text>
                  <Text size="xs" c="dimmed" ta="center">Por participar activamente en la comunidad</Text>
                </Stack>
              </Card>
              <Card withBorder p="md" radius="md">
                <Stack align="center" gap="xs">
                  <ThemeIcon size="xl" radius="xl" color="blue">
                    <IconMessage size={24} />
                  </ThemeIcon>
                  <Text fw={600} size="sm">Comunicador</Text>
                  <Text size="xs" c="dimmed" ta="center">Por hacer más de 100 comentarios</Text>
                </Stack>
              </Card>
              <Card withBorder p="md" radius="md" opacity={0.5}>
                <Stack align="center" gap="xs">
                  <ThemeIcon size="xl" radius="xl" color="gray">
                    <IconHeart size={24} />
                  </ThemeIcon>
                  <Text fw={600} size="sm" c="dimmed">Popular</Text>
                  <Text size="xs" c="dimmed" ta="center">Obtén 500 me gusta</Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="privacy" pt="md">
            <Paper withBorder p="md" radius="md">
              <Stack gap="lg">
                <Group justify="space-between">
                  <div>
                    <Text fw={500}>Perfil público</Text>
                    <Text size="sm" c="dimmed">Permitir que otros usuarios vean tu perfil</Text>
                  </div>
                  <Switch defaultChecked />
                </Group>
                <Divider />
                <Group justify="space-between">
                  <div>
                    <Text fw={500}>Mostrar email</Text>
                    <Text size="sm" c="dimmed">Mostrar tu email en tu perfil público</Text>
                  </div>
                  <Switch />
                </Group>
                <Divider />
                <Group justify="space-between">
                  <div>
                    <Text fw={500}>Notificaciones por email</Text>
                    <Text size="sm" c="dimmed">Recibir notificaciones en tu correo</Text>
                  </div>
                  <Switch defaultChecked />
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>
        </Tabs>
      </Stack>

      {/* Modal de Editar Perfil */}
      <Modal opened={opened} onClose={close} title="Editar Perfil" size="lg">
        <Stack gap="md">
          <TextInput
            label="Nombre completo"
            value={editForm.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <TextInput
            label="Nombre de usuario"
            value={editForm.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
          <TextInput
            label="Email"
            value={editForm.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <Textarea
            label="Biografía"
            placeholder="Cuéntanos sobre ti..."
            value={editForm.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            minRows={3}
          />
          <Select
            label="Facultad"
            value={editForm.faculty}
            onChange={(value) => handleInputChange('faculty', value)}
            data={[
              'Ingeniería',
              'Medicina',
              'Derecho',
              'Economía',
              'Psicología',
              'Arquitectura'
            ]}
          />
          <TextInput
            label="Carrera"
            value={editForm.career}
            onChange={(e) => handleInputChange('career', e.target.value)}
          />
          <TextInput
            label="Ubicación"
            value={editForm.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
          
          <Group justify="flex-end" gap="sm">
            <Button variant="subtle" onClick={close}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProfile} leftSection={<IconCheck size={16} />}>
              Guardar Cambios
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Modal de Configuraciones */}
      <Modal opened={settingsOpened} onClose={closeSettings} title="Configuraciones" size="md">
        <Stack gap="lg">
          <div>
            <Group gap="xs" mb="sm">
              <IconPalette size={16} />
              <Text fw={500}>Apariencia</Text>
            </Group>
            <Select
              placeholder="Seleccionar tema"
              data={[
                { value: 'light', label: 'Claro' },
                { value: 'dark', label: 'Oscuro' },
                { value: 'auto', label: 'Automático' }
              ]}
              defaultValue="light"
            />
          </div>

          <Divider />

          <div>
            <Group gap="xs" mb="sm">
              <IconNotification size={16} />
              <Text fw={500}>Notificaciones</Text>
            </Group>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text size="sm">Notificaciones push</Text>
                <Switch defaultChecked />
              </Group>
              <Group justify="space-between">
                <Text size="sm">Sonidos</Text>
                <Switch />
              </Group>
            </Stack>
          </div>

          <Divider />

          <div>
            <Group gap="xs" mb="sm">
              <IconLock size={16} />
              <Text fw={500}>Seguridad</Text>
            </Group>
            <Button variant="light" fullWidth>
              Cambiar Contraseña
            </Button>
          </div>

          <Group justify="flex-end">
            <Button variant="subtle" onClick={closeSettings}>
              Cerrar
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}

export default Perfil;