import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BackgroundAnimation from "../components/BackgroundAnimation";
import ScrollReveal from "../components/ScrollReveal";
import { fallbackTopics } from "../data/topics";

export default function ConstitutionExplorer() {
  const [activeId, setActiveId] = useState(2);
  const activeTopic = fallbackTopics.find((topic) => topic.id === activeId) || fallbackTopics[1];

  return (
    <main className="page explorer-page">
      <BackgroundAnimation />
      <section className="section-heading">
        <p className="eyebrow">Interactive Learning</p>
        <h1>Interactive Constitution Book</h1>
        <p>Open the book, select a chapter and explore Articles, real examples, Supreme Court cases, visual diagrams and quiz links without any paid API.</p>
      </section>

      <section className="book-explorer">
        <motion.div className="open-book" initial={{ rotateX: 18, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="book-page left-page">
            <p className="eyebrow">Choose Chapter</p>
            <h2>Constitution Index</h2>
            <div className="book-tabs">
              {fallbackTopics.slice(0, 8).map((topic) => (
                <button key={topic.id} className={activeId === topic.id ? "active" : ""} onClick={() => setActiveId(topic.id)}>
                  <span>{String(topic.id).padStart(2, "0")}</span>{topic.title}
                </button>
              ))}
            </div>
          </div>
          <div className="book-spine" />
          <div className="book-page right-page">
            <p className="eyebrow">Selected Topic</p>
            <h2>{activeTopic.title}</h2>
            <p>{activeTopic.fullDescription}</p>
            <div className="article-pill">{activeTopic.articles}</div>
            <div className="mini-diagram-flow">
              <span>Citizen</span><b>→</b><span>{activeTopic.title}</span><b>→</b><span>Awareness</span>
            </div>
            <Link className="primary-btn" to={`/topic/${activeTopic.id}`}>View Articles & Cases</Link>
          </div>
        </motion.div>
      </section>

      <section className="feature-strip explorer-upgrades">
        <ScrollReveal direction="up" delay={0}><article><h3>Article References</h3><p>Every topic includes related Articles and practical meaning.</p></article></ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}><article><h3>Supreme Court Cases</h3><p>Important case laws are mapped to each chapter for academic depth.</p></article></ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}><article><h3>Visual Diagrams</h3><p>Flow diagrams make rights, duties and governance easier to explain.</p></article></ScrollReveal>
      </section>
    </main>
  );
}
