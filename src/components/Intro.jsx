import { profile, work, links } from "../data.js";

// Greeting, short bio, then status + links. <mark> highlights a word.
export default function Intro() {
  // Keep only the links that have a url filled in (see data.js)
  const visibleLinks = links.filter((link) => link.url !== "");

  return (
    <section className="intro">
      <h1 className="greeting">
        Hey there, I'm {profile.name}
        <span className="muted">{profile.tagline}</span>
      </h1>

      <p className="status">
        <span className="status-dot" aria-hidden="true" />
        {profile.status}
      </p>

      <p>
        I build <mark className="hl hl-amber">AI agents</mark>, RAG systems and
        the backend services they run on.
      </p>

      <p>
        For 8 months I worked at{" "}
        <a className="hl hl-blue" href={work.url} target="_blank" rel="noreferrer">
          {work.company}
        </a>
        , a Pune startup making AI booking assistants for hotels. First as an
        intern, then part-time as a backend developer. I'm now in my final year
        of AI & Data Science at SPPU.
      </p>

      <div className="intro-links">
        {/* Opens in the browser's PDF viewer, which has its own download button */}
        <a className="resume-btn" href={profile.resume} target="_blank" rel="noreferrer">
          Resume <span aria-hidden="true">↗</span>
        </a>
        {visibleLinks.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
