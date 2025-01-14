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
      "flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-[#2a2d2e]",
      isActive && "bg-[#37373d]"
    )}
  >
    <span className="text-[#cccccc] opacity-70">{icon}</span>
    <span className="text-[#cccccc]">{label}</span>
  </button>
);

const Settings = () => {
  const [activeSection, setActiveSection] = React.useState('general');

  return (
    <div className="h-screen flex bg-[#1e1e1e] text-[#cccccc]">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-[#3c3c3c]">
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
              <h2 className="text-xl">Account</h2>
              <span className="px-2 py-0.5 text-xs bg-[#4d4d4d] rounded">Pro</span>
            </div>
            <p className="text-sm mb-4 text-[#cccccc]">You are currently signed in with example@gmail.com.</p>
            <div className="flex gap-4">
              <button className="text-sm px-3 py-1 bg-[#3c3c3c] hover:bg-[#4d4d4d] rounded flex items-center gap-2">
                <span className="codicon codicon-gear"></span>
                Manage
              </button>
              <button className="text-sm px-3 py-1 bg-[#3c3c3c] hover:bg-[#4d4d4d] rounded flex items-center gap-2">
                <span className="codicon codicon-sign-out"></span>
                Log out
              </button>
            </div>
          </div>

          {/* VS Code Import Section */}
          <div className="mb-8">
            <h2 className="text-xl mb-4">VS Code Import</h2>
            <p className="text-sm mb-4 text-[#cccccc]">Instantly use all of your extensions, settings and keybindings</p>
            <button className="text-sm px-3 py-1 bg-[#3c3c3c] hover:bg-[#4d4d4d] rounded flex items-center gap-2">
              <span className="codicon codicon-add"></span>
              Import
            </button>
          </div>

          {/* Rules for AI Section */}
          <div className="mb-8">
            <h2 className="text-xl mb-4">Rules for AI</h2>
            <p className="text-sm mb-4 text-[#cccccc]">These rules get shown to the AI on all chats and Command-K sessions.</p>
            <textarea
              className="w-full h-32 bg-[#1e1e1e] border border-[#3c3c3c] rounded p-3 text-sm"
              placeholder='e.g., "always use functional React, never use unwrap in rust, always output your answers in Portuguese"'
            />
            <div className="mt-4 flex items-center gap-2">
              <input type="checkbox" id="cursorrules" className="bg-[#3c3c3c] border-[#3c3c3c]" />
              <label htmlFor="cursorrules" className="text-sm">Include .cursorrules file</label>
            </div>
          </div>

          {/* Editor Section */}
          <div>
            <h2 className="text-xl mb-4">Editor</h2>
            <div className="space-y-4">
              <button className="text-sm text-[#229ef5] hover:underline">
                Open editor settings (font, auto-save, word wrap, etc)
              </button>
              <div>
                <button className="text-sm text-[#229ef5] hover:underline">
                  Configure keyboard shortcuts
                </button>
              </div>
              <p className="text-sm">
                Use <kbd className="px-1 py-0.5 bg-[#3c3c3c] rounded">⌘P</kbd> for the command palette, where many editor functions can be controlled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 