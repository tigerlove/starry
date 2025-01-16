import React from "react";
import ChatView from "../components/chat/ChatView";
import { vscode } from "../utilities/vscode";

const Chat: React.FC = () => {
  const handleSubmit = (message: string) => {
    // 发送消息到 VSCode 扩展
    vscode.postMessage({
      type: "chat",
      message,
    });
  };

  return (
    <div className="h-screen">
      <ChatView onSubmit={handleSubmit} />
    </div>
  );
};

export default Chat;
