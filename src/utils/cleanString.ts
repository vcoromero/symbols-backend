export function cleanString(string: string): string {
  return string.replace(/[^a-zA-Z0-9]/g, "");
}
