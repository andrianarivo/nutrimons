export function ellipsis(input: string, maxLength: number) {
  if (input.length > maxLength) {
    return input.substring(0, maxLength) + '...';
  }
  return input;
}
