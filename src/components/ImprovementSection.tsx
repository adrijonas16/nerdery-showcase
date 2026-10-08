import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Rocket,
  GraduationCap,
  Wrench,
  ChevronDown,
  Terminal,
  Sparkles,
} from "lucide-react";
import type { ProposedImprovement } from "../data/projects";

interface Props {
  whatILearned: string;
  proposedImprovements: ProposedImprovement[];
  toolsUsed: string[];
  areaColor: string;
}

export function ImprovementSection({
  whatILearned,
  proposedImprovements,
  toolsUsed,
  areaColor,
}: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* What I Learned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
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
              backgroundColor: "#f59e0b20",
              color: "#f59e0b",
            }}
          >
            <GraduationCap style={{ width: "20px", height: "20px" }} />
          </div>
          <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "16px", margin: 0 }}>
            What I learned
          </h3>
        </div>
        <div style={{ padding: "24px" }}>
          <p style={{ color: "#cbd5e1", lineHeight: 1.7, whiteSpace: "pre-line", margin: 0 }}>
            {whatILearned}
          </p>
        </div>
      </motion.div>

      {/* Tools & Skills Used */}
      {toolsUsed.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
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
                backgroundColor: "#8b5cf620",
                color: "#8b5cf6",
              }}
            >
              <Wrench style={{ width: "20px", height: "20px" }} />
            </div>
            <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "16px", margin: 0 }}>
              Tools & skills used
            </h3>
          </div>
          <div
            style={{
              padding: "24px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {toolsUsed.map((tool) => (
              <span
                key={tool}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 500,
                  backgroundColor: "rgba(139,92,246,0.1)",
                  color: "#a78bfa",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Proposed Improvements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          borderRadius: "16px",
          backgroundColor: "#1e293b",
          border: `1px solid ${areaColor}30`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 24px",
            borderBottom: `1px solid ${areaColor}20`,
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
            <Rocket style={{ width: "20px", height: "20px" }} />
          </div>
          <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "16px", margin: 0 }}>
            How we'd improve it
          </h3>
          <span
            style={{
              padding: "2px 10px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: areaColor + "20",
              color: areaColor,
            }}
          >
            {proposedImprovements.length}
          </span>
        </div>

        <div style={{ padding: "16px 24px" }}>
          {proposedImprovements.map((imp, i) => {
            const isExpanded = expandedIdx === i;
            return (
              <div
                key={i}
                style={{
                  borderBottom:
                    i < proposedImprovements.length - 1
                      ? "1px solid rgba(51,65,85,0.3)"
                      : "none",
                }}
              >
                <button
                  onClick={() => setExpandedIdx(isExpanded ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <Lightbulb
                    style={{
                      width: "18px",
                      height: "18px",
                      color: areaColor,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1, color: "#fff", fontWeight: 600, fontSize: "15px" }}>
                    {imp.title}
                  </span>
                  <ChevronDown
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#64748b",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingBottom: "16px", paddingLeft: "30px" }}>
                        <p
                          style={{
                            color: "#94a3b8",
                            fontSize: "14px",
                            lineHeight: 1.7,
                            margin: "0 0 12px",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {imp.description}
                        </p>

                        {imp.code && (
                          <div style={{ marginTop: "12px" }}>
                            <div
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                color: "#64748b",
                                marginBottom: "8px",
                              }}
                            >
                              {imp.code.file}
                            </div>
                            {imp.code.before && (
                              <div
                                style={{
                                  padding: "12px 16px",
                                  borderRadius: "10px 10px 0 0",
                                  backgroundColor: "rgba(239,68,68,0.05)",
                                  border: "1px solid rgba(239,68,68,0.15)",
                                  borderBottom: "none",
                                }}
                              >
                                <div style={{ fontSize: "10px", fontWeight: 700, color: "#f87171", marginBottom: "6px", textTransform: "uppercase" }}>Before</div>
                                <pre style={{ margin: 0, color: "#f87171", fontSize: "12px", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word", opacity: 0.8 }}>
                                  {imp.code.before}
                                </pre>
                              </div>
                            )}
                            <div
                              style={{
                                padding: "12px 16px",
                                borderRadius: imp.code.before ? "0 0 10px 10px" : "10px",
                                backgroundColor: "rgba(52,211,153,0.05)",
                                border: "1px solid rgba(52,211,153,0.15)",
                              }}
                            >
                              <div style={{ fontSize: "10px", fontWeight: 700, color: "#34d399", marginBottom: "6px", textTransform: "uppercase" }}>{imp.code.before ? "After" : "Code"}</div>
                              <pre style={{ margin: 0, color: "#34d399", fontSize: "12px", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                {imp.code.after}
                              </pre>
                            </div>
                          </div>
                        )}

                        {imp.prompt && (
                          <div
                            style={{
                              marginTop: "12px",
                              padding: "12px 16px",
                              borderRadius: "10px",
                              backgroundColor: "#0f172a",
                              border: "1px solid rgba(51,65,85,0.5)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                marginBottom: "8px",
                                color: "#64748b",
                                fontSize: "11px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              <Terminal style={{ width: "12px", height: "12px" }} />
                              Prompt / command used
                            </div>
                            <code
                              style={{
                                color: "#e2e8f0",
                                fontSize: "13px",
                                fontFamily: "monospace",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                              }}
                            >
                              {imp.prompt}
                            </code>
                          </div>
                        )}

                        {imp.skills && imp.skills.length > 0 && (
                          <div
                            style={{
                              marginTop: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              flexWrap: "wrap",
                            }}
                          >
                            <Sparkles
                              style={{ width: "14px", height: "14px", color: "#64748b" }}
                            />
                            {imp.skills.map((s) => (
                              <span
                                key={s}
                                style={{
                                  padding: "2px 10px",
                                  borderRadius: "999px",
                                  fontSize: "11px",
                                  fontWeight: 500,
                                  backgroundColor: areaColor + "15",
                                  color: areaColor,
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
