export default function slice(string: string) {
  const [yy, mm, dd] = string.slice(0, 10).split('-');
  return `${dd}/${mm}/${yy}`;
}
