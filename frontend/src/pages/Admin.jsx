import BackgroundAnimation from "../components/BackgroundAnimation";

export default function Admin() {
  return (
    <main className="page admin-page">
      <BackgroundAnimation />
      <section className="section-heading">
        <p className="eyebrow">Admin Panel</p>
        <h1>Content Management</h1>
        <p>Version 2 area for adding topics, survey questions, quizzes and viewing reports.</p>
      </section>
      <section className="detail-grid">
        <article><h3>Manage Topics</h3><p>Add and update Constitution Explorer content.</p></article>
        <article><h3>Survey Questions</h3><p>Add new awareness survey questions.</p></article>
        <article><h3>Quiz Bank</h3><p>Create topic-wise quiz questions.</p></article>
        <article><h3>Reports</h3><p>View responses and export analysis.</p></article>
      </section>
    </main>
  );
}
