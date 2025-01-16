import React, { useState } from 'react'

interface ChatInputProps {
  onSubmit: (message: string) => void
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        onSubmit(input)
        setInput('')
      }
    }
  }

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input)
      setInput('')
    }
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <textarea
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type or paste an image to ask"
        className="w-full px-4 py-3 bg-gray-800 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-100"
        rows={1}
        aria-label="Chat input"
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
        onClick={handleSubmit}
        aria-label="Send message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
} 