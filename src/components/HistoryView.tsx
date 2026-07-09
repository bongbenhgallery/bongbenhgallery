import React, { useState } from "react";
import { Book, Compass, Waves, Music, ArrowRight, Heart, Share2, Info, Star } from "lucide-react";

interface CultureTopic {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  period: string;
  image: string;
  quote?: {
    text: string;
    sub?: string;
  };
  content: string[];
}

const culturalTopics: CultureTopic[] = [
  {
    id: "kieu",
    category: "VĂN HỌC CỔ ĐIỂN",
    title: "Truyện Kiều & Triết Lý 'Bồng Bềnh'",
    subtitle: "Thân phận chìm nổi bồng bềnh của nàng Kiều trong kiệt tác của Nguyễn Du",
    author: "Đại thi hào Nguyễn Du",
    period: "Thế kỷ XVIII - XIX",
    image: "/src/assets/images/kieu_pixel_art_1783592474719.jpg",
    quote: {
      text: "Đoạn trường tân thanh - tiếng kêu mới về nỗi đau đứt ruột. Thân phận người phụ nữ tài sắc bấp bênh giữa dòng đời bão tố được Nguyễn Du lột tả đầy chân thực và xót xa.",
      sub: "Bình phẩm văn học"
    },
    content: [
      "Truyện Kiều (Đoạn Trường Tân Thanh) không chỉ là một đỉnh cao chói lọi của văn học Việt Nam, mà còn là khởi nguồn cảm hứng vô tận cho các thế hệ nghệ sĩ họa sĩ nước nhà.",
      "Tên gọi 'Bồng Bềnh' của Gallery chúng tôi mượn ý niệm từ những thăng trầm chìm nổi, lênh đênh sóng gió suốt mười lăm năm luân lạc của nàng Kiều. Người con gái tài hoa bạc mệnh ấy như một cánh hoa rụng rơi bồng bềnh giữa dòng nước lũ, không biết đâu là bến đỗ bình yên.",
      "Sự kết hợp giữa chất liệu cổ điển mang tính lịch sử này với nghệ thuật Pixel hiện đại tạo ra một cầu nối độc đáo: những mảnh ô vuông pixel tượng trưng cho từng mảnh ghép số phận, tuy góc cạnh, thô mộc nhưng khi hòa quyện lại tạo nên một kiệt tác tổng thể đầy cảm xúc hoài niệm ấm áp."
    ]
  },
  {
    id: "kenh-te",
    category: "LỊCH SỬ ĐÔ THỊ SÀI GÒN",
    title: "Kênh Tẻ & Ký Ức Sông Nước Nam Bộ",
    subtitle: "Dòng chảy huyết mạch nối liền miền Tây sông nước và thương cảng Gia Định xưa",
    author: "Ban Biên Tập Bồng Bềnh",
    period: "Thế kỷ XX - Nay",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=60",
    quote: {
      text: "Kênh Tẻ được đào vào đầu thế kỷ 20, dài hơn 4km để san sẻ lưu lượng vận tải đường thủy cho kênh Bến Nghé, tạo nên một bến đỗ sầm uất cho những ghe thuyền chở trái cây Nam Bộ.",
      sub: "Địa chí Sài Gòn"
    },
    content: [
      "Kênh Tẻ là một phân nhánh thủy lộ quan trọng của sông Sài Gòn. Nơi đây từng chứng kiến hàng vạn chuyến tàu chở lúa gạo, sản vật từ vựa lúa miền Tây Nam Bộ đổ về thành phố, tạo nên một nét đặc thù 'trên bến dưới thuyền' của vùng đất Gia Định xưa.",
      "Tọa lạc trên chiếc 'The Coffee Ship' neo đậu ở Kênh Tẻ, Bồng Bềnh Gallery mong muốn tái lập không gian văn hóa di động ấy. Khách thưởng lãm có thể nghe tiếng sóng vỗ rì rào mạn thuyền, ngắm nhìn lục bình trôi và hít thở luồng gió mát rượi thổi từ cửa sông Sài Gòn.",
      "Đây không chỉ là địa điểm thưởng ngoạn hội họa, mà còn là một di tích sống giữ lại hơi thở của một thời sông nước kiêu hùng, hòa cùng nhịp sống sôi động đương đại của Sài Gòn."
    ]
  },
  {
    id: "dan-nguyet",
    category: "CỔ NHẠC TRUYỀN THỐNG",
    title: "Hồn Thơ Đàn Nguyệt Việt Nam",
    subtitle: "Cây đàn tròn như trăng tròn, mang âm sắc thanh cao, cổ kính của tâm hồn Việt",
    author: "Nhà nghiên cứu văn hóa phục dựng",
    period: "Nhà Lý - Trần đến nay",
    image: "https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=800&auto=format&fit=crop&q=60",
    quote: {
      text: "Đàn nguyệt (còn gọi là Quân tử cầm) giữ vai trò chủ đạo trong nhạc đình đám, nhạc hát văn và đặc biệt là đờn ca tài tử Nam Bộ đầy phóng khoáng.",
      sub: "Âm nhạc dân tộc"
    },
    content: [
      "Đàn Nguyệt là nhạc cụ dây gảy độc đáo có hộp đàn hình tròn dẹt như mặt trăng tròn nên có tên gọi kiêu sa là Nguyệt cầm. Âm thanh đàn nguyệt tươi sáng, rộn rã lúc dồn dập, lúc trầm lắng sâu sắc như tâm tư sâu thẳm của người Việt.",
      "Trong thơ ca xưa, đặc biệt là cảnh Thúy Kiều gảy đàn cho Kim Trọng nghe, nhạc cụ mộc mạc thanh nhã này đại diện cho sự tao nhã vô song của bậc tri thức nhân gian.",
      "Tại bến thuyền Bồng Bềnh, những bức tranh pixel art về nàng Kiều chơi đàn nguyệt luôn thu hút mọi ánh nhìn. Chúng tôi mong muốn phục dựng những giai điệu cổ xưa này hòa cùng làn sóng sông nước thanh tịnh để xoa dịu tâm hồn bạn."
    ]
  }
];

// Interactive retro moon lute notes (Simple synth using Web Audio API)
const LUTE_NOTES = [
  { name: "Cung Thanh (Đô)", freq: 261.63, tag: "Thanh tao" },
  { name: "Cung Trầm (Sol)", freq: 392.00, tag: "Sâu lắng" },
  { name: "Cung Vút (Đố)", freq: 523.25, tag: "Bay bổng" },
  { name: "Cung Oán (Fa#)", freq: 369.99, tag: "Hoài cổ" }
];

export default function HistoryView() {
  const [selectedTopic, setSelectedTopic] = useState<CultureTopic>(culturalTopics[0]);
  const [likes, setLikes] = useState<{ [key: string]: number }>({
    "kieu": 128,
    "kenh-te": 85,
    "dan-nguyet": 94
  });
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const [playingNote, setPlayingNote] = useState<string | null>(null);

  const handleLike = (topicId: string) => {
    if (liked[topicId]) {
      setLikes(prev => ({ ...prev, [topicId]: prev[topicId] - 1 }));
      setLiked(prev => ({ ...prev, [topicId]: false }));
    } else {
      setLikes(prev => ({ ...prev, [topicId]: prev[topicId] + 1 }));
      setLiked(prev => ({ ...prev, [topicId]: true }));
    }
  };

  // Play retro string synth sound using Web Audio API
  const playRetroNote = (freq: number, name: string) => {
    try {
      setPlayingNote(name);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Simulate pluck sound with retro wave
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      // Retro oldschool triangle wave sounds like traditional flute/lute
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      // Pluck envelope
      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 1.3);
      
      setTimeout(() => {
        setPlayingNote(null);
      }, 1200);
    } catch (e) {
      console.warn("Audio context not allowed or supported yet:", e);
      setPlayingNote(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dynamic Material-Retro Intro Hero */}
      <div className="mat-card bg-mat-cream p-6 md:p-8 relative overflow-hidden">
        {/* Artistic background badge */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
          <Book className="w-80 h-80 text-mat-crimson" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-mat-crimson text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" /> HỒN SỬ VIỆT & VĂN HÓA BỒNG BỀNH
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl text-mat-crimson font-bold leading-tight">
            Nơi Dòng Thơ & Sử Việt Hòa Quyện Với Sóng Nước Kênh Tẻ
          </h2>
          
          <p className="font-sans text-sm md:text-base text-mat-charcoal/80 leading-relaxed">
            Chúng tôi tin rằng nghệ thuật không tách rời khỏi dòng chảy văn hóa ngàn năm. 
            Mỗi nét vẽ sơn mài, mỗi bảng màu pixel, hay mỗi cung đàn nguyệt cất lên tại bến thuyền 
            đều mang theo ký ức lịch sử sông nước và tâm hồn thi ca dân tộc Việt Nam.
          </p>
        </div>
      </div>

      {/* Main Exhibition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Topic Selector and Interactive Moon Lute Soundboard */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          {/* List of Historical Topics */}
          <div className="mat-card bg-white p-5 space-y-4">
            <h3 className="font-display font-semibold text-xs tracking-wider text-mat-crimson uppercase border-b border-mat-crimson/10 pb-2">
              DANH MỤC LƯU TRỮ VĂN HÓA
            </h3>
            
            <div className="space-y-3">
              {culturalTopics.map((topic) => {
                const isActive = topic.id === selectedTopic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? "bg-retro-beige border-mat-crimson/35 shadow-sm"
                        : "bg-transparent border-transparent hover:bg-retro-beige/35"
                    }`}
                  >
                    <div className={`p-2 rounded-lg mt-0.5 ${isActive ? "bg-mat-crimson text-white" : "bg-retro-beige text-mat-charcoal/60"}`}>
                      {topic.id === "kieu" && <Book className="w-4 h-4" />}
                      {topic.id === "kenh-te" && <Waves className="w-4 h-4" />}
                      {topic.id === "dan-nguyet" && <Music className="w-4 h-4" />}
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider block text-mat-crimson font-semibold">
                        {topic.category}
                      </span>
                      <h4 className="font-display font-medium text-sm text-mat-charcoal leading-snug">
                        {topic.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Moon Lute Soundboard Widget */}
          <div className="mat-card bg-mat-charcoal text-retro-paper p-5 space-y-4 relative overflow-hidden">
            <div className="absolute right-2 top-2 opacity-15 pointer-events-none">
              <Music className="w-20 h-20 text-retro-amber animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="inline-block bg-retro-rose/20 text-retro-rose text-[9px] font-pixel px-2 py-0.5 rounded-sm">
                TRẢI NGHIỆM ÂM CỔ
              </div>
              <h3 className="font-serif text-xl text-retro-amber font-semibold">
                Độ Âm Quân Tử Cầm
              </h3>
              <p className="text-xs text-retro-paper/75">
                Chạm thử các cung phím đàn nguyệt retro để tái tạo tiếng tơ ngân vang bồng bềnh:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {LUTE_NOTES.map((note) => {
                const isPlaying = playingNote === note.name;
                return (
                  <button
                    key={note.name}
                    onClick={() => playRetroNote(note.freq, note.name)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      isPlaying
                        ? "bg-retro-amber border-retro-amber text-retro-dark translate-y-0.5"
                        : "bg-retro-dark border-retro-paper/20 hover:border-retro-amber hover:bg-retro-beige/10"
                    }`}
                  >
                    <span className="block font-semibold text-xs font-display">{note.name}</span>
                    <span className="text-[9px] text-retro-paper/50 block font-mono">{note.tag}</span>
                  </button>
                );
              })}
            </div>

            {playingNote && (
              <div className="text-center bg-retro-amber/15 py-1 rounded-md">
                <span className="font-mono text-xs text-retro-amber animate-pulse">
                  🔊 Đang ngân: {playingNote}...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Detailed Story Display (Material Card styled with Vintage typography) */}
        <div className="lg:col-span-8 mat-card bg-white p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Top Bar inside Card */}
            <div className="flex items-center justify-between border-b border-mat-charcoal/15 pb-4">
              <div className="space-y-1">
                <span className="bg-mat-crimson/10 text-mat-crimson px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider font-mono">
                  {selectedTopic.category}
                </span>
                <span className="block text-xs font-mono text-mat-charcoal/60 mt-1">
                  Thời đại: {selectedTopic.period}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Custom Like Button */}
                <button
                  onClick={() => handleLike(selectedTopic.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    liked[selectedTopic.id]
                      ? "bg-retro-rose/15 border-retro-rose text-retro-rose"
                      : "bg-transparent border-mat-charcoal/15 text-mat-charcoal/70 hover:bg-retro-beige/30"
                  }`}
                >
                  <Star className={`w-4 h-4 ${liked[selectedTopic.id] ? "fill-retro-rose" : ""}`} />
                  Yêu thích ({likes[selectedTopic.id]})
                </button>
              </div>
            </div>

            {/* Title and Subtitle */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl md:text-4xl text-mat-charcoal font-bold tracking-tight">
                {selectedTopic.title}
              </h1>
              <p className="font-sans text-sm md:text-base text-mat-charcoal/70 italic">
                {selectedTopic.subtitle}
              </p>
            </div>

            {/* Illustration */}
            <div className="relative rounded-2xl overflow-hidden border border-mat-charcoal/15 aspect-video bg-mat-charcoal max-h-[360px]">
              <img
                src={selectedTopic.image}
                alt={selectedTopic.title}
                className="w-full h-full object-cover opacity-90 hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-mat-charcoal/75 text-retro-paper text-[10px] font-mono px-2 py-0.5 rounded-md border border-retro-paper/25">
                Minh họa Văn hóa dã sử
              </div>
            </div>

            {/* Quote block */}
            {selectedTopic.quote && (
              <div className="bg-retro-beige/50 p-4 rounded-xl border-l-4 border-mat-crimson relative">
                <p className="italic font-serif text-mat-charcoal text-sm leading-relaxed">
                  "{selectedTopic.quote.text}"
                </p>
                <span className="absolute bottom-2 right-4 text-[10px] font-mono text-mat-charcoal/55 font-bold uppercase">
                  {selectedTopic.quote.sub}
                </span>
              </div>
            )}

            {/* Article Content */}
            <div className="space-y-4 font-serif text-mat-charcoal/90 text-sm md:text-base leading-relaxed">
              {selectedTopic.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Footer of Article Card */}
          <div className="border-t border-mat-charcoal/15 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-mat-charcoal/60">
            <div>
              <span>Biên dịch & Sưu tập bởi: </span>
              <strong className="text-mat-crimson font-semibold">{selectedTopic.author}</strong>
            </div>

            <div className="flex items-center gap-1.5 text-mat-crimson font-semibold">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Gìn giữ hồn thiêng văn hóa cổ Việt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
