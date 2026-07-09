import React, { useState, useEffect } from "react";
import { ActiveTab } from "../types";
import { Anchor, Compass, Clock, Radio, Monitor, Ship, Sparkles, Waves } from "lucide-react";
import { LunarDate } from "vietnamese-lunar-calendar";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [crtEnabled, setCrtEnabled] = useState(false); // Default CRT off for gorgeous clean modern rendering, but toggleable!
  const [timeStr, setTimeStr] = useState("");
  const [isWaveRolling, setIsWaveRolling] = useState(true);

  const today = new Date();
  let lunarDateStr = "";
  try {
    const lunar = new LunarDate(today);
    lunarDateStr = `${lunar.getDate()}/${lunar.getMonth()} ÂL`;
  } catch (e) {
    console.warn("Failed to compute compact lunar date", e);
  }

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
    <div className="min-h-screen bg-[#1E1A17] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 transition-all duration-300">
      {/* Lacquer Red Border Frame Wrapper - framing the app like a premium museum kiosk */}
      <div 
        className={`w-full max-w-6xl bg-[#F4EFE6] border-8 border-[#8B1E0F] shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative flex flex-col min-h-[92vh] rounded-3xl overflow-hidden ${
          crtEnabled ? "crt-screen" : ""
        }`}
      >
        {/* Top Header / Arcade Marquee */}
        <header className="bg-[#8B1E0F] border-b-4 border-[#EAA812] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-[#EAA812] border-2 border-[#8B1E0F] p-2.5 rounded-xl shadow-md animate-bounce-slow shrink-0">
              <Ship className="w-7 h-7 text-[#8B1E0F]" />
            </div>
            
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1.5">
                <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                <span className="font-mono text-[9px] text-[#EAA812] tracking-widest uppercase font-bold">
                  Sài Gòn - Kênh Tẻ
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-[#F4EFE6] tracking-tight font-black flex items-center gap-2">
                BỒNG BỀNH <span className="text-[#EAA812] font-normal italic">Gallery</span>
              </h1>
            </div>
          </div>

          {/* Animated floating boat and status bar */}
          <div className="hidden lg:flex items-center gap-2 bg-black/25 border border-white/10 p-2 px-4 rounded-full">
            <span className="text-white/60 font-mono text-[10px] tracking-wide">THỦY TRIỀU:</span>
            <span className="font-mono text-[#EAA812] text-xs animate-pulse font-semibold">
              {isWaveRolling ? "⛵ ~ 🌊 ~ ⛵ ~ 🌊 ~ ⛵" : "⛵ ~~~~~~~ ⛵"}
            </span>
          </div>

          {/* System status tools */}
          <div className="flex items-center gap-3">
            {/* Shrunken Tide/Calendar Date Button */}
            <button
              onClick={() => setActiveTab("tide")}
              className={`flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border text-xs font-mono tracking-wide transition-all shadow-inner cursor-pointer hover:bg-black/45 ${
                activeTab === "tide"
                  ? "border-[#EAA812] text-[#EAA812]"
                  : "border-white/15 text-white/90 hover:text-white"
              }`}
              title="Xem Lịch Âm & Thủy trình Sông Sài Gòn chi tiết"
            >
              <Waves className="w-3.5 h-3.5 text-[#EAA812] animate-pulse shrink-0" />
              <span className="hidden sm:inline">
                {today.getDate()}/{today.getMonth() + 1} {lunarDateStr ? `(${lunarDateStr})` : ""}
              </span>
              <span className="sm:hidden text-[10px]">
                {today.getDate()}/{today.getMonth() + 1}
              </span>
            </button>

            {/* Retro live clock */}
            <div className="bg-black/30 px-3.5 py-1.5 rounded-lg border border-white/15 text-[#EAA812] font-mono text-xs tracking-wider flex items-center gap-2 shadow-inner">
              <Clock className="w-3.5 h-3.5 text-[#EAA812]" />
              {timeStr || "00:00:00"}
            </div>

            {/* CRT monitor filter switch */}
            <button
              onClick={() => setCrtEnabled(!crtEnabled)}
              title="Bật/Tắt hiệu ứng màn hình CRT cổ điển"
              className={`p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer shadow ${
                crtEnabled 
                  ? "bg-[#EAA812] text-black border-[#EAA812]" 
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Custom Navigation Bar - Retro-Modern styling */}
        <nav className="bg-[#2C2C2C] border-b border-white/10 p-2.5 flex flex-wrap items-center justify-center gap-2 relative z-10">
          {[
            { id: "home", label: "Trang Chủ", icon: "🏠" },
            { id: "gallery", label: "Phòng Tranh", icon: "🖼️" },
            { id: "history", label: "Sử & Văn Hóa", icon: "📜" },
            { id: "services", label: "Trải Nghiệm", icon: "🎨" },
            { id: "tide", label: "Thủy trình & Lịch", icon: "🌊" },
            { id: "admin", label: "Quản Trị", icon: "⚙️" }
          ].map((item) => {
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wide font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#8B1E0F] text-white shadow-lg border border-[#EAA812]/40 scale-105"
                    : "bg-[#2C2C2C] text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label.toUpperCase()}</span>
              </button>
            );
          })}
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 relative z-10 overflow-y-auto bg-[#F4EFE6] text-[#2C2C2C]">
          {children}
        </main>

        {/* Wooden Frame Footer */}
        <footer className="bg-[#2C2C2C] text-[#F4EFE6]/70 border-t-2 border-[#8B1E0F] p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono relative z-10">
          <div className="flex items-center gap-2 text-center md:text-left">
            <Anchor className="w-4 h-4 text-[#EAA812]" />
            <span>
              Bồng Bềnh Art Gallery © {new Date().getFullYear()} — Triển lãm di động trên sông Sài Gòn
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Radio 
              onClick={() => setIsWaveRolling(!isWaveRolling)}
              className={`w-4 h-4 cursor-pointer hover:text-[#EAA812] transition-colors ${isWaveRolling ? "animate-pulse text-emerald-400" : "text-white/40"}`} 
              title="Bật/Tắt nhịp sóng bập bềnh"
            />
            <span className="text-[10px] text-white/50">
              Sáng lập: <strong className="text-[#EAA812] font-semibold">Họa sĩ Kinh Mai Thuyết</strong> (0989 222 890)
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
