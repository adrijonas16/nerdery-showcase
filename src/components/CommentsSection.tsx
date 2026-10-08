import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, User } from "lucide-react";

const IS_LOCAL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_URL = IS_LOCAL ? "http://localhost:3003/api/comments" : null;

interface Comment {
  id: number;
  project_id: string;
  name: string;
  comment: string;
  created_at: string;
}

interface Props {
  projectId: string;
  areaColor: string;
}

export function CommentsSection({ projectId, areaColor }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!API_URL) { setLoading(false); return; }
    setLoading(true);
    fetch(`${API_URL}/${encodeURIComponent(projectId)}`)
      .then((r) => r.json())
      .then(setComments)
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || !API_URL) return;

    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          name: name.trim(),
          comment: comment.trim(),
        }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev]);
        setComment("");
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "Z");
    return d.toLocaleDateString("es", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
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
      {/* Header */}
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
          <MessageCircle style={{ width: "20px", height: "20px" }} />
        </div>
        <h3
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "16px",
            margin: 0,
          }}
        >
          Feedback
        </h3>
        {comments.length > 0 && (
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
            {comments.length}
          </span>
        )}
      </div>

      <div style={{ padding: "24px" }}>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: comments.length > 0 ? "24px" : 0 }}
        >
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: areaColor + "20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <User
                style={{ width: "20px", height: "20px", color: areaColor }}
              />
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(51,65,85,0.8)",
                backgroundColor: "#0f172a",
                color: "#e2e8f0",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginLeft: "52px",
            }}
          >
            <textarea
              placeholder="Leave your comment or feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={3}
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(51,65,85,0.8)",
                backgroundColor: "#0f172a",
                color: "#e2e8f0",
                fontSize: "14px",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "12px",
            }}
          >
            <button
              type="submit"
              disabled={submitting || !name.trim() || !comment.trim()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                borderRadius: "10px",
                border: "none",
                backgroundColor:
                  submitting || !name.trim() || !comment.trim()
                    ? "#334155"
                    : areaColor,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                cursor:
                  submitting || !name.trim() || !comment.trim()
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  submitting || !name.trim() || !comment.trim() ? 0.5 : 1,
              }}
            >
              <Send style={{ width: "14px", height: "14px" }} />
              {submitting ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        {/* Comments list */}
        {loading ? (
          <p style={{ color: "#64748b", textAlign: "center", fontSize: "14px" }}>
            Loading comments...
          </p>
        ) : (
          <AnimatePresence>
            {comments.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "16px 0",
                  borderTop: "1px solid rgba(51,65,85,0.3)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#334155",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#94a3b8",
                  }}
                >
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      {c.name}
                    </span>
                    <span style={{ color: "#475569", fontSize: "12px" }}>
                      {formatDate(c.created_at)}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      margin: 0,
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    {c.comment}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
