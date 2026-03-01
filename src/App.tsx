// App.tsx
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MatrixProps {
  countdown: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  delay: number;
  dur: number;
  emoji: string;
}

// ─── MATRIX RAIN ──────────────────────────────────────────────────────────────
const CHARS =
  // Katakana complet
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  // Hiragana
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" +
  // Kanji amour / nature
  "愛恋心花夢星月光美永遠命絆魂幸福" +
  // Cyrillique
  "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ" +
  // Grec
  "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθ" +
  // Binaire + chiffres
  "0110100101000011001011010111" +
  // Symboles spéciaux
  "♥❤💗∞†‡§¶•◆◇○●□■△▲▽▼♦♠♣♪♫☆★" +
  // Latin étendu / caractères spéciaux
  "ÆØÅÐÞßæøåðþĦħŁłŊŋŒœŦŧ" +
  // Mots cachés dans la pluie
  "LOVE AMOUR COEUR MOI TOI";


function MatrixRain({ countdown }: MatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const fontSize = 15;
    const cols = Math.floor(W / fontSize);
    dropsRef.current = Array.from({ length: cols }, () => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = "rgba(20, 0, 12, 0.08)";
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < dropsRef.current.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = dropsRef.current[i] * fontSize;

        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ff69b4";
        ctx.fillStyle = "#ffb6c1";
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.fillText(char, x, y);

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#c2185b";
        ctx.font = `${fontSize - 1}px monospace`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fontSize);

        ctx.fillStyle = "#880e4f55";
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fontSize * 2);

        if (y > H && Math.random() > 0.975) dropsRef.current[i] = 0;
        dropsRef.current[i] += 0.5;
      }
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#14000c" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Courier+Prime&display=swap');
          @keyframes countPop {
            0% { transform: scale(0.2) rotate(-15deg); opacity: 0; }
            50% { transform: scale(1.25) rotate(5deg); opacity: 1; }
            75% { transform: scale(0.9) rotate(-2deg); }
            100% { transform: scale(1) rotate(0); opacity: 1; }
          }
          @keyframes glitchText {
            0%,100% { text-shadow: 0 0 40px #ff69b4, 0 0 80px #ff1493, 0 0 120px #ff69b4; }
            20% { text-shadow: -4px 0 #ff1493, 4px 0 #ffb6c1, 0 0 60px #ff69b4; }
            40% { text-shadow: 4px 0 #ff1493, -4px 0 #ffb6c1; }
          }
          @keyframes scanline {
            0% { top: -5%; }
            100% { top: 105%; }
          }
          @keyframes fadeLabel {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 0.9; transform: translateY(0); }
          }
        `}</style>

        {/* Scanline */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #ff69b480, #ff69b4, #ff69b480, transparent)",
            animation: "scanline 2s linear infinite",
          }}
        />

        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            color: "#ff69b4",
            fontSize: "clamp(0.65rem, 1.5vw, 0.9rem)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
            opacity: 0,
            animation: "fadeLabel 0.5s ease-out 0.2s forwards",
            textShadow: "0 0 10px #ff69b4",
          }}
        >
          ⟨ Chargement de l'amour ⟩
        </div>

        <div
          key={countdown}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(6rem, 30vw, 18rem)",
            fontWeight: 900,
            color: "#ff1493",
            lineHeight: 1,
            animation: "countPop 0.7s cubic-bezier(.17,.67,.48,1.3) forwards, glitchText 0.6s linear infinite",
          }}
        >
          {countdown}
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "2rem" }}>
          {[3, 2, 1].map((n) => (
            <span
              key={n}
              style={{
                fontSize: "1.4rem",
                opacity: countdown <= n ? 1 : 0.2,
                transition: "opacity 0.3s",
                filter: countdown <= n ? "drop-shadow(0 0 8px #ff69b4)" : "none",
              }}
            >
              💗
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── LOVE REVEAL ──────────────────────────────────────────────────────────────
function LoveReveal() {
  const [opened, setOpened] = useState<boolean>(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const idRef = useRef<number>(0);

  const spawnHearts = useCallback(() => {
    const emojis = ["💗", "💕", "💖", "🌸", "💝"];
    const batch: FloatingHeart[] = Array.from({ length: 25 }, () => ({
      id: idRef.current++,
      x: Math.random() * 100,
      size: Math.random() * 28 + 12,
      delay: Math.random() * 1.2,
      dur: Math.random() * 2 + 2.5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setFloatingHearts((prev) => [...prev, ...batch]);
    setTimeout(
      () => setFloatingHearts((prev) => prev.filter((h) => !batch.find((b) => b.id === h.id))),
      5000
    );
  }, []);

  const handleOpen = () => {
    setOpened(true);
    spawnHearts();
    setTimeout(spawnHearts, 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 0%, #3d0030 0%, #1a0010 60%, #0d0008 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:ital@1&display=swap');
        @keyframes riseHeart {
          0% { transform: translateY(0) scale(0.5); opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14% { transform: scale(1.35); }
          28% { transform: scale(1); }
          42% { transform: scale(1.2); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.12) rotate(3deg); }
          80% { transform: scale(0.95) rotate(-1deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes floatBear {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-18px) rotate(4deg); }
        }
        @keyframes floatBear2 {
          0%,100% { transform: translateY(0) rotate(4deg) scaleX(-1); }
          50% { transform: translateY(-14px) rotate(-4deg) scaleX(-1); }
        }
        @keyframes glow {
          0%,100% { text-shadow: 0 0 20px #ff69b4, 0 0 40px #ff1493; }
          50% { text-shadow: 0 0 40px #ff69b4, 0 0 80px #ff1493, 0 0 120px #ff69b4; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerCard {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes giftPulse {
          0%,100% { transform: scale(1) rotate(-2deg); filter: drop-shadow(0 0 25px #ff69b4); }
          50% { transform: scale(1.08) rotate(2deg); filter: drop-shadow(0 0 50px #ff1493); }
        }
      `}</style>

      {/* Floating hearts */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "fixed",
            left: `${h.x}%`,
            bottom: "-5%",
            fontSize: `${h.size}px`,
            animation: `riseHeart ${h.dur}s ease-out ${h.delay}s forwards`,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {h.emoji}
        </div>
      ))}

      {/* Ambient glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {(["#ff1493", "#c2185b", "#ff69b4"] as string[]).map((color, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${["-10%", "80%", "40%"][i]}`,
              top: `${["20%", "60%", "-10%"][i]}`,
              width: "40vw",
              height: "40vw",
              background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
              borderRadius: "50%",
              animation: `heartbeat ${3 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem", maxWidth: 650 }}>
        {!opened ? (
          <>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                color: "#ffb6c1",
                marginBottom: "2.5rem",
                animation: "glow 2s infinite, slideUp 0.8s ease-out",
              }}
            >
              ✨ Une surprise t'attend... ✨
            </div>

            <div
              onClick={handleOpen}
              style={{
                fontSize: "clamp(5rem, 20vw, 130px)",
                cursor: "pointer",
                animation: "giftPulse 2s ease-in-out infinite",
                display: "inline-block",
                userSelect: "none",
              }}
            >
              🎁
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                fontFamily: "'Cormorant Garamond', serif",
                color: "#ff69b4",
                fontSize: "1.1rem",
                fontStyle: "italic",
                animation: "glow 1.5s infinite",
              }}
            >
              Appuie pour ouvrir ton cadeau 💝
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                fontWeight: 700,
                color: "#ff69b4",
                animation: "glow 2s infinite, slideUp 0.7s ease-out",
                lineHeight: 1.25,
                marginBottom: "0.4rem",
              }}
            >
              Je t'aime de tout mon cœur 💕
            </div>

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#ffb6c1",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                fontStyle: "italic",
                marginBottom: "2.5rem",
                animation: "slideUp 0.7s ease-out 0.2s both",
              }}
            >
              Tu es ma plus belle surprise...
            </div>

            {/* Teddies */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(0.5rem, 3vw, 2rem)",
                marginBottom: "2rem",
                animation: "bounceIn 0.9s cubic-bezier(.17,.67,.48,1.3) 0.3s both",
              }}
            >
              <div style={{ fontSize: "clamp(4rem, 15vw, 90px)", animation: "floatBear 3.5s ease-in-out infinite" }}>🧸</div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}>
                {["💗", "💕", "💗"].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: `${28 - i * 5}px`,
                      animation: `heartbeat ${1.4 + i * 0.35}s ease-in-out ${i * 0.15}s infinite`,
                      display: "block",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div style={{ fontSize: "clamp(4rem, 15vw, 90px)", animation: "floatBear2 3s ease-in-out 0.4s infinite" }}>🧸</div>
            </div>

            {/* Message card */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(255,105,180,0.12), rgba(194,24,91,0.08))",
                border: "1px solid rgba(255,105,180,0.25)",
                borderRadius: "2rem",
                padding: "clamp(1rem, 4vw, 2rem)",
                backdropFilter: "blur(20px)",
                animation: "slideUp 0.8s ease-out 0.5s both",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💌</div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#ffb6c1",
                  lineHeight: 1.9,
                  fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                "Tu es mon soleil rose,
                <br />
                ma mélodie douce et sincère,
                <br />
                ma raison de sourire chaque matin...
                <br />
                Ce petit code, c'est tout mon amour pour toi. 💝"
              </p>
            </div>

            <div
              style={{
                marginTop: "1.8rem",
                fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
                letterSpacing: "0.15em",
                animation: "slideUp 0.8s ease-out 0.8s both",
              }}
            >
              🌸 💗 🌹 💕 🌸 💗 🌹
            </div>

            <button
              onClick={spawnHearts}
              style={{
                marginTop: "1.5rem",
                background: "linear-gradient(135deg, #ff69b4, #c2185b)",
                border: "none",
                color: "white",
                padding: "0.85rem 2.2rem",
                borderRadius: "3rem",
                fontSize: "1rem",
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                boxShadow: "0 4px 25px rgba(255,105,180,0.45)",
                transition: "transform 0.2s, box-shadow 0.2s",
                animation: "slideUp 0.8s ease-out 1s both",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.boxShadow = "0 8px 35px rgba(255,105,180,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 25px rgba(255,105,180,0.45)";
              }}
            >
              💗 Encore des cœurs !
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<"matrix" | "reveal">("matrix");
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    if (phase !== "matrix") return;
    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(0);
        setTimeout(() => setPhase("reveal"), 900);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [phase]);

  if (phase === "matrix") return <MatrixRain countdown={countdown} />;
  return <LoveReveal />;
}