import { useState } from 'react';
import { Avatar, Group, Paper, Text, TypographyStylesProvider, ActionIcon, Button, Typography } from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconMessageCircle } from '@tabler/icons-react';

function Comment({ avatarSrc, authorName, timeAgo, content }) {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);

  const handleUpvote = () => setUpvotes(upvotes + 1);
  const handleDownvote = () => setDownvotes(downvotes + 1);
  const handleReply = () => setShowReply(!showReply);
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      setReplies([...replies, replyText]);
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
            //   dangerouslySetInnerHTML={{ __html: content }}
            >
              {content}
            </div>
          </Typography>
          <Group gap="xs" style={{ marginTop: 8 }}>
            <ActionIcon onClick={handleUpvote} variant="subtle" color="blue" aria-label="Upvote">
              <IconArrowUp size={18} />
            </ActionIcon>
            <Text fz="sm">{upvotes}</Text>
            <ActionIcon onClick={handleDownvote} variant="subtle" color="red" aria-label="Downvote">
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
          {replies.length > 0 && (
            <div style={{ marginTop: 12, paddingLeft: 16 }}>
              {replies.map((reply, idx) => (
                <Paper key={idx} radius="sm" withBorder style={{ marginBottom: 6, padding: 8, background: '#f7f7f7' }}>
                  <Text fz="sm" c="dimmed">{reply}</Text>
                </Paper>
              ))}
            </div>
          )}
        </div>
      </Group>
    </Paper>
  );
}

export default Comment;