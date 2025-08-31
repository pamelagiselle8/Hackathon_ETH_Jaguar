import React, { useState } from 'react';
import {
  Paper,
  Title,
  Text,
  Avatar,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Button,
  Tooltip,
  Collapse,
  Divider,
  Space
} from '@mantine/core';
import {
  IconArrowUp,
  IconArrowDown,
  IconMessageCircle,
  IconTrendingUp,
  IconChevronDown,
  IconChevronUp
} from '@tabler/icons-react';
import { useContract } from '../hooks/useContract';
import { usePostVotes } from '../hooks/usePostVotes';
import { usePostComments } from '../hooks/usePostComments';
import { categories } from '../services/contract';
import Comment from './Comment';

function PostCard({ post }) {
  const { vote, userAddress } = useContract();
  const [isVoting, setIsVoting] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Obtener votos del blockchain
  const { upvotes, downvotes, userVote } = usePostVotes(post.id);
  
  // Obtener comentarios del blockchain
  const { count: commentsCount, comments } = usePostComments(post.id);

  // Determinar si el post es trending basado en upvotes
  const isTrending = upvotes >= 50;

  const handleVote = async (voteType) => {
    if (!userAddress || isVoting) return;
    
    setIsVoting(true);
    try {
      await vote(post.id, voteType);
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const formatCommentTime = (timestamp) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - parseInt(timestamp.toString());
    
    if (diff < 60) return 'hace unos segundos';
    if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
    return `hace ${Math.floor(diff / 86400)} días`;
  };

  const getCategoryBadge = () => {
    const category = categories.find(cat => cat.value === post.category);
    if (!category || category.value === 'all') return null;
    
    return (
      <Badge color={category.color} variant="light" size="sm">
        {category.label}
      </Badge>
    );
  };

  return (
    <Paper withBorder p="lg" radius="md" style={{ marginBottom: '1rem' }}>
      <Stack gap="sm">
        {/* Header del post */}
        <Group justify="space-between" align="flex-start">
          <Group>
            <Avatar color="blue" radius="xl" size="sm">
              {post.authorAddress ? post.authorAddress.substring(2, 4).toUpperCase() : 'U'}
            </Avatar>
            <div>
              <Tooltip label={post.authorAddress}>
                <Text fw={600} size="sm">{post.authorName}</Text>
              </Tooltip>
              <Group gap="xs">
                <Text size="xs" c="dimmed">{post.timeAgo}</Text>
                {isTrending && (
                  <Badge color="orange" variant="light" size="xs" leftSection={<IconTrendingUp size={12} />}>
                    Trending
                  </Badge>
                )}
              </Group>
            </div>
          </Group>
          {getCategoryBadge()}
        </Group>

        {/* Contenido del post */}
        <div>
          <Text size="sm" style={{ textAlign: 'left', lineHeight: 1.5 }}>
            {post.content}
          </Text>
          <Space h="xl" />
          {/* Topics si existen */}
          {post.topics && post.topics.length > 0 && (
            <Group gap="xs">
              {post.topics.map((topic, index) => (
                <Badge key={index} color="light-blue" variant="outline" size="xs">
                  {topic}
                </Badge>
              ))}
            </Group>
          )}
        </div>

        {/* Acciones del post */}
        <Group gap="md" mt="sm">
          <Group gap="xs">
            <Tooltip label={userAddress ? "Votar positivo" : "Conecta tu wallet para votar"}>
              <ActionIcon 
                onClick={() => handleVote('up')} 
                variant={userVote === 1 ? 'filled' : 'subtle'} 
                color="blue" 
                size="sm"
                disabled={!userAddress || isVoting}
                loading={isVoting}
              >
                <IconArrowUp size={16} />
              </ActionIcon>
            </Tooltip>
            <Text size="sm" fw={500}>{upvotes}</Text>
            
            <Tooltip label={userAddress ? "Votar negativo" : "Conecta tu wallet para votar"}>
              <ActionIcon 
                onClick={() => handleVote('down')} 
                variant={userVote === -1 ? 'filled' : 'subtle'} 
                color="red" 
                size="sm"
                disabled={!userAddress || isVoting}
                loading={isVoting}
              >
                <IconArrowDown size={16} />
              </ActionIcon>
            </Tooltip>
            <Text size="sm" fw={500}>{downvotes}</Text>
          </Group>
          
          <Button 
            variant="subtle" 
            size="xs" 
            leftSection={<IconMessageCircle size={14} />}
            rightSection={commentsCount > 0 ? (showComments ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />) : null}
            color="gray"
            onClick={commentsCount > 0 ? toggleComments : undefined}
            style={{ cursor: commentsCount > 0 ? 'pointer' : 'default' }}
          >
            {commentsCount} comentarios
          </Button>
        </Group>

        {/* Sección de comentarios */}
        <Collapse in={showComments && commentsCount > 0}>
          <Divider my="sm" />
          <Stack gap="sm">
            <Text size="sm" fw={500} c="dimmed">
              Comentarios ({commentsCount})
            </Text>
            
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <Comment
                  key={index}
                  authorName={comment.author ? `${comment.author.substring(0, 6)}...${comment.author.substring(38)}` : 'Usuario'}
                  timeAgo={formatCommentTime(comment.timestamp)}
                  content={comment.content}
                  avatarSrc={null}
                />
              ))
            ) : commentsCount > 0 ? (
              <Text size="sm" c="dimmed" ta="center" py="md">
                Los comentarios se están cargando desde el blockchain...
              </Text>
            ) : null}
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
}

export default PostCard;