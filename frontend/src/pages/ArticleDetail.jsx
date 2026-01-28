import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export default function ArticleDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const version = query.get("version");
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const bodyRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const url = new URL(`${API_BASE}/api/articles/${slug}/`, window.location.origin);
    if (version) {
      url.searchParams.set("version", version);
    }
    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setArticle(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setArticle(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug, version]);

  useEffect(() => {
    const root = bodyRef.current;
    if (!root || !window.mermaid) return;

    window.mermaid.initialize({ startOnLoad: false });

    const convertBlocks = () => {
      const blocks = root.querySelectorAll(
        "pre code.language-mermaid, pre.mermaid, code.language-mermaid"
      );
      blocks.forEach((block) => {
        if (block.dataset && block.dataset.mermaidProcessed) return;
        const text = block.textContent || "";
        const container = document.createElement("div");
        container.className = "mermaid";
        container.textContent = text.trim();
        const pre = block.closest("pre");
        if (pre) {
          pre.replaceWith(container);
        } else {
          block.replaceWith(container);
        }
        if (block.dataset) block.dataset.mermaidProcessed = "1";
      });
    };

    convertBlocks();
    const nodes = root.querySelectorAll(".mermaid");
    if (nodes.length) {
      window.mermaid.run({ nodes });
    }
  }, [article]);

  if (loading) {
    return (
      <section className="section">
        <p className="muted">Loading article...</p>
      </section>
    );
  }

  if (!article || article.detail) {
    return (
      <section className="section">
        <div className="empty-state">
          <p>We couldn't find that article.</p>
          <Link className="ghost" to="/articles">
            Back to articles
          </Link>
        </div>
      </section>
    );
  }

  const hasVersions = (article.version_count || 0) > 1;
  const viewingVersion = article.version_number || null;
  const updatedAt = article.updated_at ? new Date(article.updated_at) : null;
  const versionCreatedAt = article.version_created_at
    ? new Date(article.version_created_at)
    : null;

  return (
    <section className="section article-detail">
      <Link className="ghost" to="/articles">
        ← Back to articles
      </Link>
      {hasVersions && updatedAt && !viewingVersion && (
        <p className="muted" style={{ marginTop: "0.75rem" }}>
          Updated at: {updatedAt.toLocaleString()}
        </p>
      )}
      {viewingVersion && (
        <div className="muted" style={{ marginTop: "0.75rem" }}>
          Viewing version {viewingVersion}
          {versionCreatedAt ? ` (created ${versionCreatedAt.toLocaleString()})` : ""}.
          <Link className="ghost" style={{ marginLeft: "0.75rem" }} to={`/articles/${slug}`}>
            View latest
          </Link>
        </div>
      )}
      <h1>{article.title}</h1>
      {article.summary && <p className="lead">{article.summary}</p>}
      <div
        className="rich-text"
        ref={bodyRef}
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
      {hasVersions && article.versions && article.versions.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Previous versions</h3>
          <ul>
            {article.versions.map((v) => (
              <li key={v.version_number}>
                <Link
                  className="ghost"
                  to={`/articles/${slug}?version=${v.version_number}`}
                >
                  Version {v.version_number} — {new Date(v.created_at).toLocaleString()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
