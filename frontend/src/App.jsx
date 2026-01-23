import { Route, Routes, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link
          className="logo-block"
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="logo-mark">
            <img src="/xyence-logo.png" alt="Xyence logo" />
          </div>
          <div>
            <span className="logo-title">XYENCE</span>
            <span className="logo-sub">Platform Consulting</span>
          </div>
        </Link>
        <nav className="site-nav">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            About
          </NavLink>
          <a className="nav-link" href="/#services">
            Services
          </a>
          <a className="nav-link" href="/#xyn">
            Xyn
          </a>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Articles
          </NavLink>
          <a className="nav-cta" href="mailto:info@xyence.io">
            Start a build
          </a>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div>
          <h4>XYENCE</h4>
          <p>Fractional CTO, engineering leadership, and platform architecture.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>info@xyence.io</p>
          <p>Based in the US · Remote friendly</p>
        </div>
        <div>
          <h4>Signal</h4>
          <p>Build resilient product systems with measurable velocity.</p>
        </div>
      </footer>
    </div>
  );
}
