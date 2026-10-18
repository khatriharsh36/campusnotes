import { SUBJECT_ICONS } from "../data/resources";

const SUBJECT_GRADIENTS = {
  Java: "linear-gradient(135deg,#4F46E5,#7C3AED)",
  DBMS: "linear-gradient(135deg,#0891B2,#06B6D4)",
  DSA: "linear-gradient(135deg,#16A34A,#22C55E)",
  "Web Technology": "linear-gradient(135deg,#D97706,#F59E0B)",
  "Data Analytics": "linear-gradient(135deg,#DC2626,#EF4444)",
};

export default function SubjectCard({ subject, count, onClick }) {
  const gradient = SUBJECT_GRADIENTS[subject] || SUBJECT_GRADIENTS["Java"];
  return (
    <button className="subject-card" onClick={() => onClick(subject)}>
      <div className="subject-icon-wrap" style={{ background: gradient + "22" }}>
        <span style={{ fontSize: "1.6rem" }}>{SUBJECT_ICONS[subject] || "📖"}</span>
      </div>
      <span className="subject-name">{subject}</span>
      <span className="subject-count">{count} resources</span>
    </button>
  );
}
