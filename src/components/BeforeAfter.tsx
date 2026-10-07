import { motion } from "framer-motion";

interface Props {
  before: string;
  after: string;
}

export function BeforeAfter({ before, after }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "16px",
      }}
    >
      {/* Before */}
      <div
        style={{
          borderRadius: "16px",
          backgroundColor: "#1e293b",
          border: "1px solid rgba(239,68,68,0.2)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(239,68,68,0.2)",
            backgroundColor: "rgba(239,68,68,0.05)",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "rgba(239,68,68,0.6)",
            }}
          />
          <h3
            style={{
              color: "#f87171",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            Before
          </h3>
        </div>
        <div style={{ padding: "24px" }}>
          <p
            style={{
              color: "#94a3b8",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {before}
          </p>
        </div>
      </div>

      {/* After */}
      <div
        style={{
          borderRadius: "16px",
          backgroundColor: "#1e293b",
          border: "1px solid rgba(52,211,153,0.2)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(52,211,153,0.2)",
            backgroundColor: "rgba(52,211,153,0.05)",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "rgba(52,211,153,0.6)",
            }}
          />
          <h3
            style={{
              color: "#34d399",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            After
          </h3>
        </div>
        <div style={{ padding: "24px" }}>
          <p
            style={{
              color: "#94a3b8",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {after}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
