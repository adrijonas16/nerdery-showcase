import { motion } from "framer-motion";

// ── Market Size Bar Chart ──
export function MarketSizeChart() {
  const bars = [
    { label: "Adventure Tourism", value: 550, unit: "B", color: "#f59e0b", width: 100 },
    { label: "Travel Apps", value: 60, unit: "B", color: "#fb923c", width: 60 },
    { label: "Hiking Apps", value: 1.8, unit: "B", color: "#f97316", width: 30 },
    { label: "Urbex SAM", value: 0.05, unit: "B", display: "50M", color: "#ef4444", width: 12 },
    { label: "Urbex Year 1", value: 0.00002, unit: "", display: "18-80K", color: "#dc2626", width: 5 },
  ];

  return (
    <div>
      <h4 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>
        Market Opportunity (2025)
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {bars.map((bar, i) => (
          <motion.div
            key={bar.label}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div style={{ width: "130px", flexShrink: 0, textAlign: "right" }}>
              <span style={{ color: "#94a3b8", fontSize: "12px" }}>{bar.label}</span>
            </div>
            <div style={{ flex: 1, position: "relative", height: "28px" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bar.width}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                style={{
                  height: "100%",
                  borderRadius: "6px",
                  background: `linear-gradient(90deg, ${bar.color}90, ${bar.color})`,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  minWidth: "60px",
                }}
              >
                <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>
                  {bar.display || `$${bar.value}${bar.unit}`}
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      <p style={{ color: "#64748b", fontSize: "11px", marginTop: "12px" }}>
        Sources: Research and Markets, Fortune Business Insights, GMInsights (2025)
      </p>
    </div>
  );
}

// ── Competitor Comparison Table ──
export function CompetitorTable() {
  const competitors = [
    { name: "AllTrails", users: "65M", revenue: "$130M+", model: "Freemium $36/yr", valuation: "$800M+", urbex: false, trips: false, gamification: false, chat: false },
    { name: "Atlas Obscura", users: "3.9M/mo", revenue: "$18.3M", model: "Ads + Trips", valuation: "Private", urbex: true, trips: true, gamification: false, chat: false },
    { name: "Komoot", users: "50M", revenue: "$40M", model: "Freemium", valuation: "Acquired", urbex: false, trips: false, gamification: false, chat: false },
    { name: "Reddit r/urbex", users: "2.2M", revenue: "N/A", model: "Forum", valuation: "N/A", urbex: true, trips: false, gamification: false, chat: false },
    { name: "Urbex", users: "Early", revenue: "$0", model: "Freemium + B2B", valuation: "Pre-revenue", urbex: true, trips: true, gamification: true, chat: true },
  ];

  const features = [
    { key: "urbex", label: "Urban Exploration" },
    { key: "trips", label: "Trip Planning" },
    { key: "gamification", label: "Gamification" },
    { key: "chat", label: "Community Chat" },
  ];

  return (
    <div>
      <h4 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>
        Competitive Landscape
      </h4>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr>
              {["", "Users", "Revenue", "Model", ...features.map(f => f.label)].map((h, i) => (
                <th key={i} style={{
                  padding: "10px 12px",
                  textAlign: i === 0 ? "left" : "center",
                  color: "#64748b",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid rgba(51,65,85,0.5)",
                  whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors.map((c, i) => {
              const isUrbex = c.name === "Urbex";
              return (
                <motion.tr
                  key={c.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  style={{
                    backgroundColor: isUrbex ? "rgba(245,158,11,0.08)" : "transparent",
                  }}
                >
                  <td style={{
                    padding: "12px",
                    color: isUrbex ? "#f59e0b" : "#fff",
                    fontWeight: isUrbex ? 700 : 500,
                    borderBottom: "1px solid rgba(51,65,85,0.3)",
                  }}>
                    {c.name}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#cbd5e1", borderBottom: "1px solid rgba(51,65,85,0.3)" }}>{c.users}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: c.revenue === "$0" ? "#ef4444" : "#cbd5e1", fontWeight: c.revenue === "$0" ? 700 : 400, borderBottom: "1px solid rgba(51,65,85,0.3)" }}>{c.revenue}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#94a3b8", borderBottom: "1px solid rgba(51,65,85,0.3)" }}>{c.model}</td>
                  {features.map(f => {
                    const has = c[f.key as keyof typeof c];
                    return (
                      <td key={f.key} style={{
                        padding: "12px",
                        textAlign: "center",
                        borderBottom: "1px solid rgba(51,65,85,0.3)",
                        fontSize: "16px",
                      }}>
                        {has ? <span style={{ color: "#34d399" }}>&#10003;</span> : <span style={{ color: "#475569" }}>&#10007;</span>}
                      </td>
                    );
                  })}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── User Flow Diagram ──
export function UserFlowDiagram() {
  const flows = [
    {
      title: "Discovery",
      color: "#f59e0b",
      steps: ["Land on home", "Pick country (3D globe)", "Browse by category", "Search places/cities", "Place detail + chatbot", "Like / Save / Comment"],
    },
    {
      title: "Exploration & Gamification",
      color: "#34d399",
      steps: ["Mark place as visited", "World map fills in", "Earn XP", "Level up (10 levels)", "Unlock achievements", "Climb leaderboard"],
    },
    {
      title: "Trip Planner",
      color: "#6366f1",
      steps: ["Create itinerary", "Add flights/hotels/places/restaurants", "Set budget + multi-currency", "Calendar week view", "Route optimizer (TSP)", "Invite collaborators"],
    },
    {
      title: "Share & Collage",
      color: "#a78bfa",
      steps: ["Upload trip photos", "Generate vintage diary image", "Parchment + compass rose + map", "Polaroid scrapbook photos", "QR code + route line", "Share to social"],
    },
    {
      title: "Group Trips",
      color: "#f472b6",
      steps: ["Create expedition", "Set meeting point on map", "Others join", "Auto-creates chat room", "Live GPS tracking (mobile)", "Share trip card image"],
    },
    {
      title: "GPS Routes",
      color: "#ef4444",
      steps: ["Start recording (mobile)", "Live stats: distance/pace/speed", "Add photos during route", "Upload as community route", "Others follow your route", "Upvote best routes"],
    },
    {
      title: "Social & Content",
      color: "#fb923c",
      steps: ["Follow explorers", "Submit new places (moderated)", "Contribute photos to places", "Submit TikTok/YouTube videos", "Chat in location rooms", "Publish & copy itineraries"],
    },
    {
      title: "Nearby & Live",
      color: "#22d3ee",
      steps: ["Allow GPS location", "See places within radius", "Filter by category", "Find nearby services", "Live map with routes", "Navigate to meeting point"],
    },
    {
      title: "Company Portal",
      color: "#8b5cf6",
      steps: ["Company registers", "Publish services + schedules", "Set pricing + recurrence", "Travelers browse & book", "Manage bookings dashboard", "Revenue + commission tracking"],
    },
    {
      title: "Tour Marketplace",
      color: "#14b8a6",
      steps: ["Traveler posts request", "Sets destination + dates + budget", "Companies submit offers", "Traveler compares & accepts", "Booking confirmed", "Review after trip"],
    },
    {
      title: "Onboarding & Auth",
      color: "#64748b",
      steps: ["Register (email or Google)", "Pick 3+ favorite categories", "Choose country (globe/manual)", "Personalized feed", "Profile with avatar + bio"],
    },
    {
      title: "Place Contribution",
      color: "#eab308",
      steps: ["Click 'Publish place'", "Name + description + category", "Pin location on map", "Upload up to 5 photos", "Add tips + entry price", "Goes to moderation queue"],
    },
    {
      title: "Service Booking",
      color: "#06b6d4",
      steps: ["Find service near place", "See schedule + pricing", "Pick date + participants", "Confirm booking", "Receive notification", "Rate + review after"],
    },
  ];

  return (
    <div>
      <h4 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, marginBottom: "20px" }}>
        User Flows
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {flows.map((flow, fi) => (
          <motion.div
            key={flow.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: fi * 0.1 }}
            style={{
              padding: "16px 20px",
              borderRadius: "14px",
              backgroundColor: "#1e293b",
              border: `1px solid ${flow.color}25`,
            }}
          >
            <div style={{
              fontSize: "12px",
              fontWeight: 700,
              color: flow.color,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}>
              {flow.title}
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              flexWrap: "wrap",
            }}>
              {flow.steps.map((step, si) => (
                <div key={si} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    backgroundColor: si === 0 ? flow.color + "20" : "rgba(51,65,85,0.4)",
                    border: si === 0 ? `1px solid ${flow.color}40` : "1px solid rgba(51,65,85,0.6)",
                    color: si === 0 ? flow.color : "#cbd5e1",
                    fontSize: "12px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}>
                    {step}
                  </div>
                  {si < flow.steps.length - 1 && (
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M0 6h18m0 0l-4-4m4 4l-4 4" stroke={flow.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Unit Economics Summary ──
export function UnitEconomics() {
  const metrics = [
    { label: "Hosting Cost", value: "~$50/mo", sub: "Railway + Vercel + R2", color: "#ef4444" },
    { label: "Break-even", value: "10 users", sub: "Premium at $4.99/mo", color: "#f59e0b" },
    { label: "Target CAC", value: "$5-15", sub: "vs industry $78 median", color: "#34d399" },
    { label: "Premium LTV", value: "$30", sub: "at 6-month retention", color: "#6366f1" },
    { label: "Year 1 Target", value: "$18K ARR", sub: "250 premium + 10 companies", color: "#22d3ee" },
  ];

  return (
    <div>
      <h4 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>
        Unit Economics
      </h4>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "12px",
      }}>
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            style={{
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: "#1e293b",
              borderTop: `3px solid ${m.color}`,
              textAlign: "center",
            }}
          >
            <div style={{ color: m.color, fontSize: "20px", fontWeight: 700 }}>{m.value}</div>
            <div style={{ color: "#fff", fontSize: "12px", fontWeight: 600, marginTop: "4px" }}>{m.label}</div>
            <div style={{ color: "#64748b", fontSize: "11px", marginTop: "2px" }}>{m.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Feature Count Summary ──
export function FeatureCountChart() {
  const categories = [
    { label: "User Features", count: 25, color: "#f59e0b", items: "Place discovery, Chatbot, Trip planner, Budget tracker, Route optimizer, Share image generator, GPS recording, Group trips, Live tracking, World map, Gamification, Leaderboard, Chat rooms, Nearby, Trending, Follow users, Copy itineraries, Contribute photos, External media, Onboarding, Profile, Reactions, Comments, Smart search, Notifications" },
    { label: "Business Features", count: 7, color: "#22d3ee", items: "Company registration, Service publishing, Schedule management (one-time/weekly/monthly), Booking system, Tour request marketplace, Revenue dashboard, Commission tracking (15%/10%/5%)" },
    { label: "Admin Features", count: 10, color: "#a78bfa", items: "Place moderation queue, User management (roles/bans), Comment moderation, Category CRUD, Geography CRUD, Error logs viewer, Analytics dashboard, Hero banner config, App settings with OTP, Contributed photo moderation" },
    { label: "Platform", count: 8, color: "#34d399", items: "PWA (installable), i18n (ES/EN), Dark mode, SEO (5,500+ URLs), Auth (Email + Google OAuth), Notifications, Privacy/Terms/GDPR, Storybook (66 stories)" },
  ];

  return (
    <div>
      <h4 style={{ color: "#fff", fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>
        Platform Overview
      </h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            style={{
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: "#1e293b",
              borderLeft: `3px solid ${cat.color}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
              <span style={{ color: cat.color, fontSize: "24px", fontWeight: 800 }}>{cat.count}</span>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>{cat.label}</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "11px", margin: 0, lineHeight: 1.5 }}>{cat.items}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
