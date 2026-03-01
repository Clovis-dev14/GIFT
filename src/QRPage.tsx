// QRPage.tsx
// ⚠️ REMPLACE l'URL ci-dessous par ton lien Vercel/Netlify
import { QRCodeSVG } from "qrcode.react";

const DESTINATION_URL = "https://cadeaudems.netlify.app/surprise";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SizeProps {
  size: number;
}

// ─── Heart Path SVG ───────────────────────────────────────────────────────────
function HeartPath({ size }: SizeProps) {
  const cx = size / 2;
  const cy = size / 2 + size * 0.05;
  const r = size * 0.46;

  const points = Array.from({ length: 200 }, (_, i) => {
    const t = (i / 199) * 2 * Math.PI;
    const x = cx + r * Math.pow(Math.sin(t), 3);
    const y =
      cy -
      (r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))) /
        16;
    return `${x},${y}`;
  });
  const d = `M ${points.join(" L ")} Z`;

  return (
    <>
      <path d={d} fill="none" stroke="#ff69b4" strokeWidth="10" opacity="0.3" filter="url(#glow)" />
      <path d={d} fill="none" stroke="url(#heartGrad)" strokeWidth="5" strokeLinejoin="round" filter="url(#glow)" />
      <path d={d} fill="none" stroke="#ffb6c1" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
    </>
  );
}

// ─── Heart Frame ──────────────────────────────────────────────────────────────
function HeartFrame({ size }: SizeProps) {
  const pad = 30;
  const qrSize = size - pad * 2;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2, pointerEvents: "none" }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff85c2" />
            <stop offset="50%" stopColor="#ff1493" />
            <stop offset="100%" stopColor="#c2185b" />
          </linearGradient>
        </defs>

        <HeartPath size={size} />

        {[45, 135, 225, 315].map((angle, i) => {
          const r = size * 0.48;
          const cx2 = size / 2 + r * Math.cos((angle * Math.PI) / 180);
          const cy2 = size / 2 + r * Math.sin((angle * Math.PI) / 180) + size * 0.05;
          return (
            <text
              key={i}
              x={cx2}
              y={cy2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
            >
              💗
            </text>
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          top: pad,
          left: pad,
          zIndex: 1,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 0 4px #ff69b4, 0 0 30px rgba(255,105,180,0.4)",
        }}
      >
        <QRCodeSVG
          value={DESTINATION_URL}
          size={qrSize}
          bgColor="#ffffff"
          fgColor="#000000"
          level="M"
          includeMargin={true}
        />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function QRPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 0%, #3d0030 0%, #1a0010 55%, #0d0008 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        padding: "2rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:ital@1&display=swap');
        @keyframes floatUp {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0%,100% { opacity: 0.7; }
          50% { opacity: 1; text-shadow: 0 0 30px #ff69b4, 0 0 60px #ff1493; }
        }
      `}</style>

      {/* Ambient hearts */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${5 + ((i * 6.2) % 90)}%`,
              top: `${10 + ((i * 7.3) % 80)}%`,
              fontSize: `${14 + (i % 4) * 8}px`,
              opacity: 0.08 + (i % 5) * 0.04,
              animation: `floatUp ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          >
            💗
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
          color: "#ff69b4",
          marginBottom: "0.6rem",
          textAlign: "center",
          animation: "shimmer 2.5s infinite",
          letterSpacing: "0.04em",
        }}
      >
        ✨ Pour toi, mon amour ✨
      </div>

      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#ffb6c1",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          fontStyle: "italic",
          marginBottom: "2.5rem",
          opacity: 0.75,
          textAlign: "center",
        }}
      >
        Scanne ce cœur pour découvrir ta surprise 💝
      </div>

      <div style={{ animation: "floatUp 3s ease-in-out infinite" }}>
        <HeartFrame size={320} />
      </div>

      <div
        style={{
          marginTop: "2rem",
          fontFamily: "'Cormorant Garamond', serif",
          color: "#c2185b",
          fontSize: "0.85rem",
          fontStyle: "italic",
          opacity: 0.6,
          textAlign: "center",
          animation: "shimmer 2s infinite",
        }}
      >
        📱 Ouvre l'appareil photo et vise ce cœur...
      </div>
    </div>
  );
}
