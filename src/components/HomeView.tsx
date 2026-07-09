import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  User, 
  Compass, 
  Anchor, 
  BookOpen, 
  Music, 
  Sparkles, 
  Volume2, 
  ArrowRight, 
  Clock, 
  Bookmark, 
  Calendar, 
  History 
} from "lucide-react";

// Pentatonic Traditional Vietnamese Scale Notes (Cai Luong / Vong Co mood)
const TRADITIONAL_NOTES = [
  { name: "Hò (Đô)", freq: 261.63, meaning: "Sự bình yên, trầm tĩnh" },
  { name: "Xự (Rê)", freq: 293.66, meaning: "Sự chuyển động, kỳ ảo" },
  { name: "Xang (Fa)", freq: 349.23, meaning: "Nỗi nhớ quê hương da diết" },
  { name: "Xê (Sol)", freq: 392.00, meaning: "Hùng tráng, tươi sáng" },
  { name: "Cống (La)", freq: 440.00, meaning: "Trầm lắng, tao nhã" }
];

interface TimelineEra {
  period: string;
  title: string;
  description: string;
  highlight: string;
}

const TIMELINE_ERAS: TimelineEra[] = [
  {
    period: "Thế kỷ XI - XIV (Triều Lý - Trần)",
    title: "Thời Kỳ Hưng Thịnh Phật Giáo & Điêu Khắc Đại Việt",
    description: "Sự nở rộ của hoa văn rồng uốn lượn thướt tha, tượng Phật đồng đen, hoa sen cách điệu và gốm men ngọc tinh xảo phản ánh tâm hồn tự chủ, phóng khoáng.",
    highlight: "Gốm men ngọc độc bản"
  },
  {
    period: "Thế kỷ XVIII - XIX (Triều Nguyễn cổ kính)",
    title: "Nhã Nhạc Cung Đình & Áng Thơ Lục Bát Truyện Kiều",
    description: "Kinh đô Huế cổ kính là cái nôi của nghệ thuật cung đình quý phái, song song với kiệt tác văn học chữ Nôm mô tả nhân sinh trôi nổi bồng bềnh.",
    highlight: "Bản khắc gỗ Đoạn Trường Tân Thanh"
  },
  {
    period: "Thập niên 1950 - 1980 (Sài Gòn xưa hoài niệm)",
    title: "Bảng Hiệu Vẽ Tay 'Nét Chữ Xưa' & Tân Nhạc Sông Nước",
    description: "Những nét chữ quảng cáo rực rỡ, đậm tinh thần Tây phương giao thoa bản địa cùng những gánh hát Cải Lương dọc theo Bến Bình Đông và Kênh Tẻ.",
    highlight: "Mỹ thuật đại chúng Sài Gòn"
  },
  {
    period: "Đương Đại (Nghệ thuật Bồng Bềnh)",
    title: "Hội Họa Sơn Mài Kỹ Thuật Số & Triển Lãm Trên Sông",
    description: "Phục hưng di sản văn hóa thông qua nghệ thuật pixel kết hợp sơn dầu trên chiếc du thuyền gỗ The Coffee Ship trôi lững lờ giữa Kênh Tẻ lộng gió.",
    highlight: "Sơn mài số (Digital Lacquerware)"
  }
];

export default function HomeView() {
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<number>(3); // Default to current era

  // Web Audio Synth for Pentatonic Notes
  const playTraditionalSound = (freq: number, name: string) => {
    try {
      setPlayingKey(name);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      // Traditional Vietnamese string instruments have a bright, nasal timbre, simulated with "sawtooth" or high-pass triangle
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      // Add subtle vibrato (typical in Vietnamese music)
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.value = 6; // 6Hz vibrato
      lfoGain.gain.value = 5; // Vibrato depth
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      // Sound envelope
      gain.gain.setValueAtTime(0.6, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      lfo.start();
      osc.start();
      
      osc.stop(audioCtx.currentTime + 1.6);
      lfo.stop(audioCtx.currentTime + 1.6);
      
      setTimeout(() => {
        setPlayingKey(null);
      }, 1500);
    } catch (e) {
      console.warn("Audio Context setup not supported or user gesture required.", e);
      setPlayingKey(null);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn max-w-7xl mx-auto">
      
      {/* 1. HERO SECTION: Massive bold typography with floating heritage piece */}
      <div className="relative bg-mat-cream mat-card p-8 md:p-16 overflow-hidden flex flex-col lg:flex-row items-center gap-10">
        {/* Background Decorative Pattern (Vietnamese Dong Son Bronze Drum concept) */}
        <div className="absolute -left-16 -top-16 w-96 h-96 border-4 border-mat-crimson/5 rounded-full pointer-events-none flex items-center justify-center">
          <div className="w-80 h-80 border-4 border-dashed border-mat-crimson/5 rounded-full flex items-center justify-center">
            <div className="w-48 h-48 border border-mat-crimson/5 rounded-full" />
          </div>
        </div>

        <div className="flex-1 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-mat-crimson text-white px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 animate-spin-slow text-mat-ochre" /> BỔNG BỀNH GALLERY • DI SẢN PHỤC HƯNG
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl text-mat-crimson font-black tracking-tight leading-tight">
            Nơi Hồn Sử Việt <br />
            <span className="text-mat-ochre">Trôi Lững Lờ</span> Trên Sông
          </h1>
          
          <p className="font-sans text-sm md:text-base text-mat-charcoal/85 max-w-xl leading-relaxed">
            Chúng tôi tái lập mối giao cảm sâu sắc giữa mỹ thuật đương đại, nghệ thuật pixel hoài cổ và di sản lịch sử ngàn năm của dân tộc. Neo đậu lãng mạn trên dòng Kênh Tẻ, Bồng Bềnh mở lối hành trình đi tìm vẻ đẹp cổ kính trong cuộc sống hiện đại.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-mat-charcoal/70 bg-white/60 px-3 py-1.5 rounded-lg border border-mat-charcoal/10">
              <Calendar className="w-3.5 h-3.5 text-mat-crimson" /> Mở cửa mỗi ngày từ 08:00 - 22:00
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-mat-charcoal/70 bg-white/60 px-3 py-1.5 rounded-lg border border-mat-charcoal/10">
              <MapPin className="w-3.5 h-3.5 text-mat-crimson" /> Sông Kênh Tẻ, Quận 7, TP. HCM
            </div>
          </div>
        </div>

        {/* Floating Masterpiece Card */}
        <div className="w-full lg:w-[380px] shrink-0 relative z-10">
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-mat-crimson/15 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-mat-charcoal">
              <img 
                src="/src/assets/images/kieu_pixel_art_1783592474719.jpg" 
                alt="Kiều Ở Lầu Ngưng Bích" 
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-mat-ochre text-white text-[10px] font-mono px-2 py-0.5 rounded-md uppercase font-bold tracking-wider">
                Tuyệt Phẩm Di Sản
              </div>
            </div>
            
            <div className="mt-4 space-y-1">
              <span className="text-[10px] font-mono text-mat-crimson tracking-wider uppercase font-bold block">
                #01 • TRANH SƠN MÀI SỐ
              </span>
              <h3 className="font-serif font-bold text-lg text-mat-charcoal">
                Kiều Ở Lầu Ngưng Bích
              </h3>
              <p className="font-sans text-xs text-mat-charcoal/70 leading-relaxed">
                Tâm tư bồng bềnh, dập dềnh sóng nước của nàng Kiều được thể hiện tinh tế qua các mảng khối pixel gỗ sơn dầu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE GRID OF TIME (Bento Box Layout) */}
      <div className="space-y-4">
        <div className="text-center md:text-left space-y-1">
          <span className="font-mono text-xs text-mat-crimson tracking-wider font-bold uppercase block">
            MỸ THUẬT & KHÔNG GIAN
          </span>
          <h2 className="font-serif text-3xl text-mat-charcoal font-bold tracking-tight">
            Hộp Ký Ức "Bento" Di Sản
          </h2>
          <p className="font-sans text-sm text-mat-charcoal/70 max-w-2xl">
            Sự bất đối xứng đầy tính hiện đại kết hợp với những mảng màu, chất liệu và thanh âm mang hơi thở cổ phong.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Đông Hồ Painting (Large Column) */}
          <div className="md:col-span-7 bg-white mat-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-mat-crimson text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Phục dựng họa tiết dân gian
              </div>
              <h3 className="font-serif text-2xl font-bold text-mat-charcoal leading-tight">
                Tranh Đông Hồ & Sức Sống Kỹ Thuật Số
              </h3>
              <p className="font-sans text-sm text-mat-charcoal/80 leading-relaxed">
                Nghệ thuật Đông Hồ nguyên bản sử dụng giấy điệp óng ánh từ vỏ sò, màu tự nhiên tự chế từ lá tre, sỏi đá. Đội ngũ Bồng Bềnh kết nối nét thô ráp mộc mạc ấy với kết cấu điểm ảnh (pixel), mở ra cái nhìn mới mẻ cho giới trẻ về nghệ thuật dân tộc xưa.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-mat-cream p-3 rounded-lg text-center border border-mat-crimson/10">
                <span className="block font-serif font-bold text-mat-crimson text-lg">Điệp</span>
                <span className="text-[10px] font-sans text-mat-charcoal/60">Giấy nền óng ánh</span>
              </div>
              <div className="bg-mat-cream p-3 rounded-lg text-center border border-mat-crimson/10">
                <span className="block font-serif font-bold text-mat-crimson text-lg">Hòe</span>
                <span className="text-[10px] font-sans text-mat-charcoal/60">Màu vàng ấm áp</span>
              </div>
              <div className="bg-mat-cream p-3 rounded-lg text-center border border-mat-crimson/10">
                <span className="block font-serif font-bold text-mat-crimson text-lg">Pixel</span>
                <span className="text-[10px] font-sans text-mat-charcoal/60">Tân cổ giao duyên</span>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Vọng Cổ Soundboard (Vertical Column) */}
          <div className="md:col-span-5 bg-mat-charcoal text-mat-cream mat-card p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-8 translate-y-8">
              <Music className="w-48 h-48" />
            </div>

            <div className="space-y-2 relative z-10">
              <span className="bg-mat-ochre/25 text-mat-ochre px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase inline-block">
                Tương tác âm thanh
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                Cung Điệu Ngũ Âm Cải Lương
              </h3>
              <p className="font-sans text-xs text-mat-cream/80 leading-relaxed">
                Hãy nhấn vào phím gảy cung nhạc để cảm nhận âm vọng ngân rung tao nhã, mô tả nỗi sầu bồng bềnh bên bờ Kênh Tẻ cổ xưa:
              </p>
            </div>

            <div className="space-y-2 relative z-10">
              <div className="grid grid-cols-5 gap-1.5">
                {TRADITIONAL_NOTES.map((note) => {
                  const isPlaying = playingKey === note.name;
                  return (
                    <button
                      key={note.name}
                      onClick={() => playTraditionalSound(note.freq, note.name)}
                      className={`py-3.5 rounded-lg font-mono text-center transition-all cursor-pointer border ${
                        isPlaying 
                          ? "bg-mat-ochre text-mat-charcoal border-mat-ochre font-bold scale-95" 
                          : "bg-mat-charcoal/60 hover:bg-mat-ochre/20 text-white border-white/20"
                      }`}
                    >
                      <div className="text-xs">{note.name.split(" ")[0]}</div>
                      <div className="text-[9px] opacity-60 font-sans">{note.name.split(" ")[1]}</div>
                    </button>
                  );
                })}
              </div>

              {playingKey && (
                <div className="text-center bg-mat-ochre/10 py-1 rounded text-xs text-mat-ochre font-mono animate-pulse">
                  🔊 Đang gảy phím: {playingKey}
                </div>
              )}
            </div>

            <div className="text-[10px] text-mat-cream/50 italic font-sans">
              "Khúc vọng cổ ngân vang như tiếng mạn thuyền đập nước mộc mạc."
            </div>
          </div>

          {/* Card 3: Nét Chữ Xưa (Medium Column) */}
          <div className="md:col-span-5 bg-mat-cream mat-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-mat-crimson text-xs font-mono font-bold uppercase block">
                #CHỮ-KÝ-ỨC
              </span>
              <h3 className="font-serif text-xl font-bold text-mat-charcoal leading-tight">
                Nét Chữ Xưa Sài Gòn
              </h3>
              <p className="font-sans text-xs md:text-sm text-mat-charcoal/80 leading-relaxed">
                Những nét cọ thô mộc, góc uốn lượn bất đối xứng của phông chữ vẽ tay quảng cáo thập niên 60-70. Đây là tiếng vọng của tinh thần thương cảng sầm uất, giản dị mà thanh lịch từng hiện diện khắp Quận 4 và Quận 7 dọc Kênh Tẻ xưa kia.
              </p>
            </div>

            <div className="border-t border-mat-crimson/15 pt-3">
              <span className="font-serif text-lg text-mat-crimson italic font-bold block text-center tracking-wide">
                "Thưởng Tranh Gió Sông - Trầm Ngâm Điệu Cổ"
              </span>
            </div>
          </div>

          {/* Card 4: Historical Place & Tea Ship (Large Column) */}
          <div className="md:col-span-7 bg-white mat-card p-6 flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-3 flex-1">
                <span className="bg-mat-jade/10 text-mat-jade px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase inline-block">
                  CÀ PHÊ & HỘI HỌA DI ĐỘNG
                </span>
                <h3 className="font-serif text-2xl font-bold text-mat-charcoal">
                  Bến Thuyền Gỗ Kênh Tẻ
                </h3>
                <p className="font-sans text-xs md:text-sm text-mat-charcoal/80 leading-relaxed">
                  Trải nghiệm độc bản khi ngồi trên mạn tàu gỗ rêu phong, nhâm nhi tách trà lài thơm nồng, nghe tiếng gió luồn qua các ô tranh pixel dập dềnh theo từng con sóng thủy triều của sông Sài Gòn.
                </p>
              </div>

              {/* Coffee Ship visual badge */}
              <div className="w-full sm:w-44 shrink-0 bg-mat-cream rounded-xl p-4 flex flex-col justify-center items-center text-center border border-mat-crimson/10">
                <Anchor className="w-8 h-8 text-mat-crimson mb-2 animate-bounce" />
                <span className="font-serif text-sm font-bold text-mat-charcoal">The Coffee Ship</span>
                <span className="text-[10px] font-mono text-mat-charcoal/60">Neo tại bến Kênh Tẻ</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-mat-crimson/10 pt-4 gap-3 text-xs font-mono text-mat-charcoal/60">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-mat-crimson" />
                <span>Trần Xuân Soạn, Quận 7, TP. HCM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-mat-crimson" />
                <span>0989 222 890 (Kinh Mai Thuyết)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE TIMELINE: Vertical connecting line of cultural eras */}
      <div className="bg-mat-cream mat-card p-6 md:p-10 space-y-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform translate-x-8 -translate-y-8">
          <History className="w-64 h-64 text-mat-crimson" />
        </div>

        <div className="text-center space-y-1 relative z-10">
          <span className="bg-mat-crimson text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase inline-block">
            MẠCH NGUỒN LỊCH SỬ
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-mat-crimson font-bold">
            Trục Thời Gian Văn Hóa Việt
          </h2>
          <p className="font-sans text-sm text-mat-charcoal/75 max-w-2xl mx-auto">
            Hành trình lịch sử kết nối tinh hoa nghệ thuật Đại Việt xưa tới thời kỳ kỹ thuật số đương đại tại Bồng Bềnh Gallery.
          </p>
        </div>

        {/* Timeline Grid layout */}
        <div className="relative border-l-2 border-mat-crimson/20 ml-4 md:ml-32 py-4 space-y-10 z-10">
          {TIMELINE_ERAS.map((era, idx) => {
            const isSelected = selectedEra === idx;
            return (
              <div key={idx} className="relative group pl-6 md:pl-10">
                {/* Timeline Dot/Node */}
                <button
                  onClick={() => setSelectedEra(idx)}
                  className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                    isSelected 
                      ? "bg-mat-ochre border-mat-crimson scale-125 shadow" 
                      : "bg-mat-cream border-mat-crimson/50 hover:bg-mat-ochre"
                  }`}
                  title="Nhấn để xem chi tiết niên đại"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-mat-crimson" : "bg-transparent"}`} />
                </button>

                {/* Left Side Era Tag (Desktop only) */}
                <div className="hidden md:block absolute -left-32 top-1 w-24 text-right">
                  <span className={`font-mono text-xs font-bold transition-all ${isSelected ? "text-mat-crimson font-black" : "text-mat-charcoal/50"}`}>
                    {era.period.split(" ")[0]}
                  </span>
                </div>

                {/* Content Box */}
                <div 
                  onClick={() => setSelectedEra(idx)}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? "bg-white border-mat-crimson/30 shadow-md translate-x-1" 
                      : "bg-transparent border-transparent hover:bg-white/40"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="block md:hidden text-xs font-mono text-mat-crimson font-bold">
                      {era.period}
                    </span>
                    <span className="hidden md:block text-[10px] font-mono text-mat-crimson bg-mat-crimson/5 px-2 py-0.5 rounded font-bold">
                      {era.period}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-mat-jade bg-mat-jade/5 px-2.5 py-0.5 rounded-full">
                      🔑 {era.highlight}
                    </span>
                  </div>

                  <h3 className={`font-serif text-lg font-bold transition-colors ${isSelected ? "text-mat-crimson" : "text-mat-charcoal/80"}`}>
                    {era.title}
                  </h3>
                  
                  <p className="font-sans text-xs md:text-sm text-mat-charcoal/70 mt-2 leading-relaxed">
                    {era.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Era Highlight Card */}
        <div className="bg-white p-5 rounded-xl border border-mat-crimson/15 mt-6 flex items-center gap-4 relative z-10 animate-fadeIn">
          <div className="bg-mat-crimson text-white p-3.5 rounded-lg shrink-0">
            <History className="w-6 h-6 text-mat-ochre" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-mat-charcoal/50 font-bold block uppercase">NIÊN ĐẠI ĐANG CHỌN</span>
            <p className="font-serif text-sm font-bold text-mat-crimson">
              {TIMELINE_ERAS[selectedEra].period} — {TIMELINE_ERAS[selectedEra].highlight}
            </p>
            <p className="font-sans text-xs text-mat-charcoal/70 mt-0.5">
              "Bồng Bềnh tự hào chuyển tải tinh thần thời kỳ này vào hàng loạt tác phẩm tranh phong cảnh và tư liệu dã sử trưng bày."
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
