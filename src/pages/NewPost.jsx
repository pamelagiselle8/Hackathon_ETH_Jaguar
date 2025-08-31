import React, { useState, useEffect } from "react";
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
  ActionIcon,
  Alert,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconSend,
  IconUser,
  IconAlertCircle,
  IconInfoCircle,
  IconCheck,
} from "@tabler/icons-react";
import { useContract } from "../hooks/useContract";
import { useNavigate } from "react-router";
import { categories } from "../services/contract";
import { validarPostAI, validarTituloAI } from "../services/apiBackendAI";
import { useWaitForTransactionReceipt } from "wagmi";

const MAX_TITULO = 50;
const MAX_CONTENIDO = 280;

function NewPost() {
  const { post, transactionHash, isTransactionPending } = useContract();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingAI, setIsValidatingAI] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [aiSuggestionTitle, setAiSuggestionTitle] = useState(null);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: transactionHash,
    });

  useEffect(() => {
    if (isConfirmed) {
      // Notificación de éxito aquí
      <Alert
        icon={<IconCheck size={16} />}
        title="Post creado exitosamente"
        color="green"
      >
        Su publicación ha sido confirmada en el blockchain
      </Alert>;

      delay(3000).then(() => {
        navigate("/"); // Redirigir a inicio
      });
    }
  }, [isConfirmed, navigate]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    } else if (formData.title.length < 5) {
      newErrors.title = "El título debe tener al menos 5 caracteres";
    } else if (formData.title.length > 100) {
      newErrors.title = "El título no puede exceder 100 caracteres";
    }

    if (!formData.content.trim()) {
      newErrors.content = "El contenido es requerido";
    } else if (formData.content.length < 10) {
      newErrors.content = "El contenido debe tener al menos 10 caracteres";
    } else if (formData.content.length > 2000) {
      newErrors.content = "El contenido no puede exceder 2000 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setIsValidatingAI(true);
    setAiSuggestion(null); // Limpiar sugerencias previas

    try {
      console.log("Datos del post:", formData.content);
      const validationResponse = await validarPostAI(formData.content);
      const validationResponseTitle = await validarTituloAI(formData.title);

      setIsValidatingAI(false);

      // Verificar si hay sugerencia de AI
      const data = validationResponse.data;
      if (data && data.comentario_formalizado) {
        // El comentario no es válido, mostrar sugerencia
        setAiSuggestion(validationResponse.data.comentario_formalizado);
        setIsSubmitting(false);
        return;
      }

      // Si llegamos aquí, el comentario es válido (comentario_formalizado es null)
      console.log("Comentario validado por AI, procediendo a publicar...");
      const categoria = data.categoria;
      const tags = data.tags || [];

      const dataTitulo = validationResponseTitle.data;
      if (dataTitulo && dataTitulo.titulo_sugerido) {
        // El título no es válido, mostrar sugerencia
        setAiSuggestionTitle(dataTitulo.titulo_sugerido);
        setIsSubmitting(false);
        return;
      }

      await post(formData.title, formData.content, categoria, tags);
    } catch (error) {
      console.error("Error al crear el post:", error);
      setIsValidatingAI(false);
      setErrors({
        submit:
          "El comentario no es coherente o no tiene suficiente contenido válido Intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para aceptar sugerencia de AI
  const acceptAiSuggestion = (field) => {
    if (field === "title") {
      setFormData((prev) => ({
        ...prev,
        title: aiSuggestionTitle,
      }));
      setAiSuggestionTitle(null);
    } else if (field === "content") {
      setFormData((prev) => ({
        ...prev,
        content: aiSuggestion,
      }));
      setAiSuggestion(null);
    }
  };

  // Función para rechazar sugerencia de AI
  const rejectAiSuggestion = () => {
    setAiSuggestion(null);
  };

  const getCategoryBadge = () => {
    if (!formData.category) return null;

    const category = categories.find((cat) => cat.value === formData.category);
    return (
      <Badge color={category.color} variant="light" size="sm">
        {category.label}
      </Badge>
    );
  };

  return (
    <Container size="xl">
      <form size="xl" onSubmit={handleSubmit}>
        <Stack gap="xl">
          <Container w="100%">
            {/* Header con botón de regreso */}
            <Group mb="xl">
              <ActionIcon
                variant="subtle"
                onClick={() => navigate("/")}
                aria-label="Volver atrás"
                disabled={isValidatingAI}
              >
                <IconArrowLeft size={20} />
              </ActionIcon>
              <Title order={1} size="h2">
                Crear nueva publicación
              </Title>
            </Group>

            <Stack gap="lg">
              {/* Preview del autor */}
              <Paper withBorder p="md" radius="md">
                <Group>
                  <Avatar color="blue" radius="xl">
                    <IconUser size={20} />
                  </Avatar>
                  <div>
                    <Text fw={600} size="sm">
                      Usuario Anónimo
                    </Text>
                    <Group gap="xs">
                      <Text size="xs" c="dimmed">
                        Publicando ahora
                      </Text>
                    </Group>
                  </div>
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
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    error={errors.title}
                    required
                    description={`${formData.title.length}/${MAX_TITULO} caracteres`}
                    maxLength={MAX_TITULO}
                    disabled={isValidatingAI}
                  />

                  {/* Contenido */}
                  <Textarea
                    label="Contenido del post"
                    placeholder="¿Qué quieres compartir con la comunidad?"
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    error={errors.content}
                    required
                    minRows={6}
                    maxRows={12}
                    autosize
                    description={`${formData.content.length}/${MAX_CONTENIDO} caracteres`}
                    maxLength={MAX_CONTENIDO}
                    disabled={isValidatingAI}
                  />
                </Stack>
              </Paper>

              {/* Alerta de sugerencia de AI */}
              {aiSuggestion && (
                <Alert
                  icon={<IconInfoCircle size={16} />}
                  title="Sugerencia de mejora"
                  color="light-blue"
                  variant="light"
                  radius="lg"
                  style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  <Stack style={{ paddingRight: "2.5rem" }}>
                    <Text size="sm" align="left">
                      La IA ha detectado que tu comentario podría mejorarse.
                      Aquí tienes una versión reformulada:
                    </Text>
                    <Paper p="sm" bg="gray.0" radius="sm">
                      <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                        {aiSuggestion}
                      </Text>
                    </Paper>
                    <Group gap="sm" justify="center">
                      <Button
                        size="sm"
                        variant="filled"
                        onClick={() => acceptAiSuggestion("content")}
                        radius="md"
                      >
                        Aplicar sugerencia
                      </Button>
                    </Group>
                  </Stack>
                </Alert>
              )}
              {/* Alerta de sugerencia de AI */}
              {aiSuggestionTitle && (
                <Alert
                  icon={<IconInfoCircle size={16} />}
                  title="Sugerencia de mejora"
                  color="light-blue"
                  variant="light"
                  radius="lg"
                  style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  <Stack style={{ paddingRight: "2.5rem" }}>
                    <Text size="sm" align="left">
                      La IA ha detectado que tu título podría mejorarse. Aquí
                      tienes una versión reformulada:
                    </Text>
                    <Paper p="sm" bg="gray.0" radius="sm">
                      <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                        {aiSuggestionTitle}
                      </Text>
                    </Paper>
                    <Group gap="sm" justify="center">
                      <Button
                        size="sm"
                        variant="filled"
                        onClick={() => acceptAiSuggestion("title")}
                        radius="md"
                      >
                        Aplicar sugerencia
                      </Button>
                    </Group>
                  </Stack>
                </Alert>
              )}

              {/* Error de envío */}
              {errors.submit && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title="Error"
                  color="red"
                  variant="light"
                >
                  {errors.submit}
                </Alert>
              )}

              {/* Botones de acción */}
              <Group justify="space-between">
                <Button
                  variant="subtle"
                  onClick={() => navigate("/")}
                  disabled={isSubmitting || isValidatingAI}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  leftSection={<IconSend size={16} />}
                  loading={isSubmitting}
                  disabled={
                    !formData.title || !formData.content || isValidatingAI
                  }
                >
                  {isValidatingAI
                    ? "Validando..."
                    : isSubmitting
                    ? "Publicando..."
                    : "Publicar Post"}
                </Button>
              </Group>

              {isValidatingAI && (
                <>
                  <Text italic c="dimmed">
                    Analizando tu publicación con IA...
                  </Text>
                </>
              )}
            </Stack>
          </Container>
        </Stack>
      </form>
    </Container>
  );
}

export default NewPost;
