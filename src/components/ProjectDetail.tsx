import { motion } from "framer-motion";
import {
  CheckCircle,
  ClipboardList,
  FileText,
  Play,
  ArrowRight,
  Zap,
  ExternalLink,
  Code,
} from "lucide-react";
import type { Project } from "../data/projects";
import { SectionCard } from "./SectionCard";
import { BeforeAfter } from "./BeforeAfter";
import { VideoEmbed } from "./VideoEmbed";
import { MediaGallery } from "./MediaGallery";
import { ImprovementSection } from "./ImprovementSection";
import { CrossAreaInsights } from "./CrossAreaInsights";
import { BeforeAfterGallery } from "./BeforeAfterGallery";
import { LiveComparison } from "./LiveComparison";

interface Props {
  project: Project;
  areaColor: string;
}

export function ProjectDetail({ project, areaColor }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
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
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            {project.description}
          </p>

          {/* Tech stack */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginTop: "24px",
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

          {/* External links */}
          {(project.liveUrl || project.repoUrl) && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 20px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#fff",
                    backgroundColor: areaColor,
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink style={{ width: "16px", height: "16px" }} />
                  Live demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 20px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#cbd5e1",
                    backgroundColor: "#334155",
                    textDecoration: "none",
                  }}
                >
                  <Code style={{ width: "16px", height: "16px" }} />
                  View code
                </a>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        {project.stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`,
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            {project.stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "16px",
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(51,65,85,0.5)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </motion.div>
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
              </div>
            ))}
          </motion.div>
        )}

        {/* Live preview */}
        {project.liveUrl && (
          <div style={{ marginBottom: "32px" }}>
            <SectionCard
              icon={<ExternalLink style={{ width: "20px", height: "20px" }} />}
              title="Live preview"
              color={areaColor}
              delay={0.12}
            >
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(51,65,85,0.5)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    backgroundColor: "#0f172a",
                    borderBottom: "1px solid rgba(51,65,85,0.5)",
                  }}
                >
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(239,68,68,0.6)",
                      }}
                    />
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(234,179,8,0.6)",
                      }}
                    />
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(34,197,94,0.6)",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      fontFamily: "monospace",
                      marginLeft: "8px",
                    }}
                  >
                    {project.liveUrl}
                  </span>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "500px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={project.liveUrl}
                    title={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      backgroundColor: "#fff",
                    }}
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* Sections with spacing */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Requirements */}
          <SectionCard
            icon={
              <ClipboardList style={{ width: "20px", height: "20px" }} />
            }
            title="What was required"
            color="#fb923c"
            delay={0.15}
          >
            <ul style={{ listStyle: "none", padding: 0 }}>
              {project.requirements.map((req, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    color: "#cbd5e1",
                    padding: "8px 0",
                  }}
                >
                  <ArrowRight
                    style={{
                      width: "16px",
                      height: "16px",
                      marginTop: "2px",
                      color: "#fb923c",
                      flexShrink: 0,
                    }}
                  />
                  <span>{req}</span>
                </motion.li>
              ))}
            </ul>
          </SectionCard>

          {/* Before / After */}
          {(project.beforeDescription || project.afterDescription) && (
            <BeforeAfter
              before={project.beforeDescription}
              after={project.afterDescription}
            />
          )}

          {/* Live interactive comparison */}
          {project.liveComparison && (
            <LiveComparison
              beforeUrl={project.liveComparison.beforeUrl}
              afterUrl={project.liveComparison.afterUrl}
              beforeLabel={project.liveComparison.beforeLabel}
              afterLabel={project.liveComparison.afterLabel}
              areaColor={areaColor}
            />
          )}

          {/* Before/After comparison gallery */}
          {project.comparisons && project.comparisons.length > 0 && (
            <BeforeAfterGallery pairs={project.comparisons} areaColor={areaColor} />
          )}

          {/* Media gallery */}
          {project.media && project.media.length > 0 && (
            <MediaGallery media={project.media} areaColor={areaColor} />
          )}

          {/* Improvements */}
          <SectionCard
            icon={<Zap style={{ width: "20px", height: "20px" }} />}
            title="What we improved"
            color="#34d399"
            delay={0.2}
          >
            <ul style={{ listStyle: "none", padding: 0 }}>
              {project.improvements.map((imp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    color: "#cbd5e1",
                    padding: "8px 0",
                  }}
                >
                  <CheckCircle
                    style={{
                      width: "16px",
                      height: "16px",
                      marginTop: "2px",
                      color: "#34d399",
                      flexShrink: 0,
                    }}
                  />
                  <span>{imp}</span>
                </motion.li>
              ))}
            </ul>
          </SectionCard>

          {/* Notes */}
          {project.notes && (
            <SectionCard
              icon={<FileText style={{ width: "20px", height: "20px" }} />}
              title="Notes"
              color="#f472b6"
              delay={0.25}
            >
              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {project.notes}
              </p>
            </SectionCard>
          )}

          {/* Video */}
          {project.youtubeId && (
            <SectionCard
              icon={<Play style={{ width: "20px", height: "20px" }} />}
              title="Walkthrough video"
              color="#6366f1"
              delay={0.3}
            >
              <VideoEmbed youtubeId={project.youtubeId} title={project.title} />
            </SectionCard>
          )}

          {/* Cross-area insights */}
          {project.crossAreaInsights && project.crossAreaInsights.length > 0 && (
            <CrossAreaInsights insights={project.crossAreaInsights} areaColor={areaColor} />
          )}

          {/* What I learned + How to improve */}
          {project.whatILearned && project.proposedImprovements && (
            <ImprovementSection
              whatILearned={project.whatILearned}
              proposedImprovements={project.proposedImprovements}
              toolsUsed={project.toolsUsed ?? []}
              areaColor={areaColor}
            />
          )}

        </div>
      </div>
    </motion.div>
  );
}
