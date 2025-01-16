import React from 'react'
import { ChatInput } from './ChatInput'
import { StarryCodeIcon } from '../icons/StarryCodeIcon'
import { CommandItem } from '../../types'

interface ChatViewProps {
  onSubmit: (message: string) => void
}

const ChatView: React.FC<ChatViewProps> = ({ onSubmit }) => {
  const commands: CommandItem[] = [
    { key: 'explain', label: 'explain' },
    { key: 'unittest', label: 'unittest' },
    { key: 'comment', label: 'comment' },
    { key: 'optimize', label: 'optimize' }
  ]

  return (
    <div className="flex flex-col h-full bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)]">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center p-6 space-y-3">
        <StarryCodeIcon className="w-12 h-12 text-[var(--vscode-textLink-foreground)]" />
        <h1 className="text-xl font-medium text-[var(--vscode-editor-foreground)]">Starry Code</h1>
      </div>

      {/* Welcome Message */}
      <div className="flex-1 px-4 py-3 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-base text-[var(--vscode-editor-foreground)]">
            Hello, I'm Starry Code, an AI Coding Assistant with you. 
            You can ask me anything about coding and{' '}
            <a 
              href="#" 
              className="text-[var(--vscode-textLink-foreground)] hover:text-[var(--vscode-textLink-activeForeground)] hover:underline"
              tabIndex={0}
              role="link"
            >
              share feedback
            </a>
            {' '}to make me better.
          </div>

          <div className="text-[var(--vscode-descriptionForeground)]">
            Let's start by typing or '/' for commands:
          </div>

          {/* Command List */}
          <div className="space-y-2">
            {commands.map((command) => (
              <div 
                key={command.key}
                className="text-[var(--vscode-textLink-foreground)] hover:text-[var(--vscode-textLink-activeForeground)] cursor-pointer hover:underline"
                role="button"
                tabIndex={0}
                onClick={() => onSubmit(`/${command.key}`)}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit(`/${command.key}`)}
              >
                {command.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-[var(--vscode-panel-border)]">
        <ChatInput onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default ChatView 