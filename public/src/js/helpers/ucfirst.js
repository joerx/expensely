export default function ucfirst(str) {
  if (typeof str !== 'string') return str;
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.substr(1);
}
