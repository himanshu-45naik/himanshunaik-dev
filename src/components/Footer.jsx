import { links, profile } from "../data.js";

export default function Footer() {
  // Keep only the links that have a url filled in (see data.js)
  const visibleLinks = links.filter((link) => link.url !== "");
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <nav className="footer-links" aria-label="Elsewhere">
        {visibleLinks.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </nav>

      <p className="mono">
        © {year} {profile.fullName}
        <span className="hint">
          {" "}· press the <kbd>letter</kbd> on a card to jump to it
        </span>
      </p>
    </footer>
  );
}
