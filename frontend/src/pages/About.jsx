const highlights = [
  {
    title: "AI-Enabled Platforms",
    detail:
      "Architected AI-native operations platforms, hybrid cloud control planes, and autonomous remediation systems."
  },
  {
    title: "Leadership + Growth",
    detail:
      "Instrumental in scaling telecom operations from 65 to 1,200+ employees and guiding teams through multiple successful exits."
  },
  {
    title: "Mentorship + Clarity",
    detail:
      "Mentored teams in WAN networking, information security, expert testimony, and full-stack engineering, translating complex concepts for non-technical audiences."
  }
];

export default function About() {
  return (
    <section className="section about">
      <div className="about-hero">
        <div>
          <p className="eyebrow">About Xyence</p>
          <h1>Joshua Restivo</h1>
          <p className="lead">
            Joshua Restivo is the founder of Xyence, a platform consulting firm
            focused on AI-enabled operations, cloud control planes, and durable
            engineering systems. With 25+ years in platform architecture and
            delivery leadership, he partners with teams that need to modernize
            infrastructure, build AI-native platforms, and bring complex
            products to market.
          </p>
          <p className="lead">
            He has led platform initiatives for large environments like AT&T,
            Savvis/CenturyLink, and multiple startups across computer forensics,
            cloud orchestration, and advanced network engineering. His recent
            work includes architecting Z1N, a Kubernetes-native, multi-tenant
            operations platform integrating AI agents, orchestration engines,
            ERP-class workflows, and telecom automation across hybrid cloud
            environments. He has also built AIOps reasoning pipelines and
            enterprise API control planes handling large transaction volumes.
          </p>
          <p className="lead">
            Joshua has delivered training and expert education to U.S. state and
            federal law enforcement agents and attorneys, and is known for
            making complex technical concepts accessible to business leaders,
            community stakeholders, and university classrooms. He has provided
            IT-focused volunteer work for major municipalities and charitable
            organizations, and his work is cited in Jose Baez&apos;s New York
            Times best-selling book, <em>Presumed Guilty</em>.
          </p>
        </div>
        <div className="about-card">
          <img src="/josh-restivo.jpg" alt="Joshua Restivo" />
          <div>
            <h3>Founder · Principal Systems Architect</h3>
            <p>
              Specialties: AI-enabled platforms, Kubernetes/GitOps, hybrid cloud
              operations, telecom automation, platform governance, and
              executive technical leadership.
            </p>
          </div>
        </div>
      </div>

      <div className="cards">
        {highlights.map((highlight) => (
          <article key={highlight.title} className="card">
            <h3>{highlight.title}</h3>
            <p>{highlight.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
