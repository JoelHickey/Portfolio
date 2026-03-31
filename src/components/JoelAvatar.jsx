export const JOEL_AVATAR_SRC = '/images/joel-hickey-avatar.png'

/** Circular profile photo for demo UIs (guide shell, traveller rows, mock chrome). */
export function JoelAvatar({
  sizeClass = 'h-10 w-10',
  className = '',
  alt = 'Joel Hickey',
}) {
  return (
    <img
      src={JOEL_AVATAR_SRC}
      alt={alt}
      className={`rounded-full object-cover ${sizeClass} ${className}`.trim()}
    />
  )
}
