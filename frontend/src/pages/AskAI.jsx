import { useMemo, useState } from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";

const tutorData = [
  {
    id: "rights",
    title: "Fundamental Rights",
    keywords: ["right", "rights", "article 14", "article 19", "article 21", "article 32", "freedom", "equality"],
    explanation: "Fundamental Rights protect citizens and individuals from unfair state action. They cover equality, freedom, protection from exploitation, religious freedom, cultural and educational rights, and constitutional remedies.",
    articles: "Articles 12 to 35, especially Articles 14, 19, 21 and 32.",
    cases: "Maneka Gandhi v. Union of India, Kesavananda Bharati v. State of Kerala, and Vishaka v. State of Rajasthan.",
    followUps: ["How does Article 21 protect personal liberty?", "What is the difference between Article 14 and Article 19?", "Why is Article 32 called the heart of the Constitution?"],
    path: ["Read Article 14", "Study Article 19 freedoms", "Understand Article 21", "Take the Fundamental Rights quiz"]
  },
  {
    id: "duties",
    title: "Fundamental Duties",
    keywords: ["duty", "duties", "51a", "citizen responsibility", "responsibility"],
    explanation: "Fundamental Duties remind citizens to respect the Constitution, national symbols, public property, harmony, scientific temper and the environment. They support responsible citizenship.",
    articles: "Article 51A.",
    cases: "AIIMS Students Union v. AIIMS and M.C. Mehta environmental cases are useful references.",
    followUps: ["Why are Fundamental Duties important?", "Are duties enforceable by courts?", "How can students practice constitutional duties?"],
    path: ["Read Article 51A", "List daily civic duties", "Connect duties with real examples", "Complete one daily challenge"]
  },
  {
    id: "dpsp",
    title: "Directive Principles of State Policy",
    keywords: ["dpsp", "directive", "principles", "welfare", "state policy", "article 36"],
    explanation: "DPSPs guide the government to build social and economic justice. They influence policies on education, health, village panchayats, equal pay and welfare.",
    articles: "Articles 36 to 51.",
    cases: "Minerva Mills v. Union of India explains the balance between Fundamental Rights and DPSP.",
    followUps: ["What is the difference between Rights and DPSP?", "Why are DPSPs not directly enforceable?", "Which welfare schemes connect to DPSP?"],
    path: ["Read Articles 36 to 51", "Compare DPSP with Rights", "Study Minerva Mills", "Attempt the DPSP challenge"]
  },
  {
    id: "judiciary",
    title: "Judiciary and Constitutional Remedies",
    keywords: ["court", "judiciary", "supreme court", "writ", "article 32", "article 226", "case law"],
    explanation: "The judiciary interprets the Constitution, reviews government actions and protects rights through writs. It acts as a guardian of constitutional values.",
    articles: "Articles 124 to 147, Articles 214 to 231, Article 32 and Article 226.",
    cases: "Kesavananda Bharati, S. R. Bommai and Maneka Gandhi are key constitutional cases.",
    followUps: ["What are writs?", "How does judicial review work?", "Why is judicial independence important?"],
    path: ["Understand Supreme Court structure", "Study writs", "Read one landmark case", "Try the judiciary quiz"]
  },
  {
    id: "preamble",
    title: "Preamble",
    keywords: ["preamble", "justice", "liberty", "equality", "fraternity", "sovereign", "secular"],
    explanation: "The Preamble presents the core vision of the Constitution. It highlights justice, liberty, equality and fraternity as the foundation of Indian democracy.",
    articles: "Introductory statement of the Constitution.",
    cases: "Kesavananda Bharati v. State of Kerala recognized the importance of the Preamble in understanding the Constitution.",
    followUps: ["What does secular mean in the Preamble?", "How are justice and equality connected?", "Why is fraternity important?"],
    path: ["Read the Preamble", "Understand each keyword", "Connect values with daily life", "Complete the Preamble quiz"]
  }
];

const languageContent = {
  English: "Learn rights, duties and constitutional values in simple language.",
  Hindi: "सरल भाषा में अधिकार, कर्तव्य और संवैधानिक मूल्यों को सीखें।",
  Telugu: "సులభమైన భాషలో హక్కులు, విధులు మరియు రాజ్యాంగ విలువలను నేర్చుకోండి.",
  Tamil: "எளிய மொழியில் உரிமைகள், கடமைகள் மற்றும் அரசியலமைப்பு மதிப்புகளை கற்றுக்கொள்ளுங்கள்.",
  Kannada: "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಹಕ್ಕುಗಳು, ಕರ್ತವ್ಯಗಳು ಮತ್ತು ಸಂವಿಧಾನ ಮೌಲ್ಯಗಳನ್ನು ಕಲಿಯಿರಿ."
};

export default function AskAI() {
  const [question, setQuestion] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedTopic, setSelectedTopic] = useState(tutorData[0]);

  const matchedTopic = useMemo(() => {
    const q = question.toLowerCase();
    return tutorData.find((topic) => topic.keywords.some((key) => q.includes(key))) || selectedTopic;
  }, [question, selectedTopic]);

  const explain = () => setSelectedTopic(matchedTopic);

  return (
    <main className="page ai-page">
      <BackgroundAnimation variant="dark" />
      <section className="section-heading dark-heading">
        <p className="eyebrow">Offline + Live AI Guide</p>
        <h1>Constitutional Tutor</h1>
        <p>No paid API required. This works with curated project data, article references, case laws, follow-up questions and learning paths.</p>
      </section>

      <section className="tutor-layout">
        <aside className="language-panel">
          <h3>Multilingual Support</h3>
          {Object.keys(languageContent).map((lang) => (
            <button key={lang} className={selectedLang === lang ? "active" : ""} onClick={() => setSelectedLang(lang)}>{lang}</button>
          ))}
          <p>{languageContent[selectedLang]}</p>
        </aside>

        <section className="chat-shell tutor-shell">
          <div className="suggestions">
            {tutorData.map((item) => <button key={item.id} onClick={() => setSelectedTopic(item)}>{item.title}</button>)}
          </div>
          <div className="chat-input">
            <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about rights, duties, DPSP, judiciary or Preamble..." />
            <button className="primary-btn" onClick={explain}>Explain</button>
          </div>

          <article className="tutor-response">
            <span className="pulse-chakra">☸</span>
            <h2>{selectedTopic.title}</h2>
            <p>{selectedTopic.explanation}</p>
            <div className="response-grid">
              <div><h4>Article references</h4><p>{selectedTopic.articles}</p></div>
              <div><h4>Case laws</h4><p>{selectedTopic.cases}</p></div>
              <div><h4>Follow-up questions</h4>{selectedTopic.followUps.map((q) => <button key={q} onClick={() => setQuestion(q)}>{q}</button>)}</div>
              <div><h4>Learning path</h4><ol>{selectedTopic.path.map((step) => <li key={step}>{step}</li>)}</ol></div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
