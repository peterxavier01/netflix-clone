export const extractIdFromUrl = (url: string) => {
  const match = url.match(/\/api\/movies\/([^/]+)$/);
  if (match && match[1]) {
    return match[1];
  }
  return null; // Return null if the pattern doesn't match
};
