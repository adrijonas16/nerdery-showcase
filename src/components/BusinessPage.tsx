import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronDown,
  Users,
  Target,
  FlaskConical,
  Box,
  DollarSign,
  Layers,
  BarChart3,
  Megaphone,
  ShieldAlert,
} from "lucide-react";
import type { Project } from "../data/projects";
import { MediaGallery } from "./MediaGallery";
import { VideoEmbed } from "./VideoEmbed";
import { MarketSizeChart, CompetitorTable, UserFlowDiagram, UnitEconomics, FeatureCountChart } from "./BusinessMetrics";

interface Props {
  project: Project;
  areaColor: string;
}

const sectionIcons = [Users, Target, BarChart3, FlaskConical, Box, DollarSign, Megaphone, ShieldAlert];

export function BusinessPage({ project, areaColor }: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const sections = project.proposedImprovements ?? [];
  const insights = project.crossAreaInsights ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            {project.title}
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
              maxWidth: "700px",
              margin: "0 auto 24px",
              lineHeight: 1.7,
            }}
          >
            {project.description}
          </p>

          {/* Live link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: areaColor,
                textDecoration: "none",
              }}
            >
              <ExternalLink style={{ width: "16px", height: "16px" }} />
              Visit urbexcompany.com
            </a>
          )}
        </div>

        {/* Pitch Video */}
        {project.youtubeId && (
          <div style={{ marginBottom: "48px" }}>
            <VideoEmbed youtubeId={project.youtubeId} title={project.title} />
          </div>
        )}

        {/* Stats */}
        {project.stats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${project.stats.length}, 1fr)`,
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            {project.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                style={{
                  textAlign: "center",
                  padding: "24px 16px",
                  borderRadius: "16px",
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(51,65,85,0.5)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: stat.label === "Revenue" ? "#ef4444" : "#fff",
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Visual Metrics */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          marginBottom: "48px",
          padding: "32px",
          borderRadius: "20px",
          backgroundColor: "rgba(15,23,42,0.5)",
          border: "1px solid rgba(51,65,85,0.3)",
        }}>
          <FeatureCountChart />
          <UserFlowDiagram />
          <div style={{ borderTop: "1px solid rgba(51,65,85,0.3)", paddingTop: "32px" }}>
            <MarketSizeChart />
          </div>
          <div style={{ borderTop: "1px solid rgba(51,65,85,0.3)", paddingTop: "32px" }}>
            <CompetitorTable />
          </div>
          <div style={{ borderTop: "1px solid rgba(51,65,85,0.3)", paddingTop: "32px" }}>
            <UnitEconomics />
          </div>
        </div>

        {/* The 6 Lean Startup sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
          <h3
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            The Lean Startup Plan
          </h3>

          {sections.map((section, i) => {
            const isExpanded = expandedIdx === i;
            const Icon = sectionIcons[i] ?? Target;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                style={{
                  borderRadius: "16px",
                  backgroundColor: "#1e293b",
                  border: `1px solid ${isExpanded ? areaColor + "40" : "rgba(51,65,85,0.5)"}`,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setExpandedIdx(isExpanded ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: areaColor + "15",
                      color: areaColor,
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: "20px", height: "20px" }} />
                  </div>
                  <span
                    style={{
                      flex: 1,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {section.title}
                  </span>
                  {section.skills && (
                    <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                      {section.skills.map((s) => (
                        <span
                          key={s}
                          style={{
                            padding: "2px 10px",
                            fontSize: "11px",
                            borderRadius: "999px",
                            backgroundColor: "rgba(51,65,85,0.5)",
                            color: "#94a3b8",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  <ChevronDown
                    style={{
                      width: "18px",
                      height: "18px",
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
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 24px 24px",
                          paddingLeft: "80px",
                        }}
                      >
                        <p
                          style={{
                            color: "#cbd5e1",
                            fontSize: "15px",
                            lineHeight: 1.8,
                            margin: 0,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {section.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Key takeaway */}
        {project.whatILearned && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "48px",
              backgroundColor: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <h3
              style={{
                color: areaColor,
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "12px",
              }}
            >
              Key Takeaway
            </h3>
            <p
              style={{
                color: "#cbd5e1",
                fontSize: "16px",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {project.whatILearned}
            </p>
          </motion.div>
        )}

        {/* Architecture */}
        <div style={{ marginBottom: "48px" }}>
          <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
            Architecture
          </h3>

          {/* Infrastructure diagram */}
          <div style={{
            padding: "28px",
            borderRadius: "16px",
            backgroundColor: "#1e293b",
            border: "1px solid rgba(51,65,85,0.5)",
            marginBottom: "16px",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "24px",
            }}>
              {[
                { label: "Frontend (Web)", color: "#6366f1", items: ["Next.js 14 (App Router)", "React 18 + TypeScript 5", "Tailwind CSS v4", "Leaflet (maps)", "Socket.IO Client", "react-i18next (ES/EN)", "Storybook (66 stories)", "47 pages, 146 components"] },
                { label: "Mobile App", color: "#f472b6", items: ["React Native + Expo", "Expo Location (GPS)", "Expo ImagePicker", "Leaflet via WebView", "Socket.IO (live tracking)", "EAS Build (Android)"] },
                { label: "Backend API", color: "#22d3ee", items: ["NestJS 10 (27 modules)", "PostgreSQL 16 + stored procs", "JWT (access + refresh tokens)", "Socket.IO Gateway", "Stripe (ready, not active)", "bcryptjs + 2FA OTP"] },
                { label: "Infrastructure", color: "#34d399", items: ["Vercel (frontend + CDN)", "Railway (API + PostgreSQL)", "Cloudflare (DNS, SSL, DDoS)", "Cloudflare R2 (media storage)", "Custom domain: urbexcompany.com"] },
              ].map((col) => (
                <div key={col.label}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: col.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "10px",
                    paddingBottom: "6px",
                    borderBottom: `2px solid ${col.color}30`,
                  }}>
                    {col.label}
                  </div>
                  {col.items.map((item) => (
                    <div key={item} style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                      padding: "3px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}>
                      <span style={{ color: col.color, fontSize: "8px" }}>●</span>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Data flow */}
            <div style={{
              padding: "16px 20px",
              borderRadius: "10px",
              backgroundColor: "rgba(51,65,85,0.3)",
              fontSize: "13px",
              color: "#94a3b8",
              lineHeight: 1.6,
            }}>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                Data Flow
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px" }}>
                {["User (browser/mobile)", "→", "Vercel CDN", "→", "Next.js SSR", "→", "NestJS API (Railway)", "→", "PostgreSQL", " | ", "Media", "→", "Cloudflare R2", " | ", "Real-time", "→", "Socket.IO Gateway"].map((item, i) => (
                  <span key={i} style={{
                    color: item === "→" || item === " | " ? "#475569" : "#cbd5e1",
                    fontWeight: item === "→" || item === " | " ? 400 : 500,
                    fontSize: item === "→" || item === " | " ? "11px" : "12px",
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key numbers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "10px",
          }}>
            {[
              { value: "47", label: "Pages", color: "#6366f1" },
              { value: "146", label: "Components", color: "#6366f1" },
              { value: "27", label: "API Modules", color: "#22d3ee" },
              { value: "66", label: "Storybook Stories", color: "#f472b6" },
              { value: "24", label: "Feature Modules", color: "#34d399" },
              { value: "5,532", label: "Places in DB", color: "#f59e0b" },
              { value: "55", label: "Backend Tests", color: "#a78bfa" },
              { value: "3", label: "Product Iterations", color: "#fb923c" },
            ].map((m) => (
              <div key={m.label} style={{
                textAlign: "center",
                padding: "14px 8px",
                borderRadius: "10px",
                backgroundColor: "#1e293b",
                border: `1px solid ${m.color}20`,
              }}>
                <div style={{ color: m.color, fontSize: "22px", fontWeight: 800 }}>{m.value}</div>
                <div style={{ color: "#64748b", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div style={{ marginBottom: "48px" }}>
          <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
            Pricing
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* B2C */}
            <div style={{
              borderRadius: "16px",
              backgroundColor: "#1e293b",
              border: "1px solid rgba(255,87,34,0.3)",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "20px 24px 12px",
                borderBottom: "1px solid rgba(51,65,85,0.5)",
              }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#FF7043", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  B2C — For Explorers
                </div>
                <div style={{ fontSize: "14px", color: "#94a3b8" }}>
                  Discovering and saving places is always free
                </div>
              </div>
              <div style={{ padding: "16px 24px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(51,65,85,0.3)",
                }}>
                  <div>
                    <div style={{ color: "#cbd5e1", fontSize: "15px", fontWeight: 600 }}>Free</div>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>Browse, save, mark visited, world map</div>
                  </div>
                  <div style={{ color: "#34d399", fontSize: "16px", fontWeight: 700 }}>$0</div>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                }}>
                  <div>
                    <div style={{ color: "#cbd5e1", fontSize: "15px", fontWeight: 600 }}>Premium</div>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>Offline access, advanced planning, GPS routes, longer itineraries</div>
                  </div>
                  <div style={{ color: "#FF7043", fontSize: "16px", fontWeight: 700, whiteSpace: "nowrap" }}>$4.99/mo</div>
                </div>
              </div>
            </div>

            {/* B2B */}
            <div style={{
              borderRadius: "16px",
              backgroundColor: "#1e293b",
              border: "1px solid rgba(34,211,238,0.3)",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "20px 24px 12px",
                borderBottom: "1px solid rgba(51,65,85,0.5)",
              }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#22d3ee", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  B2B — For Tour Companies
                </div>
                <div style={{ fontSize: "14px", color: "#94a3b8" }}>
                  List services and reach travelers planning trips
                </div>
              </div>
              <div style={{ padding: "16px 24px" }}>
                {[
                  { name: "Basic", price: "Free", desc: "3 services, 15% commission", color: "#94a3b8" },
                  { name: "Pro", price: "$29/mo", desc: "Unlimited services, 10% commission, analytics", color: "#22d3ee" },
                  { name: "Enterprise", price: "$99/mo", desc: "5% commission, featured placement, API access", color: "#f59e0b" },
                ].map((plan, i) => (
                  <div key={plan.name} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: i < 2 ? "1px solid rgba(51,65,85,0.3)" : "none",
                  }}>
                    <div>
                      <div style={{ color: "#cbd5e1", fontSize: "15px", fontWeight: 600 }}>{plan.name}</div>
                      <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>{plan.desc}</div>
                    </div>
                    <div style={{ color: plan.color, fontSize: "16px", fontWeight: 700, whiteSpace: "nowrap" }}>{plan.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{
            marginTop: "12px",
            padding: "12px 20px",
            borderRadius: "10px",
            backgroundColor: "rgba(51,65,85,0.3)",
            fontSize: "13px",
            color: "#64748b",
            lineHeight: 1.6,
          }}>
            Break-even at just 10 premium users (~$50/mo hosting). Don't paywall until 1,000 MAU — users need to feel the value first.
          </div>
        </div>

        {/* Screenshots */}
        {project.media && project.media.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h3
              style={{
                color: "#fff",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              The Product
            </h3>
            <MediaGallery media={project.media} areaColor={areaColor} />
          </div>
        )}

        {/* How Nerdery shaped this */}
        {insights.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h3
              style={{
                color: "#fff",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Layers style={{ width: "22px", height: "22px", color: areaColor }} />
              How the Nerdery shaped this project
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "12px",
              }}
            >
              {insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  style={{
                    padding: "20px",
                    borderRadius: "14px",
                    backgroundColor: "#1e293b",
                    borderLeft: `3px solid ${insight.color}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: insight.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "8px",
                    }}
                  >
                    {insight.fromArea}
                  </div>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {insight.insight}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div style={{ textAlign: "center", paddingBottom: "32px" }}>
          <h4
            style={{
              color: "#64748b",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            Built with
          </h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "4px 14px",
                  fontSize: "12px",
                  fontWeight: 500,
                  borderRadius: "999px",
                  backgroundColor: "rgba(51,65,85,0.5)",
                  color: "#cbd5e1",
                  border: "1px solid rgba(51,65,85,0.8)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
