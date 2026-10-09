import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code, GitPullRequest } from "lucide-react";
import type { Area, Project } from "../data/projects";
import { ProjectDetail } from "./ProjectDetail";

interface Props {
  area: Area;
  selectedProject?: Project;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
}

export function AreaPage({
  area,
  selectedProject,
  onBack,
  onSelectProject,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      style={{ width: "100%", minHeight: "100vh" }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(15,23,42,0.85)",
          borderBottom: "1px solid rgba(51,65,85,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#94a3b8",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} />
            {selectedProject ? area.title : "Home"}
          </button>

          <div
            style={{
              height: "16px",
              width: "1px",
              backgroundColor: "#334155",
            }}
          />

          <h1
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "16px",
              margin: 0,
            }}
          >
            {selectedProject ? selectedProject.title : area.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        {!selectedProject ? (
          <>
            {/* Area header */}
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 20px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "16px",
                  backgroundColor: area.color + "15",
                  color: area.color,
                }}
              >
                {area.title}
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "12px",
                }}
              >
                Projects:{area.title}
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "18px" }}>
                {area.tagline}
              </p>
            </div>

            {/* Project cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  area.projects.length === 1
                    ? "minmax(0, 480px)"
                    : "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                maxWidth: "900px",
                margin: "0 auto",
                justifyContent: "center",
              }}
            >
              {area.projects.map((project, i) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => onSelectProject(project.id)}
                  style={{
                    textAlign: "left",
                    borderRadius: "16px",
                    border: "1px solid rgba(51,65,85,0.5)",
                    backgroundColor: "rgba(30,41,59,0.5)",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* Color accent top */}
                  <div
                    style={{ height: "3px", backgroundColor: area.color }}
                  />

                  <div style={{ padding: "28px" }}>
                    <h3
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "18px",
                        marginBottom: "8px",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                        marginBottom: "16px",
                        lineHeight: 1.6,
                      }}
                    >
                      {project.tagline}
                    </p>

                    {/* Tech badges */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "20px",
                      }}
                    >
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            padding: "2px 10px",
                            fontSize: "11px",
                            fontWeight: 500,
                            borderRadius: "999px",
                            backgroundColor: "rgba(51,65,85,0.5)",
                            color: "#94a3b8",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#22d3ee",
                            textDecoration: "none",
                          }}
                        >
                          <ExternalLink
                            style={{ width: "14px", height: "14px" }}
                          />
                          Live demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#94a3b8",
                            textDecoration: "none",
                          }}
                        >
                          <Code style={{ width: "14px", height: "14px" }} />
                          Code
                        </a>
                      )}
                      {project.prUrl && (
                        <a
                          href={project.prUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#94a3b8",
                            textDecoration: "none",
                          }}
                        >
                          <GitPullRequest style={{ width: "14px", height: "14px" }} />
                          PR
                        </a>
                      )}
                    </div>

                    {/* Arrow */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: area.color,
                      }}
                    >
                      <span>View details</span>
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
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <ProjectDetail project={selectedProject} areaColor={area.color} />
        )}
      </div>
    </motion.div>
  );
}
