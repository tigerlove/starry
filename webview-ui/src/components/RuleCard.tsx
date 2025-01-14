import React from 'react';
import ReactMarkdown from 'react-markdown';

interface RuleAuthor {
  name: string;
  url: string | null;
  avatar: string | null;
}

interface Rule {
  title: string;
  tags: string[];
  slug: string;
  libs: string[];
  content: string;
  author: RuleAuthor;
}

interface RuleCardProps {
  rule: Rule;
  onSelect: (rule: Rule) => void;
}

const RuleCard: React.FC<RuleCardProps> = ({ rule, onSelect }) => {
  const handleClick = () => {
    onSelect(rule);
  };

  const removeIndentation = (content: string) => {
    const lines = content.split('\n');
    const minIndent = Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^\s*/)?.[0].length || 0));
    return lines.map(line => line.slice(minIndent)).join('\n');
  };

  return (
    <div
      className="cursor-pointer rounded-lg bg-zinc-800 p-4 shadow-lg transition-all hover:bg-zinc-700"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Select rule: ${rule.title}`}
    >
      <h3 className="mb-2 text-xl font-semibold text-white">{rule.title}</h3>
      <div className="mb-4 flex flex-wrap gap-2">
        {rule.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="prose prose-invert max-h-32 overflow-hidden text-sm text-gray-300">
        <ReactMarkdown>{removeIndentation(rule.content)}</ReactMarkdown>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {rule.author.avatar && (
          <img
            src={rule.author.avatar}
            alt={`${rule.author.name}'s avatar`}
            className="h-6 w-6 rounded-full"
          />
        )}
        <span className="text-sm text-gray-400">
          {rule.author.url ? (
            <a
              href={rule.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
              onClick={(e) => e.stopPropagation()}
            >
              {rule.author.name}
            </a>
          ) : (
            rule.author.name
          )}
        </span>
      </div>
    </div>
  );
};

export default RuleCard; 