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
  Tooltip
} from '@mantine/core';
import {
  IconArrowUp,
  IconArrowDown,
  IconMessageCircle,
  IconTrendingUp
} from '@tabler/icons-react';
import { useContract } from '../hooks/useContract';
import { categories } from '../services/contract';

function PostCard({ post }) {
  const { vote, usePostVotes, usePostComments, userAddress } = useContract();
  const [isVoting, setIsVoting] = useState(false);

  // Obtener votos del blockchain
  const { upvotes, downvotes, userVote } = usePostVotes(post.id);
  
  // Obtener comentarios del blockchain
  const { count: commentsCount } = usePostComments(post.id);

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
                {post.trending && (
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
          
          {/* Topics si existen */}
          {post.topics && post.topics.length > 0 && (
            <Group gap="xs" mt="xs">
              {post.topics.map((topic, index) => (
                <Badge key={index} color="gray" variant="outline" size="xs">
                  #{topic}
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
            color="gray"
          >
            {commentsCount} comentarios
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}

export default PostCard;