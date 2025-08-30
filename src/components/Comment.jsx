import { useState } from 'react';
import { Avatar, Group, Paper, Text, TypographyStylesProvider, ActionIcon, Button, Typography } from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconMessageCircle } from '@tabler/icons-react';

// Componente separado para los replies
function Reply({ content, authorName, timeAgo }) {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [userVote, setUserVote] = useState(null);

  const handleUpvote = () => {
    if (userVote === 'up') {
      setUpvotes(upvotes - 1);
      setUserVote(null);
    } else if (userVote === 'down') {
      setDownvotes(downvotes - 1);
      setUpvotes(upvotes + 1);
      setUserVote('up');
    } else {
      setUpvotes(upvotes + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setDownvotes(downvotes - 1);
      setUserVote(null);
    } else if (userVote === 'up') {
      setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
      setUserVote('down');
    } else {
      setDownvotes(downvotes + 1);
      setUserVote('down');
    }
  };

  return (
    <Paper withBorder radius="md" style={{ marginTop: 12, padding: 12 }}>
      <Group align="flex-start" style={{ width: '100%' }}>
        <Avatar size="sm" color="gray" alt={authorName} radius="xl" />
        <div style={{ flex: 1, width: '100%' }}>
          <Group justify="space-between" align="center">
            <Text fz="xs" fw={600}>{authorName}</Text>
            <Text fz="xs" c="dimmed">{timeAgo}</Text>
          </Group>
          <Text fz="sm" style={{ marginTop: 4, marginBottom: 8, textAlign: 'left' }}>
            {content}
          </Text>
          <Group gap="xs" style={{ marginTop: 8 }}>
            <ActionIcon 
              onClick={handleUpvote} 
              variant={userVote === 'up' ? 'filled' : 'subtle'} 
              color="blue" 
              size="sm"
              aria-label="Upvote"
            >
              <IconArrowUp size={14} />
            </ActionIcon>
            <Text fz="xs">{upvotes}</Text>
            <ActionIcon 
              onClick={handleDownvote} 
              variant={userVote === 'down' ? 'filled' : 'subtle'} 
              color="red" 
              size="sm"
              aria-label="Downvote"
            >
              <IconArrowDown size={14} />
            </ActionIcon>
            <Text fz="xs">{downvotes}</Text>
            <Button variant="subtle" size="xs" leftSection={<IconMessageCircle size={12} />}>
              Reply
            </Button>
          </Group>
        </div>
      </Group>
    </Paper>
  );
}

function Comment({ avatarSrc, authorName, timeAgo, content }) {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [userVote, setUserVote] = useState(null); // null, 'up', or 'down'
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);

  const handleUpvote = () => {
    if (userVote === 'up') {
      // Si ya hizo upvote, quitar el voto
      setUpvotes(upvotes - 1);
      setUserVote(null);
    } else if (userVote === 'down') {
      // Si había downvote, cambiar a upvote
      setDownvotes(downvotes - 1);
      setUpvotes(upvotes + 1);
      setUserVote('up');
    } else {
      // Si no había voto, agregar upvote
      setUpvotes(upvotes + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      // Si ya hizo downvote, quitar el voto
      setDownvotes(downvotes - 1);
      setUserVote(null);
    } else if (userVote === 'up') {
      // Si había upvote, cambiar a downvote
      setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
      setUserVote('down');
    } else {
      // Si no había voto, agregar downvote
      setDownvotes(downvotes + 1);
      setUserVote('down');
    }
  };

  const handleReply = () => setShowReply(!showReply);
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      const newReply = {
        content: replyText,
        authorName: "Usuario Anónimo", // En una app real, esto vendría del usuario logueado
        timeAgo: "justo ahora"
      };
      setReplies([...replies, newReply]);
      setReplyText('');
      setShowReply(false);
    }
  };

  return (
    <Paper withBorder radius="md" className="comment">
      <Group align="flex-start" style={{ width: '100%' }}>
        <Avatar color="blue" alt={authorName} radius="xl" />
        <div style={{ flex: 1, width: '100%' }}>
          <Group justify="space-between" align="center">
            <Text fz="sm" fw={700}>{authorName}</Text>
            <Text fz="xs" c="dimmed">{timeAgo}</Text>
          </Group>
          <Typography className="body">
            <div
              className="content"
              style={{ marginTop: 8, marginBottom: 8, textAlign: 'left' }}
            >
              {content}
            </div>
          </Typography>
          <Group gap="xs" style={{ marginTop: 8 }}>
            <ActionIcon 
              onClick={handleUpvote} 
              variant={userVote === 'up' ? 'filled' : 'subtle'} 
              color="blue" 
              aria-label="Upvote"
            >
              <IconArrowUp size={18} />
            </ActionIcon>
            <Text fz="sm">{upvotes}</Text>
            <ActionIcon 
              onClick={handleDownvote} 
              variant={userVote === 'down' ? 'filled' : 'subtle'} 
              color="red" 
              aria-label="Downvote"
            >
              <IconArrowDown size={18} />
            </ActionIcon>
            <Text fz="sm">{downvotes}</Text>
            <Button onClick={handleReply} variant="subtle" leftSection={<IconMessageCircle size={16} />} size="xs">
              Reply
            </Button>
          </Group>
          {showReply && (
            <form onSubmit={handleReplySubmit} style={{ marginTop: 8 }}>
              <Group>
                <input
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
                />
                <Button type="submit" size="xs">Send</Button>
              </Group>
            </form>
          )}
          {/* Estructura de árbol para los replies */}
          {replies.length > 0 && (
            <div style={{ marginTop: 16, paddingLeft: 24, borderLeft: '2px solid #e0e0e0' }}>
              {replies.map((reply, idx) => (
                <Reply 
                  key={idx}
                  content={reply.content}
                  authorName={reply.authorName}
                  timeAgo={reply.timeAgo}
                />
              ))}
            </div>
          )}
        </div>
      </Group>
    </Paper>
  );
}

export default Comment;