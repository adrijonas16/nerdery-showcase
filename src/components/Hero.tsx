import { motion } from "framer-motion";

export function Hero() {
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ position: "relative", zIndex: 1, marginTop: "64px" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
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
