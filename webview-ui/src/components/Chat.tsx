import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { vscode } from '../utilities/vscode';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedState = vscode.getState() as { messages: Message[] } | undefined;
    if (savedState?.messages) {
      setMessages(savedState.messages);
    }

    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      switch (message.type) {
        case 'response':
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            content: message.content,
            role: 'assistant',
            timestamp: new Date(),
          }]);
          setIsProcessing(false);
          break;
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, []);

  useEffect(() => {
    vscode.setState({ messages });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);

    vscode.postMessage({
      type: 'message',
      content: input,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    vscode.setState({ messages: [] });
  };

  const handleExport = () => {
    vscode.postMessage({
      type: 'export',
      messages,
    });
  };

  const handleSettings = () => {
    vscode.postMessage({
      type: 'settings',
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              "mb-4",
              message.role === 'user' ? 'text-right' : 'text-left'
            )}
          >
            <div
              className={cn(
                "inline-block px-3 py-2 max-w-[80%] rounded",
                message.role === 'user' 
                  ? 'bg-[#2563eb] text-white'
                  : 'bg-[#2d2d2d] text-[#cccccc]'
              )}
            >
              <div className="text-sm whitespace-pre-wrap break-words">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="text-left mb-4">
            <div className="inline-block px-3 py-2 bg-[#2d2d2d] text-[#cccccc] rounded">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-[#cccccc] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#cccccc] rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 bg-[#cccccc] rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel - More compact for side panel */}
      <div className="p-2 bg-[#1e1e1e] border-t border-[#ffffff14]">
        {/* Operation Buttons - Horizontal layout */}
        <div className="flex gap-1 mb-2">
          <button 
            onClick={handleClear}
            className="px-2 py-0.5 text-xs bg-[#ffffff14] hover:bg-[#ffffff20] text-[#cccccc] rounded"
          >
            Clear
          </button>
          <button 
            onClick={handleExport}
            className="px-2 py-0.5 text-xs bg-[#ffffff14] hover:bg-[#ffffff20] text-[#cccccc] rounded"
          >
            Export
          </button>
          <button 
            onClick={handleSettings}
            className="px-2 py-0.5 text-xs bg-[#ffffff14] hover:bg-[#ffffff20] text-[#cccccc] rounded"
          >
            Settings
          </button>
        </div>

        {/* Input Area - More compact */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isProcessing}
            rows={1}
            className={cn(
              "w-full bg-[#ffffff14] text-[#cccccc] rounded px-2 py-1",
              "text-sm resize-none",
              "placeholder-[#cccccc80]",
              "focus:outline-none focus:ring-1 focus:ring-[#ffffff30]",
              isProcessing && "opacity-50 cursor-not-allowed"
            )}
            style={{ minHeight: '28px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={isProcessing || !input.trim()}
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2",
              "p-1 rounded",
              !isProcessing && input.trim() 
                ? "text-[#cccccc] hover:text-white" 
                : "text-[#cccccc80] cursor-not-allowed"
            )}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}; 