import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackgroundAnimation from "../components/BackgroundAnimation";
import { fallbackTopics } from "../data/topics";

export default function TopicDetails() {
  const { id } = useParams();
  const topic = fallbackTopics.find((item) => String(item.id) === String(id)) || fallbackTopics[0];
  const [completed, setCompleted] = useState(false);

  return (
    <main className="page detail-page">
      <BackgroundAnimation />
      <Link className="back-link" to="/explorer">← Back to Explorer</Link>
      <section className="detail-hero">
        <div>
          <p className="eyebrow">Constitution Chapter</p>
          <h1>{topic.title}</h1>
          <p>{topic.fullDescription}</p>
        </div>
        <div className="mini-document">
          <span>Related Articles</span>
          <strong>{topic.articles}</strong>
        </div>
      </section>

      <section className="detail-grid advanced-detail-grid">
        <article><h3>Simple Meaning</h3><p>{topic.shortDescription}</p></article>
        <article><h3>Real-life Example</h3><p>{topic.realExample}</p></article>
        <article><h3>Supreme Court Case</h3><p>{topic.caseReference}</p></article>
        <article><h3>Visual Diagram</h3><div className="diagram"><span>Issue</span><b>→</b><span>Article</span><b>→</b><span>Remedy</span><b>→</b><span>Awareness</span></div></article>
      </section>

      <section className="learning-card">
        <div>
          <p className="eyebrow">Learning Progress</p>
          <h2>Complete this chapter to earn points</h2>
          <p>Read the topic, understand the Article reference, review the case law and attempt the quiz.</p>
        </div>
        <button className="primary-btn" onClick={() => setCompleted(true)}>{completed ? "Chapter Completed" : "Mark Complete"}</button>
        {completed && <div className="score-badge"><span>Badge Earned</span><strong>+25 Citizen Score</strong><p>Constitution Learner</p></div>}
      </section>
    </main>
  );
}
