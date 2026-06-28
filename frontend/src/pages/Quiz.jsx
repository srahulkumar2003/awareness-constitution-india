import { useMemo, useState } from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";

const dailyChallenges = [
  "Read the Preamble aloud once.",
  "Explain Article 21 to one friend.",
  "List three Fundamental Duties you can follow today.",
  "Identify one public issue and connect it to a constitutional value."
];

const questions = [
  { q: "Which Article protects life and personal liberty?", options: ["Article 14", "Article 19", "Article 21", "Article 51A"], answer: "Article 21" },
  { q: "Fundamental Duties are mainly mentioned in which Article?", options: ["Article 32", "Article 51A", "Article 368", "Article 356"], answer: "Article 51A" },
  { q: "Directive Principles of State Policy are found in which Articles?", options: ["12 to 35", "36 to 51", "124 to 147", "352 to 360"], answer: "36 to 51" },
  { q: "Which case is associated with the Basic Structure doctrine?", options: ["Maneka Gandhi", "Kesavananda Bharati", "S. R. Bommai", "Indra Sawhney"], answer: "Kesavananda Bharati" },
  { q: "Which Article gives the right to constitutional remedies?", options: ["Article 18", "Article 21", "Article 32", "Article 44"], answer: "Article 32" }
];

function getLevel(points) {
  if (points >= 90) return "Constitution Champion";
  if (points >= 70) return "Active Citizen";
  if (points >= 45) return "Civic Learner";
  return "Beginner Citizen";
}

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [challengeDone, setChallengeDone] = useState(false);

  const points = useMemo(() => {
    const quizPoints = score === null ? 0 : score * 15;
    return quizPoints + (challengeDone ? 25 : 0);
  }, [score, challengeDone]);

  const submit = () => {
    const correct = questions.filter((item, index) => answers[index] === item.answer).length;
    setScore(correct);
  };

  return (
    <main className="page quiz-page">
      <BackgroundAnimation />
      <section className="section-heading">
        <p className="eyebrow">Gamified Learning</p>
        <h1>Citizen Score & Challenges</h1>
        <p>Earn badges, improve your Citizen Score and unlock Constitution Champion levels through quizzes and daily civic learning tasks.</p>
      </section>

      <section className="gamification-panel">
        <article><span>Citizen Score</span><strong>{points}</strong><p>{getLevel(points)}</p></article>
        <article><span>Current Badge</span><strong>{score !== null && score >= 4 ? "Rights Defender" : "Civic Learner"}</strong><p>Complete quizzes to upgrade.</p></article>
        <article><span>Daily Challenge</span><strong>{challengeDone ? "Completed" : "Pending"}</strong><p>{dailyChallenges[new Date().getDate() % dailyChallenges.length]}</p><button onClick={() => setChallengeDone(true)}>Mark Done</button></article>
      </section>

      <section className="quiz-list">
        {questions.map((item, index) => (
          <article className="survey-question" key={item.q}>
            <h3>{index + 1}. {item.q}</h3>
            <div className="option-row">
              {item.options.map((option) => (
                <label key={option}>
                  <input type="radio" name={`quiz-${index}`} onChange={() => setAnswers((prev) => ({ ...prev, [index]: option }))} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </article>
        ))}
        <button className="primary-btn" onClick={submit}>Submit Quiz</button>
        {score !== null && <div className="score-badge"><span>Your Quiz Score</span><strong>{score}/{questions.length}</strong><p>{getLevel(points)}</p></div>}
      </section>
    </main>
  );
}
