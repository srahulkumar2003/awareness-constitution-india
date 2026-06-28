import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import IntroVideo from "./components/IntroVideo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ConstitutionExplorer from "./pages/ConstitutionExplorer";
import TopicDetails from "./pages/TopicDetails";
import Survey from "./pages/Survey";
import Dashboard from "./pages/Dashboard";
import AskAI from "./pages/AskAI";
import Quiz from "./pages/Quiz";
import Judgments from "./pages/Judgments";
import Admin from "./pages/Admin";
import About from "./pages/About";
import ConstitutionAgentWidget from "./components/ConstitutionAgentWidget";

export default function App() {
  const [introDone, setIntroDone] = useState(sessionStorage.getItem("introSeen") === "true");

  return (
    <>
      {!introDone && <IntroVideo onComplete={() => setIntroDone(true)} />}
      <div className={introDone ? "app-shell visible" : "app-shell"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<ConstitutionExplorer />} />
          <Route path="/topic/:id" element={<TopicDetails />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/judgments" element={<Judgments />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
        <ConstitutionAgentWidget />
      </div>
    </>
  );
}
