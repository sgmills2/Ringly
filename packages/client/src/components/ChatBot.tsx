import { useState } from 'react'
import { Sheet, Input, IconButton, Typography, Box, Avatar, Stack } from '@mui/joy'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { styled } from '@mui/joy/styles'

interface Message {
  text: string
  isUser: boolean
  timestamp: Date
}

const ChatContainer = styled(Sheet)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.radius.md,
  backgroundColor: theme.vars.palette.background.level1,
  marginBottom: theme.spacing(2),
  maxHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
}))

const MessageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  marginBottom: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.vars.palette.background.level1,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.vars.palette.neutral[400],
    borderRadius: '4px',
  },
}))

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser?: boolean }>(({ theme, isUser }) => ({
  maxWidth: '80%',
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.radius.md,
  marginBottom: theme.spacing(1),
  backgroundColor: isUser 
    ? theme.vars.palette.primary[500]
    : theme.vars.palette.background.level2,
  color: isUser 
    ? theme.vars.palette.primary.solidColor
    : theme.vars.palette.text.primary,
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  wordBreak: 'break-word',
}))

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}))

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm Ringly. How can I help you design your perfect ring today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        text: "I'm still learning about jewelry design, but I'll be able to help you more soon!",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <ChatContainer>
      <Typography
        level="title-sm"
        sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Avatar size="sm" variant="soft">R</Avatar>
        Ringly
      </Typography>
      
      <MessageContainer>
        <Stack spacing={1}>
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              isUser={message.isUser}
              sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}
            >
              <Typography level="body-sm">
                {message.text}
              </Typography>
              <Typography
                level="body-xs"
                sx={{ opacity: 0.7, whiteSpace: 'nowrap', ml: 1 }}
              >
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </MessageBubble>
          ))}
        </Stack>
      </MessageContainer>

      <InputContainer>
        <Input
          size="sm"
          variant="soft"
          placeholder="Start Your Ring Design Here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ flex: 1 }}
        />
        <IconButton 
          size="sm"
          variant="soft"
          color="primary"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <SendRoundedIcon />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  )
} 