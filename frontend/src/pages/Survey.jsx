import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import BackgroundAnimation from "../components/BackgroundAnimation";
import { fallbackSurveyQuestions } from "../data/surveyQuestions";

const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];

export default function Survey() {
  const [questions, setQuestions] = useState(fallbackSurveyQuestions.map((q, i) => ({ id: i + 1, question: q })));
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/survey/questions")
      .then((res) => res.data?.length && setQuestions(res.data))
      .catch(() => null);
  }, []);

  const submitSurvey = async (event) => {
    event.preventDefault();
    const responses = questions.map((q) => ({ questionId: q.id, response: answers[q.id] || "Neutral", userType: "Student" }));
    try {
      await api.post("/survey/submit", { responses });
      setStatus("Survey submitted successfully. Thank you for sharing your opinion.");
      setAnswers({});
    } catch {
      setStatus("Backend is not connected yet. Your UI is working. Start Spring Boot and try again.");
    }
  };

  return (
    <main className="page survey-page">
      <BackgroundAnimation />
      <section className="section-heading">
        <p className="eyebrow">Public Opinion</p>
        <h1>Constitution Awareness Survey</h1>
        <p>Collect public opinion about rights, duties, DPSP, judiciary, reservations and constitutional awareness.</p>
      </section>

      <form className="survey-form" onSubmit={submitSurvey}>
        {questions.map((item, index) => (
          <article className="survey-question" key={item.id}>
            <h3>{index + 1}. {item.question}</h3>
            <div className="option-row">
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`q-${item.id}`}
                    checked={answers[item.id] === option}
                    onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: option }))}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </article>
        ))}
        <button className="primary-btn" type="submit">Submit Survey</button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </main>
  );
}
