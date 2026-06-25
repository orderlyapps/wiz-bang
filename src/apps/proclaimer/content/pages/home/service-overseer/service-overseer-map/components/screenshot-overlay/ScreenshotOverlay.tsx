type Props = {
  name: string;
  details?: string | null;
};

export function ScreenshotOverlay({ name, details }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 10,
        background: "white",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        maxWidth: 240,
        pointerEvents: "none",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", lineHeight: 1.3 }}>{name}</div>
      {details && (
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3, lineHeight: 1.4 }}>
          {details}
        </div>
      )}
    </div>
  );
}
