interface Props {
  youtubeId: string;
  title: string;
}

export function VideoEmbed({ youtubeId, title }: Props) {
  if (!youtubeId) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "256px",
          borderRadius: "12px",
          backgroundColor: "rgba(15,23,42,0.5)",
          border: "1px dashed #334155",
          color: "#64748b",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>🎬</div>
          <p style={{ fontSize: "14px" }}>Video coming soon</p>
          <p style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>
            Add the YouTube ID in projects.ts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
