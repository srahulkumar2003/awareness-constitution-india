import { Link, NavLink } from "react-router-dom";

const links = [
  ["/", "Home"],
  ["/explorer", "Explorer"],
  ["/survey", "Survey"],
  ["/dashboard", "Dashboard"],
  ["/ask-ai", "Tutor"],
  ["/quiz", "Quiz"],
  ["/judgments", "Judgments"],
  ["/about", "About"],
];

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img src="/images/logo.png" alt="Logo" />
        <span>Constitution Awareness</span>
      </Link>
      <nav>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? "active" : ""}>{label}</NavLink>
        ))}
      </nav>
    </header>
  );
}
