import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold">Hello Starry Code</h1>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
