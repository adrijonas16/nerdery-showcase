import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import type { CrossAreaInsight } from "../data/projects";

interface Props {
  insights: CrossAreaInsight[];
  areaColor: string;
}

export function CrossAreaInsights({ insights, areaColor }: Props) {
  if (!insights.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.33 }}
      style={{
        borderRadius: "16px",
        backgroundColor: "#1e293b",
        border: "1px solid rgba(51,65,85,0.5)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(51,65,85,0.5)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: areaColor + "20",
            color: areaColor,
          }}
        >
          <Layers style={{ width: "20px", height: "20px" }} />
        </div>
        <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "16px", margin: 0 }}>
          Applying learnings from other areas
        </h3>
      </div>

      <div style={{ padding: "16px 24px" }}>
        {insights.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "12px 0",
              borderBottom:
                i < insights.length - 1
                  ? "1px solid rgba(51,65,85,0.3)"
                  : "none",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
                padding: "3px 10px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 600,
                backgroundColor: item.color + "15",
                color: item.color,
                whiteSpace: "nowrap",
              }}
            >
              {item.fromArea}
              <ArrowRight style={{ width: "12px", height: "12px" }} />
            </span>
            <p
              style={{
                color: "#cbd5e1",
                fontSize: "14px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {item.insight}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
