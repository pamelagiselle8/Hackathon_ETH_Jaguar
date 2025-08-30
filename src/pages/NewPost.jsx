import React, { useState } from 'react';
import {
  Container,
  Paper,
  Title,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Stack,
  Text,
  Avatar,
  Badge,
  ActionIcon
} from '@mantine/core';
import { IconArrowLeft, IconSend, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

const categories = [
  { value: 'opinion', label: 'Opinión', color: 'blue' },
  { value: 'sugerencia', label: 'Sugerencia', color: 'green' },
  { value: 'queja', label: 'Queja', color: 'red' },
  { value: 'vida-universitaria', label: 'Vida Universitaria', color: 'violet' }
];

function NewPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxTitulo = 50;
  const maxContenido = 500;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
    } else if (formData.title.length > 100) {
      newErrors.title = 'El título no puede exceder 100 caracteres';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    } else if (formData.content.length < 10) {
      newErrors.content = 'El contenido debe tener al menos 10 caracteres';
    } else if (formData.content.length > 2000) {
      newErrors.content = 'El contenido no puede exceder 2000 caracteres';
    }

    if (!formData.category) {
      newErrors.category = 'Debes seleccionar una categoría';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar el post al backend
      console.log('Datos del post:', formData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirigir a la página principal después del éxito
      navigate('/');
      
    } catch (error) {
      console.error('Error al crear el post:', error);
      // Aquí podrías mostrar un mensaje de error
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryBadge = () => {
    if (!formData.category) return null;
    
    const category = categories.find(cat => cat.value === formData.category);
    return (
      <Badge color={category.color} variant="light" size="sm">
        {category.label}
      </Badge>
    );
  };

  return (
    <Container size="xl">
      {/* Header con botón de regreso */}
      <Group mb="xl">
        <ActionIcon 
          variant="subtle" 
          onClick={() => navigate('/')}
          aria-label="Volver atrás"
        >
          <IconArrowLeft size={20} />
        </ActionIcon>
        <Title order={1} size="h2">Crear Nuevo Post</Title>
      </Group>

      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          {/* Preview del autor */}
          <Paper withBorder p="md" radius="md">
            <Group>
              <Avatar color="blue" radius="xl">
                <IconUser size={20} />
              </Avatar>
              <div>
                <Text fw={600} size="sm">Usuario Anónimo</Text>
                <Group gap="xs">
                  <Text size="xs" c="dimmed">Publicando ahora</Text>
                </Group>
              </div>
            <Container style={{ flexGrow: 1, textAlign: 'right' }}>
                {getCategoryBadge()}
            </Container>
          </Group>
        </Paper>

          {/* Formulario */}
          <Paper withBorder p="xl" radius="md">
            <Stack gap="md">
              {/* Título */}
              <TextInput
                label="Título del post"
                placeholder="Escribe un título..."
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={errors.title}
                required
                description={`${formData.title.length}/${maxTitulo} caracteres`}
                maxLength={maxTitulo}
              />

              {/* Contenido */}
              <Textarea
                label="Contenido del post"
                placeholder="¿Qué quieres compartir con la comunidad?"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                error={errors.content}
                required
                minRows={6}
                maxRows={12}
                autosize
                description={`${formData.content.length}/${maxContenido} caracteres`}
                maxLength={maxContenido}
              />

              {/* Preview del contenido si hay algo escrito */}
              {formData.title && formData.content && (
                <Paper bg="gray.0" p="md" radius="md">
                  <Text size="xs" c="dimmed" mb="xs">Vista previa:</Text>
                  <Text fw={600} mb="xs">{formData.title}</Text>
                  <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                    {formData.content}
                  </Text>
                </Paper>
              )}
            </Stack>
          </Paper>

          {/* Botones de acción */}
          <Group justify="space-between">
            <Button 
              variant="subtle" 
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              leftSection={<IconSend size={16} />}
              loading={isSubmitting}
              disabled={!formData.title || !formData.content || !formData.category}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Post'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}

export default NewPost;