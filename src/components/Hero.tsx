import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const [showEaster, setShowEaster] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (next >= 5) {
      setShowEaster(!showEaster);
      setClickCount(0);
    } else {
      clickTimer.current = setTimeout(() => setClickCount(0), 2000);
    }
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "96px 24px",
        textAlign: "center",
        width: "100%",
      }}
    >
      {/* Gradient orb */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            display: "inline-block",
            marginBottom: "24px",
            padding: "6px 20px",
            borderRadius: "999px",
            backgroundColor: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "#818cf8",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          RAVN Nerdery 2026
        </motion.div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          Nerdery{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #818cf8, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Showcase
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#94a3b8",
            maxWidth: "650px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Final deliverables from the Nerdery program. Each project includes
          requirements, improvements made, lessons learned, and a walkthrough video.
        </p>

        {/* Certificates links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/media/cert-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "rgba(251,146,60,0.1)",
              color: "#fb923c",
              border: "1px solid rgba(251,146,60,0.2)",
              textDecoration: "none",
            }}
          >
            Claude Certified Architect - Foundations
          </a>
          <a
            href="/media/cert-2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "rgba(139,92,246,0.1)",
              color: "#a78bfa",
              border: "1px solid rgba(139,92,246,0.2)",
              textDecoration: "none",
            }}
          >
            Claude Certified Architect - Professional
          </a>
        </div>
      </motion.div>

      {/* Easter egg memes */}
      <AnimatePresence>
        {showEaster && (
          <>
            <motion.img
              key="dk"
              src="/media/meme-humildad.jpg"
              alt="humildad"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "5%",
                width: "clamp(100px, 15vw, 180px)",
                borderRadius: "16px",
                zIndex: 10,
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                cursor: "pointer",
              }}
              onClick={() => setShowEaster(false)}
            />
            <motion.img
              key="cert1"
              src="/media/meme-cert-foundations.jpg"
              alt="Chandler with Claude certificate"
              initial={{ opacity: 0, x: -100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: -3 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", delay: 0.1 }}
              style={{
                position: "absolute",
                top: "15%",
                left: "2%",
                width: "clamp(120px, 18vw, 220px)",
                borderRadius: "12px",
                zIndex: 10,
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                cursor: "pointer",
              }}
              onClick={() => setShowEaster(false)}
            />
            <motion.img
              key="cert2"
              src="/media/meme-cert-pro.jpg"
              alt="Chandler with Claude Pro certificate"
              initial={{ opacity: 0, x: 100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 5 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", delay: 0.2 }}
              style={{
                position: "absolute",
                top: "10%",
                right: "2%",
                width: "clamp(120px, 18vw, 220px)",
                borderRadius: "12px",
                zIndex: 10,
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                cursor: "pointer",
              }}
              onClick={() => setShowEaster(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ position: "relative", zIndex: 1, marginTop: "64px" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={handleSecretClick}
          style={{
            width: "24px",
            height: "40px",
            margin: "0 auto",
            borderRadius: "999px",
            border: "2px solid #475569",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "6px",
            cursor: "default",
          }}
        >
          <div
            style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#94a3b8" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
