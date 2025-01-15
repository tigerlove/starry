import React from "react";
import ReactDOM from "react-dom/client";
import { Chat } from "./components/Chat";
import "./global.css";
import "@vscode/codicons/dist/codicon.css"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>
);
