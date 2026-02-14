/**
 * Simple syntax highlighter for LeetLingo
 */

const KEYWORDS = /\b(def|class|return|if|else|while|for|in|import|from|const|let|var|function|public|private|static|int|boolean|void|vector|unordered_map|Map|HashMap|new|try|catch|throws|final|async|await|std|using|namespace|nullptr|null|None|self|this|Arrays|LinkedList|List|ArrayList|Collections)\b/g;

function highlight(code, lang) {
  if (!code) return '';

  // 0. Escape HTML characters first
  let escaped = code.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');

  // Use a placeholder-based approach to prevent nested highlights
  const placeholders = [];
  let index = 0;

  function addPlaceholder(val, className) {
    const key = `__HL_${index++}__`;
    placeholders.push({ key, html: `<span class="${className}">${val}</span>` });
    return key;
  }

  // 1. Strings (handle escaped quotes)
  let processed = escaped.replace(/("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, (match) => {
    return addPlaceholder(match, 'code-string');
  });

  // 2. Comments
  processed = processed.replace(/(\/\/.*$|#.*$)/gm, (match) => {
    return addPlaceholder(match, 'code-comment');
  });

  // 3. Keywords
  processed = processed.replace(KEYWORDS, (match) => {
    return addPlaceholder(match, 'code-keyword');
  });

  // 4. Numbers
  processed = processed.replace(/\b(\d+)\b/g, (match) => {
    return addPlaceholder(match, 'code-number');
  });

  // 5. Functions
  processed = processed.replace(/\b(\w+)(?=\s*\()/g, (match) => {
    return addPlaceholder(match, 'code-func');
  });

  // Restore placeholders
  let finalHtml = processed;
  // We need to do this in reverse or ensure keys don't conflict. 
  // Since keys are unique and numbered, we can just replace.
  for (let i = placeholders.length - 1; i >= 0; i--) {
    finalHtml = finalHtml.replace(placeholders[i].key, placeholders[i].html);
  }

  // Handle newlines for rich-text
  // rich-text doesn't preserve \n usually unless inside <pre> or with style
  // but we'll use a container style white-space: pre
  return finalHtml;
}

module.exports = {
  highlight
};
