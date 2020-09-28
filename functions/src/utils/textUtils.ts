/**
 * Removes empty Pages in maui plain text descriptions, i.e. Page 2<empty space>Page 3<whitespace>
 * @param text
 */
export const removeEmptyPages = (text: string): string => {
  return text.replace(/Page \d+\s+/g, "");
};
