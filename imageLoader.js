export default function imageLoader({ src, width, quality }) {
  return `/code-crusaders${src}?w=${width}&q=${quality || 75}`
}