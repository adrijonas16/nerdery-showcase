import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ZoomIn, X } from "lucide-react";

interface ComparisonPair {
  before: string;
  after: string;
  label: string;
  description: string;
}

interface Props {
  pairs: ComparisonPair[];
  areaColor: string;
}

export function BeforeAfterGallery({ pairs, areaColor }: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
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
          <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "16px", margin: 0 }}>
            Before & After — side by side
          </h3>
        </div>

        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "32px" }}>
          {pairs.map((pair, i) => (
            <div key={i}>
              <div style={{ marginBottom: "12px" }}>
                <h4 style={{ color: "#fff", fontWeight: 600, fontSize: "15px", margin: "0 0 4px" }}>
                  {pair.label}
                </h4>
                <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
                  {pair.description}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {/* Before */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      zIndex: 2,
                      padding: "2px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: "rgba(239,68,68,0.9)",
                      color: "#fff",
                    }}
                  >
                    BEFORE
                  </div>
                  <button
                    onClick={() => setLightbox({ src: pair.before, label: `${pair.label} — Before` })}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: 0,
                      border: "2px solid rgba(239,68,68,0.3)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#0f172a",
                      position: "relative",
                    }}
                  >
                    <img
                      src={pair.before}
                      alt={`Before: ${pair.label}`}
                      loading="lazy"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      <ZoomIn style={{ width: "14px", height: "14px" }} />
                    </div>
                  </button>
                </div>

                {/* After */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      zIndex: 2,
                      padding: "2px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: "rgba(52,211,153,0.9)",
                      color: "#fff",
                    }}
                  >
                    AFTER
                  </div>
                  <button
                    onClick={() => setLightbox({ src: pair.after, label: `${pair.label} — After` })}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: 0,
                      border: "2px solid rgba(52,211,153,0.3)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#0f172a",
                      position: "relative",
                    }}
                  >
                    <img
                      src={pair.after}
                      alt={`After: ${pair.label}`}
                      loading="lazy"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      <ZoomIn style={{ width: "14px", height: "14px" }} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.92)",
            padding: "40px",
            cursor: "zoom-out",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X style={{ width: "20px", height: "20px" }} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", maxWidth: "90vw", maxHeight: "85vh" }}
          >
            <img
              src={lightbox.src}
              alt={lightbox.label}
              style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "12px", objectFit: "contain" }}
            />
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>{lightbox.label}</p>
          </div>
        </div>
      )}
    </>
  );
}
