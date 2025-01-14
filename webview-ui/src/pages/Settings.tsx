import React from 'react';
import { cn } from '../lib/utils';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-[var(--vscode-list-hoverBackground)]",
      isActive && "bg-[var(--vscode-list-activeSelectionBackground)] text-[var(--vscode-list-activeSelectionForeground)]"
    )}
  >
    <span className="opacity-70">{icon}</span>
    <span>{label}</span>
  </button>
);

const Settings = () => {
  const [activeSection, setActiveSection] = React.useState('general');

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-[var(--vscode-panel-border)]">
        <div className="p-2">
          <h2 className="px-4 py-1 text-sm font-medium opacity-40 uppercase">Cursor Settings</h2>
          <nav className="mt-1">
            <NavItem
              icon={<span className="codicon codicon-settings-gear"></span>}
              label="General"
              isActive={activeSection === 'general'}
              onClick={() => setActiveSection('general')}
            />
            <NavItem
              icon={<span className="codicon codicon-symbol-class"></span>}
              label="Models"
              isActive={activeSection === 'models'}
              onClick={() => setActiveSection('models')}
            />
            <NavItem
              icon={<span className="codicon codicon-extensions"></span>}
              label="Features"
              isActive={activeSection === 'features'}
              onClick={() => setActiveSection('features')}
            />
            <NavItem
              icon={<span className="codicon codicon-beaker"></span>}
              label="Beta"
              isActive={activeSection === 'beta'}
              onClick={() => setActiveSection('beta')}
            />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Account Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold">Account</h2>
              <span className="px-2 py-0.5 text-xs bg-[var(--vscode-badge-background)] text-[var(--vscode-badge-foreground)] rounded">Pro</span>
            </div>
            <p className="text-sm mb-4 text-[var(--vscode-foreground)]">You are currently signed in with example@gmail.com.</p>
            <div className="flex gap-4">
              <button className="text-sm px-3 py-1 bg-[var(--vscode-button-background)] hover:bg-[var(--vscode-button-hoverBackground)] text-[var(--vscode-button-foreground)] rounded flex items-center gap-2">
                <span className="codicon codicon-gear"></span>
                Manage
              </button>
              <button className="text-sm px-3 py-1 bg-[var(--vscode-button-background)] hover:bg-[var(--vscode-button-hoverBackground)] text-[var(--vscode-button-foreground)] rounded flex items-center gap-2">
                <span className="codicon codicon-sign-out"></span>
                Log out
              </button>
            </div>
          </div>

          {/* VS Code Import Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">VS Code Import</h2>
            <p className="text-sm mb-4">Instantly use all of your extensions, settings and keybindings</p>
            <button className="text-sm px-3 py-1 bg-[var(--vscode-button-background)] hover:bg-[var(--vscode-button-hoverBackground)] text-[var(--vscode-button-foreground)] rounded flex items-center gap-2">
              <span className="codicon codicon-add"></span>
              Import
            </button>
          </div>

          {/* Rules for AI Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Rules for AI</h2>
            <p className="text-sm mb-4">These rules get shown to the AI on all chats and Command-K sessions.</p>
            <textarea
              className="w-full h-32 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] text-[var(--vscode-input-foreground)] rounded p-3 text-sm focus:outline-none focus:border-[var(--vscode-focusBorder)]"
              placeholder='e.g., "always use functional React, never use unwrap in rust, always output your answers in Portuguese"'
            />
            <div className="mt-4 flex items-center gap-2">
              <input type="checkbox" id="cursorrules" />
              <label htmlFor="cursorrules" className="text-sm">Include .cursorrules file</label>
            </div>
          </div>

          {/* Editor Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Editor</h2>
            <div className="space-y-4">
              <button className="text-sm text-[var(--vscode-textLink-foreground)] hover:text-[var(--vscode-textLink-activeForeground)] hover:underline">
                Open editor settings (font, auto-save, word wrap, etc)
              </button>
              <div>
                <button className="text-sm text-[var(--vscode-textLink-foreground)] hover:text-[var(--vscode-textLink-activeForeground)] hover:underline">
                  Configure keyboard shortcuts
                </button>
              </div>
              <p className="text-sm">
                Use <kbd className="px-1.5 py-0.5 bg-[var(--vscode-keybindingLabel-background)] text-[var(--vscode-keybindingLabel-foreground)] border-[var(--vscode-keybindingLabel-border)] border rounded text-xs">⌘P</kbd> for the command palette, where many editor functions can be controlled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 