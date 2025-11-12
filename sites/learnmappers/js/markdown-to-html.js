/**
 * Simple Markdown to HTML converter for documentation
 */

function markdownToHTML(markdown) {
  let html = markdown;
  
  // Code blocks first (before other processing)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });
  
  // Inline code (but not inside code blocks)
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold (after code to avoid conflicts)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Lists - process line by line
  const lines = html.split('\n');
  const processed = [];
  let inList = false;
  let listType = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const ulMatch = line.match(/^[\-\*] (.*)$/);
    const olMatch = line.match(/^\d+\. (.*)$/);
    
    if (ulMatch || olMatch) {
      const type = ulMatch ? 'ul' : 'ol';
      const content = ulMatch ? ulMatch[1] : olMatch[1];
      
      if (!inList || listType !== type) {
        if (inList) {
          processed.push(`</${listType}>`);
        }
        processed.push(`<${type}>`);
        inList = true;
        listType = type;
      }
      processed.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        processed.push(`</${listType}>`);
        inList = false;
        listType = null;
      }
      processed.push(line);
    }
  }
  
  if (inList) {
    processed.push(`</${listType}>`);
  }
  
  html = processed.join('\n');
  
  // Paragraphs (lines that aren't already wrapped)
  html = html.split('\n').map(line => {
    const trimmed = line.trim();
    if (trimmed === '') return '';
    if (trimmed.startsWith('<')) return line; // Already HTML
    if (trimmed.startsWith('**Created:**') || trimmed.startsWith('**Last Updated:**')) {
      return `<p class="tiny">${trimmed}</p>`;
    }
    return `<p>${line}</p>`;
  }).join('\n');
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');
  html = html.replace(/^\*\*\*$/gim, '<hr>');
  
  // Clean up multiple newlines
  html = html.replace(/\n{3,}/g, '\n\n');
  
  return html;
}

window.markdownToHTML = markdownToHTML;

