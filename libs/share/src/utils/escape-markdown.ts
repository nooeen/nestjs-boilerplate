export const escapeMarkdown = (source: string): string => {
  return source
    .replace(/\\/g, '\\\\') // Backslash
    .replace(/"/g, '\\"') // Double quote
    .replace(/\n/g, '\\n') // Newline
    .replace(/\r/g, '\\r') // Carriage return
    .replace(/\t/g, '\\t') // Tab
    .replace(/\b/g, '\\b') // Backspace
    .replace(/\f/g, '\\f');
};
