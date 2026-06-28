import { Link } from "react-router-dom";
import BackgroundAnimation from "../components/BackgroundAnimation";
import ScrollReveal from "../components/ScrollReveal";
import { landmarkJudgments } from "../data/judgments";
import { fallbackTopics } from "../data/topics";

export default function Judgments() {
  const topicIdBySlug = Object.fromEntries(fallbackTopics.map((t) => [t.slug, t.id]));

  return (
    <main className="page judgments-page">
      <BackgroundAnimation variant="dark" />
      <section className="section-heading dark-heading">
        <p className="eyebrow">Constitutional History</p>
        <h1>Landmark Judgments Timeline</h1>
        <p>
          Scroll through the Supreme Court decisions that shaped how Fundamental Rights, Directive
          Principles and federalism are understood in India today.
        </p>
      </section>

      <section className="judgments-timeline">
        <div className="timeline-spine" aria-hidden="true" />
        {landmarkJudgments.map((item, index) => (
          <ScrollReveal
            key={item.title}
            direction={index % 2 === 0 ? "left" : "right"}
            delay={0.05}
            className={`timeline-row ${index % 2 === 0 ? "from-left" : "from-right"}`}
          >
            <article className="timeline-card">
              <span className="timeline-year">{item.year}</span>
              <span className="timeline-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              {topicIdBySlug[item.relatedTopic] && (
                <Link className="timeline-link" to={`/topic/${topicIdBySlug[item.relatedTopic]}`}>
                  Explore related topic →
                </Link>
              )}
            </article>
            <span className="timeline-dot" />
          </ScrollReveal>
        ))}
      </section>
    </main>
  );
}
