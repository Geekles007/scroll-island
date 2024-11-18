import React from "react";
import { ReactNode } from "react";

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  interface MarkdownEntry {
    label: string;
    level: number;
    key: string;
    children: MarkdownEntry[];
  }
  
  export function parseMarkdownSummary(markdownText: string): MarkdownEntry[] {
    const lines = markdownText.split('\n');
    const result: MarkdownEntry[] = [];
    const stack: { level: number; children: MarkdownEntry[] }[] = [{ level: 0, children: result }];
  
    const headerRegex = /^(#{1,6})\s+(.*)/;
  
    lines.forEach((line) => {
      const match = line.match(headerRegex);
      if (match) {
        const level = match[1].length;
        const label = match[2].trim();
  
        const entry: MarkdownEntry = {
          label,
          level,
          key: `${label}${level}`,
          children: [],
        };
  
        // Ensure proper nesting by popping stack entries with greater or equal level
        while (stack[stack.length - 1].level >= level) {
          stack.pop();
        }
  
        // Add the entry to the children of the current top of the stack
        stack[stack.length - 1].children.push(entry);
  
        // Push the new entry onto the stack
        stack.push(entry);
      }
    });
  
    return result;
  }
  
  export function getSlug(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  
  export function parseInlineElements(text: string) {
    const tokens = [];
    let currentPosition = 0;
  
    while (currentPosition < text.length) {
      // Check for links first
      const linkMatch = text.slice(currentPosition).match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        tokens.push({
          type: 'link',
          content: linkMatch[1],
          url: linkMatch[2]
        });
        currentPosition += linkMatch[0].length;
        continue;
      }
  
      // Check for bold text
      const boldMatch = text.slice(currentPosition).match(/^\*\*([^*]+)\*\*/);
      if (boldMatch) {
        tokens.push({
          type: 'bold',
          content: boldMatch[1]
        });
        currentPosition += boldMatch[0].length;
        continue;
      }
  
      // Check for italic text
      const italicMatch = text.slice(currentPosition).match(/^\*([^*]+)\*/);
      if (italicMatch) {
        tokens.push({
          type: 'italic',
          content: italicMatch[1]
        });
        currentPosition += italicMatch[0].length;
        continue;
      }
  
      // Check for inline code
      const codeMatch = text.slice(currentPosition).match(/^`([^`]+)`/);
      if (codeMatch) {
        tokens.push({
          type: 'code',
          content: codeMatch[1]
        });
        currentPosition += codeMatch[0].length;
        continue;
      }
  
      // Collect regular text until the next special character
      const nextSpecialChar = text.slice(currentPosition).search(/[\[*`]/);
      const textContent = nextSpecialChar === -1
        ? text.slice(currentPosition)
        : text.slice(currentPosition, currentPosition + nextSpecialChar);
  
      if (textContent) {
        tokens.push({
          type: 'text',
          content: textContent
        });
        currentPosition += textContent.length;
      } else {
        // Move forward if we're stuck
        currentPosition++;
      }
    }
  
    return tokens;
  }
  
  export function parseMarkdown(markdown: string) {
    const lines = markdown.split('\n');
    const tokens = [];
    let currentList = [];
    let inList = false;
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
  
      if (line === '') {
        if (inList) {
          tokens.push({ type: 'list', items: currentList });
          currentList = [];
          inList = false;
        }
        continue;
      }
  
      // Headings
      const headingMatch = line.match(/^(#{1,6})\s(.+)/);
      if (headingMatch) {
        if (inList) {
          tokens.push({ type: 'list', items: currentList });
          currentList = [];
          inList = false;
        }
        tokens.push({
          type: 'heading',
          content: headingMatch[2],
          level: headingMatch[1].length
        });
        continue;
      }
  
      // Lists
      const listMatch = line.match(/^[-*]\s(.+)/);
      if (listMatch) {
        inList = true;
        currentList.push(parseInlineElements(listMatch[1]));
        if (i === lines.length - 1) {
          tokens.push({ type: 'list', items: currentList });
        }
        continue;
      }
  
      // Regular paragraph with inline elements
      if (inList) {
        tokens.push({ type: 'list', items: currentList });
        currentList = [];
        inList = false;
      }
  
      tokens.push({
        type: 'paragraph',
        content: line,
        items: [parseInlineElements(line)]
      });
    }
  
    return tokens;
  }

interface MarkdownToken {
  type: string;
  level?: number;
  content?: string;
  url?: string;
  items?: MarkdownToken[][];
}

export function getCompleteJSX(markdown: string): ReactNode[] {
  const tokens: MarkdownToken[] = parseMarkdown(markdown);

  const renderInlineTokens = (tokens: MarkdownToken[]): ReactNode[] => {
    return tokens.map((token, index) => renderToken(token, index));
  };

  const renderToken = (token: MarkdownToken, index: number): ReactNode => {
    switch (token.type) {
      case 'heading': {
        const HeadingTag = `h${token.level}` as keyof JSX.IntrinsicElements;
        return React.createElement(
          HeadingTag,
          { key: index, id: `${getSlug(token.content || '')}` },
          token.content
        );
      }

      case 'paragraph':
        return (
          <p key={index}>
            {token.items ? renderInlineTokens(token.items[0]) : token.content}
          </p>
        );

      case 'bold':
        return <strong key={index}>{token.content}</strong>;

      case 'italic':
        return <em key={index}>{token.content}</em>;

      case 'code':
        return (
          <code key={index}>
            {token.content}
          </code>
        );

      case 'link':
        return (
          <a
            key={index}
            href={token.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {token.content}
          </a>
        );

      case 'list':
        return (
          <ul key={index}>
            {token.items?.map((item, i) => (
              <li key={i} className="mb-1">
                {renderInlineTokens(item)}
              </li>
            ))}
          </ul>
        );

      case 'text':
      default:
        return <span key={index}>{token.content}</span>;
    }
  };

  const jsxOutput = tokens.map((token, index) => renderToken(token, index));

  return jsxOutput;
}
