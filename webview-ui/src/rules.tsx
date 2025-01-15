import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import '@vscode/codicons/dist/codicon.css';
import RuleCard from "./components/RuleCard";

const mockRule = {
  title: "Example Rule",
  tags: ["react", "typescript"],
  slug: "example-rule",
  libs: ["react"],
  content: "This is an example rule content.",
  author: {
    name: "John Doe",
    url: null,
    avatar: null
  }
};

const App = () => {
  const handleSelect = (rule: any) => {
    console.log("Selected rule:", rule);
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Starry Rules</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RuleCard rule={mockRule} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 