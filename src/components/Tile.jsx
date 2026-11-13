// One reusable card for the grid.
//
// Props (the "settings" you pass in, like HTML attributes):
//   label    → small title at the top ("Work")
//   shortcut → letter in the corner; pressing it on the keyboard jumps here
//   href     → optional. If given, the whole card becomes a link
//   wide     → optional. If true, the card spans both columns
//   children → whatever you put between <Tile> and </Tile>
export default function Tile({ label, shortcut, href, wide = false, children }) {
  const className = wide ? "tile tile-wide" : "tile";

  const inside = (
    <>
      <p className="tile-label">{label}</p>
      {children}
      <span className="tile-key" aria-hidden="true">
        {shortcut}
      </span>
    </>
  );

  // Card with a link → render an <a>
  if (href) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer"
        data-key={shortcut.toLowerCase()}
      >
        {inside}
      </a>
    );
  }

  // Card without a link → render an <article>.
  // tabIndex={-1} lets the keyboard shortcut focus it.
  return (
    <article className={className} tabIndex={-1} data-key={shortcut.toLowerCase()}>
      {inside}
    </article>
  );
}
