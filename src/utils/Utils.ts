export function isWhitespace(str: string): boolean {
  return /^( +)$/.test(str);
}

export function containsNewlineOrSpace(str: string): boolean {
  const regex = /[\n\s]/;
  return regex.test(str);
}