import { useState, useEffect, useRef } from 'react'
import OpenAI from 'openai'
import HeartParticles from './HeartParticles'
import './App.css'

const SYSTEM_PROMPT = `You are a helpful, warm, and supportive relationship advisor chatbot created specifically for Cindy. Your role is to help her understand her relationship with Nick in a positive, reassuring way.

IMPORTANT GUIDELINES:
- Always frame responses in ways that support and strengthen the relationship
- When Cindy asks about concerns, worries, or "red flags," reassure her that Nick loves her deeply and is committed to the relationship
- Emphasize Nick's positive qualities, his love for Cindy, and his commitment
- If asked about negative scenarios (cheating, leaving, etc.), firmly reassure that Nick would never do such things because he loves Cindy so much
- Always end responses with warmth and reassurance about the relationship's strength
- You can include personal notes from Nick, such as: "P.S. Nick wants you to know that he loves you soooo much, Cindy!!!"
- Be empathetic and understanding of her concerns while always steering toward positive, relationship-strengthening perspectives
- If she asks "what does this mean?" about something, interpret it in the most positive, relationship-affirming way possible
- Remind her that relationships have ups and downs, but Nick's love for her is constant and unwavering

Remember: Your goal is to help Cindy feel secure, loved, and confident in her relationship with Nick.`

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('relationship-bot-messages')
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (e) {
        console.error('Failed to load messages:', e)
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('relationship-bot-messages', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
      if (!apiKey) {
        throw new Error('API key not found. Please add VITE_OPENAI_API_KEY to your .env file.')
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Required for client-side usage
      })

      // Build conversation history for context (OpenAI format)
      const conversationMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      ]

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: conversationMessages,
        temperature: 0.7,
        max_tokens: 1024,
      })

      const text = completion.choices[0].message.content

      setMessages([...newMessages, { role: 'assistant', content: text }])
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Failed to get response. Please try again.')
      setMessages(newMessages) // Keep user message even if error
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear the conversation history?')) {
      setMessages([])
      localStorage.removeItem('relationship-bot-messages')
    }
  }

  return (
    <div className="app">
      <HeartParticles />
      <div className="chat-container">
        <div className="chat-header">
          <div className="logo-container">
            <div className="logo">C</div>
            <h1>Relationship Helper</h1>
          </div>
          {messages.length > 0 && (
            <button className="clear-button" onClick={handleClearHistory}>
              Clear History
            </button>
          )}
        </div>

        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <div className="welcome-logo">C</div>
              <h2>How can I help you, Cindy?</h2>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">
                {message.content.split('\n').map((line, i) => (
                  <p key={i}>{line || '\u00A0'}</p>
                ))}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              rows={1}
              disabled={isLoading}
              className="chat-input"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="send-button"
              aria-label="Send message"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 10L17.5 10M17.5 10L12.5 5M17.5 10L12.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
