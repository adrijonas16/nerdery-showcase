import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image } from "lucide-react";
import type { MediaItem } from "../data/projects";

interface Props {
  media: MediaItem[];
  areaColor: string;
}

export function MediaGallery({ media, areaColor }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!media.length) return null;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % media.length : 0));
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + media.length) % media.length : 0
    );

  return (
    <>
      {/* Thumbnails grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
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
            <Image style={{ width: "20px", height: "20px" }} />
          </div>
          <h3
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "16px",
              margin: 0,
            }}
          >
            Visual evidence
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
            {media.length}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "12px",
            padding: "24px",
          }}
        >
          {media.map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => openLightbox(i)}
              style={{
                position: "relative",
                aspectRatio: "16/10",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(51,65,85,0.5)",
                cursor: "pointer",
                background: "#0f172a",
                padding: 0,
              }}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  muted
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}

              {/* Caption overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px 12px",
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.8))",
                  color: "#e2e8f0",
                  fontSize: "12px",
                  fontWeight: 500,
                  textAlign: "left",
                }}
              >
                {item.caption}
              </div>

              {/* Play icon for videos */}
              {item.type === "video" && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  ▶
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.9)",
              padding: "40px",
            }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
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

            {/* Nav buttons */}
            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  style={{
                    position: "absolute",
                    left: "16px",
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
                  <ChevronLeft style={{ width: "24px", height: "24px" }} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  style={{
                    position: "absolute",
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
                  <ChevronRight style={{ width: "24px", height: "24px" }} />
                </button>
              </>
            )}

            {/* Content */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {media[lightboxIndex].type === "video" ? (
                <video
                  src={media[lightboxIndex].src}
                  controls
                  autoPlay
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    borderRadius: "12px",
                  }}
                />
              ) : (
                <img
                  src={media[lightboxIndex].src}
                  alt={media[lightboxIndex].caption}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    borderRadius: "12px",
                    objectFit: "contain",
                  }}
                />
              )}
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  textAlign: "center",
                  maxWidth: "600px",
                }}
              >
                {media[lightboxIndex].caption}
                <span
                  style={{
                    display: "block",
                    marginTop: "4px",
                    fontSize: "12px",
                    color: "#475569",
                  }}
                >
                  {lightboxIndex + 1} / {media.length}
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
