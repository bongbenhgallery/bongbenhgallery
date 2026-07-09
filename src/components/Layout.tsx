import React, { useState, useEffect } from "react";
import { ActiveTab } from "../types";
import { Anchor, Compass, Clock, Radio, Monitor, Ship, Sparkles } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [timeStr, setTimeStr] = useState("");
  const [isWaveRolling, setIsWaveRolling] = useState(true);

  // Update retro clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen bg-retro-dark flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 transition-all duration-300`}>
      {/* Wooden Frame Wrapper - framing the app like a retro terminal or museum exhibit kiosk */}
      <div 
        className={`w-full max-w-6xl bg-retro-paper border-8 border-retro-wood shadow-[0_0_40px_rgba(0,0,0,0.8)] relative flex flex-col min-h-[90vh] ${
          crtEnabled ? "crt-screen" : ""
        }`}
      >
        {/* Wood grain bezel reflection line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-30 pointer-events-none"></div>

        {/* Top Header / Arcade Marquee */}
        <header className="bg-retro-wood border-b-8 border-retro-dark p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-retro-amber border-4 border-retro-dark p-2 animate-bounce-slow">
              <Ship className="w-8 h-8 text-retro-dark" />
            </div>
            
            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-retro-green rounded-full animate-ping"></span>
                <span className="font-pixel text-[9px] text-retro-sky tracking-widest uppercase">
                  Sài Gòn - Kênh Tẻ
                </span>
              </div>
              <h1 className="font-retro text-4xl text-retro-paper tracking-wider uppercase leading-none retro-shadow-amber flex items-center gap-2">
                BỒNG BỀNH <span className="text-retro-amber">GALLERY</span>
              </h1>
            </div>
          </div>

          {/* Animated floating boat and status bar */}
          <div className="hidden lg:flex items-center gap-1 bg-retro-dark/50 border-2 border-retro-dark/80 p-1.5 px-3 rounded-xs">
            <span className="text-retro-sky font-pixel text-[9px]">HAI TRINH:</span>
            <span className="font-mono text-retro-amber text-xs animate-pulse font-semibold">
              {isWaveRolling ? "⛵ ~ 🌊 ~ ⛵ ~ 🌊 ~ ⛵" : "⛵ ~~~~~~~ ⛵"}
            </span>
          </div>

          {/* System status tools */}
          <div className="flex items-center gap-3">
            {/* Retro live clock */}
            <div className="bg-retro-dark px-3 py-1 border-2 border-retro-amber text-retro-amber font-mono text-sm tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4 text-retro-amber" />
              {timeStr || "00:00:00"}
            </div>

            {/* CRT monitor filter switch */}
            <button
              onClick={() => setCrtEnabled(!crtEnabled)}
              title="Bật/Tắt hiệu ứng màn hình CRT cổ điển"
              className={`p-2 border-2 border-retro-dark flex items-center justify-center transition-colors cursor-pointer ${
                crtEnabled 
                  ? "bg-retro-amber text-retro-dark" 
                  : "bg-retro-beige text-retro-dark hover:bg-retro-beige/80"
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Custom Navigation Bar - fully responsive pixel styled links */}
        <nav className="bg-retro-beige border-b-4 border-retro-dark p-3 flex flex-wrap items-center justify-center gap-2 md:gap-4 relative z-10">
          <button
            onClick={() => setActiveTab("home")}
            className={`pixel-btn ${activeTab === "home" ? "pixel-btn-amber" : ""}`}
          >
            🏠 TRANG CHỦ
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`pixel-btn ${activeTab === "gallery" ? "pixel-btn-amber" : ""}`}
          >
            🖼️ PHÒNG TRANH
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pixel-btn ${activeTab === "history" ? "pixel-btn-amber" : ""}`}
          >
            📜 SỬ & VĂN HÓA
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`pixel-btn ${activeTab === "services" ? "pixel-btn-amber" : ""}`}
          >
            🎨 TRẢI NGHIỆM
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`pixel-btn ${activeTab === "admin" ? "pixel-btn-amber" : ""}`}
          >
            ⚙️ QUẢN TRỊ
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 relative z-10 overflow-y-auto">
          {children}
        </main>

        {/* Wooden Frame Footer */}
        <footer className="bg-retro-wood text-retro-paper border-t-8 border-retro-dark p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono relative z-10">
          <div className="flex items-center gap-2 text-center md:text-left">
            <Anchor className="w-4 h-4 text-retro-amber" />
            <span>
              Bồng Bềnh Art Gallery © {new Date().getFullYear()} — Tọa lạc độc đáo tại Kênh Tẻ, Sài Gòn
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Radio 
              onClick={() => setIsWaveRolling(!isWaveRolling)}
              className={`w-4 h-4 cursor-pointer hover:text-retro-amber transition-colors ${isWaveRolling ? "animate-pulse text-retro-green" : "text-retro-paper/50"}`} 
              title="Bật/Tắt nhịp sóng bập bềnh"
            />
            <span className="text-[10px] text-retro-sky">
              Chủ Sáng Lập: <strong className="text-retro-amber font-semibold">Họa sĩ Kinh Mai Thuyết</strong> (0989 222 890)
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
