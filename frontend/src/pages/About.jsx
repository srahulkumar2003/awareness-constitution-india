import BackgroundAnimation from "../components/BackgroundAnimation";
import ScrollReveal from "../components/ScrollReveal";

export default function About() {
  return (
    <main className="page about-page">
      <BackgroundAnimation />
      <section className="section-heading">
        <p className="eyebrow">Project Story</p>
        <h1>About the Project</h1>
        <p>The platform educates citizens, students and youth about constitutional rights, duties and democratic values.</p>
      </section>
      <section className="detail-grid">
        <ScrollReveal direction="left" delay={0}><article><h3>Problem</h3><p>Many citizens know the Constitution as a subject, but not as a practical guide for rights, responsibilities and democratic participation.</p></article></ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}><article><h3>Objective</h3><p>Make constitutional learning simple, visual, interactive and accessible through explorer, survey, quiz and AI guide.</p></article></ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}><article><h3>Audience</h3><p>Students, youth, citizens, teachers, NGOs and colleges.</p></article></ScrollReveal>
        <ScrollReveal direction="right" delay={0.3}><article><h3>Method</h3><p>Interactive learning modules, survey analytics, community outreach, workshops and awareness campaigns.</p></article></ScrollReveal>
      </section>
    </main>
  );
}
