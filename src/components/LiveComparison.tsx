import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, ArrowLeftRight } from "lucide-react";

interface Props {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
  areaColor: string;
}

export function LiveComparison({ beforeUrl, afterUrl, beforeLabel, afterLabel, areaColor }: Props) {
  const [expanded, setExpanded] = useState<"before" | "after" | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.13 }}
      style={{
        borderRadius: "16px",
        backgroundColor: "#1e293b",
        border: `1px solid ${areaColor}30`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(51,65,85,0.5)",
          background: `linear-gradient(135deg, ${areaColor}08, transparent)`,
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
          <ArrowLeftRight style={{ width: "20px", height: "20px" }} />
        </div>
        <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "16px", margin: 0, flex: 1 }}>
          Live comparison — interact with both versions
        </h3>
        <span style={{ color: "#64748b", fontSize: "12px" }}>Click, hover, and switch states</span>
      </div>

      {/* Side by side or expanded */}
      <div style={{ padding: "24px" }}>
        {!expanded ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {/* Before */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      padding: "2px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: "rgba(239,68,68,0.15)",
                      color: "#f87171",
                    }}
                  >
                    BEFORE
                  </span>
                  <span style={{ color: "#94a3b8", fontSize: "13px" }}>{beforeLabel}</span>
                </div>
                <button
                  onClick={() => setExpanded("before")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  <Maximize2 style={{ width: "14px", height: "14px" }} />
                </button>
              </div>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid rgba(239,68,68,0.2)",
                  backgroundColor: "#f6f2e7",
                  height: "min(600px, 70vh)",
                }}
              >
                <iframe
                  src={beforeUrl}
                  title={beforeLabel}
                  style={{ width: "1200px", height: "900px", border: "none", transform: "scale(0.5)", transformOrigin: "top left" }}
                />
              </div>
            </div>

            {/* After */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      padding: "2px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: "rgba(52,211,153,0.15)",
                      color: "#34d399",
                    }}
                  >
                    AFTER
                  </span>
                  <span style={{ color: "#94a3b8", fontSize: "13px" }}>{afterLabel}</span>
                </div>
                <button
                  onClick={() => setExpanded("after")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  <Maximize2 style={{ width: "14px", height: "14px" }} />
                </button>
              </div>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid rgba(52,211,153,0.2)",
                  backgroundColor: "#f6f2e7",
                  height: "min(600px, 70vh)",
                }}
              >
                <iframe
                  src={afterUrl}
                  title={afterLabel}
                  style={{ width: "1200px", height: "900px", border: "none", transform: "scale(0.5)", transformOrigin: "top left" }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Expanded single view */
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    padding: "2px 10px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: 700,
                    backgroundColor: expanded === "before" ? "rgba(239,68,68,0.15)" : "rgba(52,211,153,0.15)",
                    color: expanded === "before" ? "#f87171" : "#34d399",
                  }}
                >
                  {expanded === "before" ? "BEFORE" : "AFTER"}
                </span>
                <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                  {expanded === "before" ? beforeLabel : afterLabel}
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setExpanded(expanded === "before" ? "after" : "before")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(51,65,85,0.5)",
                    backgroundColor: "#0f172a",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  <ArrowLeftRight style={{ width: "14px", height: "14px" }} />
                  Switch to {expanded === "before" ? "After" : "Before"}
                </button>
                <button
                  onClick={() => setExpanded(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(51,65,85,0.5)",
                    backgroundColor: "#0f172a",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  <Minimize2 style={{ width: "14px", height: "14px" }} />
                  Side by side
                </button>
              </div>
            </div>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: `2px solid ${expanded === "before" ? "rgba(239,68,68,0.2)" : "rgba(52,211,153,0.2)"}`,
                backgroundColor: "#f6f2e7",
                height: "min(700px, 75vh)",
              }}
            >
              <iframe
                src={expanded === "before" ? beforeUrl : afterUrl}
                title={expanded === "before" ? beforeLabel : afterLabel}
                style={{ width: "1200px", height: "900px", border: "none", transform: "scale(0.5)", transformOrigin: "top left" }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
