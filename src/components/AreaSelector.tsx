import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  TestTube,
  Palette,
  ClipboardList,
  Bot,
} from "lucide-react";
import type { Area } from "../data/projects";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Monitor,
  Server,
  TestTube,
  Palette,
  ClipboardList,
  Bot,
};

interface Props {
  areas: Area[];
  onSelect: (areaId: string) => void;
}

export function AreaSelector({ areas, onSelect }: Props) {
  return (
    <section style={{ padding: "0 24px 80px", width: "100%" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#64748b",
            marginBottom: "40px",
          }}
        >
          Select an area
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {areas.map((area, i) => {
            const Icon = iconMap[area.icon] ?? Monitor;

            return (
              <motion.button
                key={area.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => onSelect(area.id)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  textAlign: "center",
                  padding: "32px 24px",
                  borderRadius: "16px",
                  border: `1px solid rgba(51,65,85,0.5)`,
                  backgroundColor: "rgba(30,41,59,0.5)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    backgroundColor: area.color + "20",
                  }}
                >
                  <Icon
                    style={{ width: "28px", height: "28px", color: area.color }}
                  />
                </div>

                <h3
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "20px",
                    marginBottom: "4px",
                  }}
                >
                  {area.title}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "16px" }}>
                  {area.tagline}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: area.color,
                  }}
                >
                  <span>
                    {area.projects.length} project
                    {area.projects.length !== 1 ? "s" : ""}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
