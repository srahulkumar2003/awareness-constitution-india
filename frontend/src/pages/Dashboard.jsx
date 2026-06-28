import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import BackgroundAnimation from "../components/BackgroundAnimation";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const analytics = {
  totalResponses: 125,
  awarenessScore: 78,
  stateCoverage: 7,
  youthParticipation: 62,
  optionCounts: { "Strongly Agree": 42, Agree: 39, Neutral: 25, Disagree: 12, "Strongly Disagree": 7 },
  categoryScores: { Rights: 81, Duties: 67, DPSP: 58, Judiciary: 72, Reservations: 64, Governance: 70 },
  stateScores: { AP: 82, Telangana: 76, Karnataka: 70, TamilNadu: 74, Kerala: 79, Maharashtra: 68, Delhi: 84 },
  ageGroups: { "13-18": 48, "19-25": 62, "26-40": 38, "40+": 25 }
};

export default function Dashboard() {
  const palette = ["#ff9933", "#f4d892", "#138808", "#4dd0e1", "#d4af37", "#8fff9b", "#ffffff"];

  const doughnutData = {
    labels: Object.keys(analytics.optionCounts),
    datasets: [{
      data: Object.values(analytics.optionCounts),
      backgroundColor: palette,
      borderColor: "#0b0b0b",
      borderWidth: 2,
    }]
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#f6f0e4" }, grid: { color: "rgba(255,255,255,0.08)" } },
      y: { ticks: { color: "#f6f0e4" }, grid: { color: "rgba(255,255,255,0.08)" } },
    },
  };

  const categoryData = {
    labels: Object.keys(analytics.categoryScores),
    datasets: [{ label: "Awareness Score", data: Object.values(analytics.categoryScores), backgroundColor: "#ff9933", borderRadius: 6 }]
  };

  const stateData = {
    labels: Object.keys(analytics.stateScores),
    datasets: [{ label: "State-wise Awareness", data: Object.values(analytics.stateScores), backgroundColor: "#138808", borderRadius: 6 }]
  };

  const ageData = {
    labels: Object.keys(analytics.ageGroups),
    datasets: [{ label: "Participants", data: Object.values(analytics.ageGroups), backgroundColor: "#d4af37", borderRadius: 6 }]
  };

  return (
    <main className="page dashboard-page">
      <BackgroundAnimation variant="dark" />
      <section className="section-heading dark-heading">
        <p className="eyebrow">Real Analytics</p>
        <h1>Public Opinion Insights</h1>
        <p>Show survey participation, rights awareness levels, state-wise data and age-group analysis using static demo data or free backend data.</p>
      </section>

      <section className="stats-grid">
        <article><span>Total Responses</span><strong>{analytics.totalResponses}</strong></article>
        <article><span>Awareness Score</span><strong>{analytics.awarenessScore}%</strong></article>
        <article><span>States Covered</span><strong>{analytics.stateCoverage}</strong></article>
        <article><span>Youth Participation</span><strong>{analytics.youthParticipation}%</strong></article>
      </section>

      <section className="charts-grid analytics-plus-grid">
        <article className="chart-card"><h3>Overall Opinion</h3><Doughnut data={doughnutData} options={{ plugins: { legend: { labels: { color: "#f6f0e4" } } } }} /></article>
        <article className="chart-card"><h3>Rights Awareness Levels</h3><Bar data={categoryData} options={barOptions} /></article>
        <article className="chart-card"><h3>State-wise Awareness</h3><Bar data={stateData} options={barOptions} /></article>
        <article className="chart-card"><h3>Age-group Participation</h3><Bar data={ageData} options={barOptions} /></article>
      </section>
    </main>
  );
}
