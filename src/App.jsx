import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import Tile from "./components/Tile.jsx";
import Footer from "./components/Footer.jsx";
import { profile, work, now, featured, projects, stack, education, contact } from "./data.js";

export default function App() {
  // Keyboard shortcuts: press the letter in a card's corner to jump to it.
  // useEffect runs after React has drawn the page. Perfect time to
  // start listening for key presses on the whole window.
  useEffect(() => {
    function handleKeyDown(event) {
      // Ignore Cmd+W, Ctrl+S etc. Those belong to the browser.
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const key = event.key.toLowerCase();
      const tile = document.querySelector(`[data-key="${key}"]`);
      if (!tile) return;

      tile.focus();
      tile.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: stop listening if this component is ever removed.
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // [] = run once, when the page first loads

  return (
    <main className="page">
      <Header />
      <Intro />

      <hr className="divider" />

      <section className="grid" aria-label="Highlights">
        {/* WORK: company, roles, what I did, and the numbers */}
        <Tile label="Work" shortcut="W" wide>
          <div className="work">
            <img className="work-logo" src={work.logo} alt={`${work.company} logo`} />
            <div>
              <h2 className="tile-title">
                <a href={work.url} target="_blank" rel="noreferrer">
                  {work.company} <span aria-hidden="true">↗</span>
                </a>{" "}
                <span className="muted">· {work.description}</span>
              </h2>
              <ul className="roles">
                {work.roles.map((role) => (
                  <li key={role.title}>
                    <span>{role.title}</span>
                    <span className="mono">{role.dates}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="highlights">
            {work.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="stats">
            {work.stats.map((stat) => (
              <div key={stat.label} className="stat">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </Tile>

        {/* NOW: the project I'm building right now */}
        <Tile label="Now building" shortcut="N" href={now.url} wide>
          <h2 className="tile-title">{now.name}</h2>
          <p className="tile-text">{now.description}</p>
          <ol className="steps">
            {now.steps.map((step) => (
              <li key={step.label} className={`step step-${step.status}`}>
                <span className="step-dot" aria-hidden="true" />
                {step.label}
              </li>
            ))}
          </ol>
          <p className="mono">{now.tech}</p>
        </Tile>

        {/* FEATURED: a big screenshot, the whole card links to the project */}
        <Tile label={`${featured.name} · ${featured.tagline}`} shortcut="M" href={featured.url} wide media>
          <img
            className="media-image"
            src={featured.image}
            alt={featured.alt}
            width="1200"
            height="530"
            loading="lazy"
          />
        </Tile>

        {/* PROJECTS: a list, so the card itself is not a link */}
        <Tile label="Projects" shortcut="P" wide>
          <ul className="projects">
            {projects.map((project) => (
              <li key={project.name} className="project">
                <div className="project-head">
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.name} <span aria-hidden="true">↗</span>
                  </a>
                  {project.extra && (
                    <a
                      className="badge"
                      href={project.extra.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.extra.label}
                    </a>
                  )}
                </div>
                <p className="project-text">{project.description}</p>
                <p className="mono">{project.tech}</p>
              </li>
            ))}
          </ul>
        </Tile>

        {/* STACK: one row per group, one chip per skill (a list inside a list) */}
        <Tile label="Stack" shortcut="S" wide>
          <dl className="stack">
            {stack.map((row) => (
              <div key={row.group} className="stack-row">
                <dt className="mono">{row.group}</dt>
                <dd>
                  {row.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Tile>

        {/* EDUCATION: graduation year up front, details below */}
        <Tile label="Education" shortcut="E">
          <div className="edu">
            <p className="edu-year">{education.graduating}</p>
            <p className="edu-caption">graduating</p>
            <h2 className="tile-title">{education.degree}</h2>
            <p className="tile-text">{education.school}</p>
            <p className="mono">{education.dates}</p>
          </div>
        </Tile>

        {/* CONTACT: the whole card is an email link */}
        <Tile label="Get in touch" shortcut="C" href={`mailto:${profile.email}`}>
          <div className="contact">
            <h2 className="tile-title">{contact.title}</h2>
            <p className="tile-text">{contact.text}</p>
            <p className="contact-email">
              {profile.email} <span aria-hidden="true">↗</span>
            </p>
          </div>
        </Tile>
      </section>

      <Footer />
    </main>
  );
}
