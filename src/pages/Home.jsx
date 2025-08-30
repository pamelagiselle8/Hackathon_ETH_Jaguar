import { ActionIcon, Container } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Comment from "../components/Comment";
import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();

    const handleNewPost = () => {
        navigate('/new-post');
    };

    return (
        <Container size="xl">
            <h1>Comunidad</h1>
            <Comment
                avatarSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                authorName="Jacob Warnhalter"
                timeAgo="10 minutes ago"
                content='Contenido'
            />
            
            {/* Botón flotante para nuevo post */}
            <ActionIcon
                onClick={handleNewPost}
                size="xl"
                radius="xl"
                variant="filled"
                color="blue"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    width: '56px',
                    height: '56px'
                }}
                aria-label="Crear nuevo post"
            >
                <IconPlus size={24} />
            </ActionIcon>
        </Container>
    );
}

export default Home;