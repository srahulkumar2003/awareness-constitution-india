import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BackgroundAnimation from "../components/BackgroundAnimation";
import ScrollReveal from "../components/ScrollReveal";
import { fallbackTopics } from "../data/topics";

export default function Home() {
  const orbitTopics = fallbackTopics.slice(0, 8);
  return (
    <main className="page hero-page">
      <BackgroundAnimation />
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Digital civic learning platform</p>
          <h1>Explore the Indian Constitution like an interactive museum.</h1>
          <p>
            Learn Fundamental Rights, Duties, DPSP, Judiciary, Amendments and public opinion through visual learning, surveys, quizzes and AI guidance.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/explorer">Start Explorer</Link>
            <Link className="secondary-btn" to="/ask-ai">Ask Constitution AI</Link>
          </div>
        </div>

        <motion.div className="constitution-orbit" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="constitution-book">
            <span>Constitution</span>
            <strong>of India</strong>
            <small>Justice • Liberty • Equality</small>
          </div>
          {orbitTopics.map((topic, index) => (
            <Link
              key={topic.id}
              className="orbit-node"
              to={`/topic/${topic.id}`}
              style={{ "--angle": `${index * 45}deg` }}
            >
              {topic.title}
            </Link>
          ))}
        </motion.div>
      </section>

      <section className="feature-strip">
        <ScrollReveal direction="up" delay={0}><article><h3>Constitution Explorer</h3><p>Topic-wise learning with articles, cases, examples, diagrams and quizzes.</p></article></ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}><article><h3>Public Opinion Dashboard</h3><p>Survey responses become visual awareness analytics and civic insight.</p></article></ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}><article><h3>Constitution AI Agent</h3><p>Ask constitution-related questions and get live or curated offline answers anywhere on the site.</p></article></ScrollReveal>
      </section>

      <ScrollReveal direction="fade">
        <section className="feature-strip">
          <article><h3>Landmark Judgments</h3><p>Scroll through the Supreme Court cases that shaped Indian constitutional law.</p></article>
          <article><h3>Citizen Score</h3><p>Earn badges and climb to Constitution Champion through quizzes and daily challenges.</p></article>
          <article><h3>Multilingual Learning</h3><p>Explore key civic values in English, Hindi, Telugu, Tamil and Kannada.</p></article>
        </section>
      </ScrollReveal>
    </main>
  );
}
