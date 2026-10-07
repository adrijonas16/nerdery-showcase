import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  color: string;
  delay?: number;
  children: ReactNode;
}

export function SectionCard({ icon, title, color, delay = 0, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
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
            backgroundColor: color + "20",
            color: color,
          }}
        >
          {icon}
        </div>
        <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "16px", margin: 0 }}>
          {title}
        </h3>
      </div>
      <div style={{ padding: "24px" }}>{children}</div>
    </motion.div>
  );
}
