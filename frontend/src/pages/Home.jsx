import { Link } from "react-router-dom";

const services = [
  {
    title: "Fractional CTO",
    description:
      "Operational leadership, technical strategy, and delivery alignment that scales without the overhead."
  },
  {
    title: "Engineering Systems",
    description:
      "Team design, platform modernization, and architectural guidance to unlock sustainable velocity."
  },
  {
    title: "IT Architecture",
    description:
      "Secure, resilient infrastructure patterns for cloud-native products and regulated environments."
  }
];

const pillars = [
  {
    label: "Platform Builder",
    detail: "Xyn compresses product bootstrapping into repeatable, modular components."
  },
  {
    label: "Composable Ops",
    detail: "Deployable reference stacks with observability and security baked in."
  },
  {
    label: "Velocity Metrics",
    detail: "Instrumented delivery pipelines aligned to business outcomes."
  }
];

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Xyence · Platform Consulting</p>
          <h1>
            Build the systems that let your product and engineering teams move
            at exponential speed.
          </h1>
          <p className="lead">
            Xyence partners with founders and technical leaders to architect
            platforms, stabilize delivery, and turn ambitious roadmaps into
            resilient systems.
          </p>
          <div className="hero-actions">
            <a className="primary" href="mailto:info@xyence.io">
              Engage Xyence
            </a>
            <Link className="ghost" to="/articles">
              Read the field notes
            </Link>
          </div>
          <div className="hero-meta">
            <div>
              <span className="metric">25+ yrs</span>
              <span className="metric-label">Delivery leadership</span>
            </div>
            <div>
              <span className="metric">Full Stack</span>
              <span className="metric-label">Architecture and design</span>
            </div>
            <div>
              <span className="metric">Xyn</span>
              <span className="metric-label">AI-driven platform builder</span>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <h3>Current focus</h3>
          <p>
            Building Xyn, a platform builder for modern product teams that need
            reliable scaffolding, governance, and observability from day one.
          </p>
          <div className="signal-grid">
            {pillars.map((pillar) => (
              <div key={pillar.label} className="signal">
                <span>{pillar.label}</span>
                <p>{pillar.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-head">
          <h2>Services</h2>
          <p>
            Strategic and technical engagement that blends executive leadership
            with hands-on engineering architecture.
          </p>
        </div>
        <div className="cards">
          {services.map((service) => (
            <article key={service.title} className="card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="xyn" className="section alt">
        <div className="section-head">
          <h2>Xyn · Platform Builder</h2>
          <p>
            A configurable platform builder for teams that want to launch
            products quickly without compromising on architecture, security, or
            observability.
          </p>
        </div>
        <div className="xyn-grid">
          <div>
            <h3>Why Xyn</h3>
            <ul>
              <li>Production-grade foundations from day zero.</li>
              <li>Composable services that keep velocity high.</li>
              <li>Governance patterns for growing orgs.</li>
            </ul>
          </div>
          <div className="xyn-panel">
            <p className="mono">SYSTEMS / DELIVERY / TELEMETRY</p>
            <h4>Operating model for durable software</h4>
            <p>
              Xyn is the distillation of build patterns we have used across
              regulated industries, SaaS platforms, and high-growth product
              teams.
            </p>
            <a className="ghost" href="mailto:info@xyence.io">
              Partner on Xyn
            </a>
          </div>
        </div>
        <div className="xyn-visual">
          <img src="/xyence-stl.png" alt="Xyence platform storytelling visual" />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Articles</h2>
          <p>
            Field notes on CTO leadership, platform strategy, and product
            engineering execution.
          </p>
        </div>
        <div className="article-cta">
          <p>
            The Xyn manifesto kicks off the series. More technical deep dives
            are publishing soon.
          </p>
          <Link className="primary" to="/articles">
            Go to articles
          </Link>
        </div>
      </section>
    </div>
  );
}
