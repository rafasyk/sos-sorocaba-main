import type { ReactNode } from "react";

export default function StatCard({
  label, value, description, icon, tone = "purple"
}: { label: string; value: string | number; description: string; icon: ReactNode; tone?: string }) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-head">
        <span>{label}</span>
        <div className="stat-icon">{icon}</div>
      </div>
      <strong>{value}</strong>
      <small>{description}</small>
    </div>
  );
}