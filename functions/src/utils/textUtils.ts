/**
 * Removes empty Pages in maui plain text descriptions, i.e. Page 2<empty space>Page 3<whitespace>
 * @param text
 */
// eslint-disable-next-line import/prefer-default-export
export const removeEmptyPages = (text: string): string => (
  text.replace(/Page \d+\s+/g, '')
);
