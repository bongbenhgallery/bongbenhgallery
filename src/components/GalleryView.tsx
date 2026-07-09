import React, { useState, useEffect } from "react";
import { ArtItem } from "../types";
import { fetchArts } from "../lib/api";
import { Loader2, Sparkles, Filter, X, Eye, Phone, Calendar } from "lucide-react";

export default function GalleryView() {
  const [arts, setArts] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "available" | "sold">("all");
  const [selectedArt, setSelectedArt] = useState<ArtItem | null>(null);

  useEffect(() => {
    async function loadArts() {
      try {
        const data = await fetchArts();
        setArts(data);
      } catch (err) {
        console.error("Error loading arts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArts();
  }, []);

  const filteredArts = arts.filter((art) => {
    if (filter === "available") return art.available;
    if (filter === "sold") return !art.available;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mat-charcoal/15 pb-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-mat-crimson font-bold uppercase tracking-wider block">
            LÃM PHÒNG GIA ĐỊNH
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-mat-charcoal font-black tracking-tight">
            Bộ Sưu Tập Tranh Bồng Bềnh
          </h2>
          <p className="text-xs md:text-sm text-mat-charcoal/70 max-w-xl">
            Các họa phẩm độc bản giao thoa giữa sơn mài truyền thống, chất liệu dã sử Việt Nam và phong cách đồ họa điểm ảnh (pixel art) đương đại.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-mat-charcoal/60 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-mat-crimson" /> BỘ LỌC TRANH:
          </span>
          
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-full border transition-all cursor-pointer ${
              filter === "all"
                ? "bg-mat-crimson text-white border-mat-crimson shadow-md"
                : "bg-white/80 text-mat-charcoal border-mat-charcoal/15 hover:bg-mat-crimson/5"
            }`}
          >
            TẤT CẢ ({arts.length})
          </button>
          
          <button
            onClick={() => setFilter("available")}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-full border transition-all cursor-pointer ${
              filter === "available"
                ? "bg-mat-jade text-white border-mat-jade shadow-md"
                : "bg-white/80 text-mat-charcoal border-mat-charcoal/15 hover:bg-mat-jade/5"
            }`}
          >
            SẴN CÓ ({arts.filter((a) => a.available).length})
          </button>
          
          <button
            onClick={() => setFilter("sold")}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-full border transition-all cursor-pointer ${
              filter === "sold"
                ? "bg-mat-crimson/10 text-mat-crimson border-mat-crimson/25 shadow-sm"
                : "bg-white/80 text-mat-charcoal border-mat-charcoal/15 hover:bg-mat-crimson/5"
            }`}
          >
            ĐÃ LƯU NIỆM ({arts.filter((a) => !a.available).length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-mat-crimson" />
          <p className="font-mono text-xs text-mat-crimson font-bold animate-pulse">ĐANG PHỤC DỰNG KHÔNG GIAN TRIỂN LÃM...</p>
        </div>
      ) : filteredArts.length === 0 ? (
        <div className="mat-card bg-white p-12 text-center space-y-4">
          <p className="font-serif text-lg text-mat-charcoal/60 italic">Không tìm thấy tác phẩm phù hợp trong chuyên mục này.</p>
          <button 
            onClick={() => setFilter("all")}
            className="text-xs font-mono font-bold text-mat-crimson hover:underline"
          >
            Quay lại xem tất cả tác phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArts.map((art) => (
            <div
              key={art.id}
              className="bg-white mat-card group overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden bg-mat-charcoal border-b border-mat-charcoal/10">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-95"
                    referrerPolicy="no-referrer"
                  />
                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold border shadow ${
                      art.available
                        ? "bg-mat-jade text-white border-mat-jade"
                        : "bg-mat-crimson/20 text-mat-crimson border-mat-crimson/30 backdrop-blur-md"
                    }`}
                  >
                    {art.available ? "● CÒN TRANH" : "○ ĐÃ GIAO LƯU"}
                  </div>
                  {/* Year Tag */}
                  <div className="absolute bottom-4 right-4 bg-mat-charcoal/80 text-[#F4EFE6] text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/10">
                    Năm {art.year}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl font-bold text-mat-charcoal group-hover:text-mat-crimson transition-colors leading-tight">
                      {art.title}
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-mat-crimson/5 text-mat-crimson px-2.5 py-1 rounded-md border border-mat-crimson/10 shrink-0">
                      {art.medium.split(" ")[0]}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-mat-charcoal/60">
                    Họa sĩ sáng tác: <span className="font-bold text-mat-charcoal">{art.artist}</span>
                  </p>

                  <p className="text-xs md:text-sm text-mat-charcoal/80 leading-relaxed line-clamp-3 font-serif">
                    {art.description}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-mat-charcoal/10 bg-[#F4EFE6]/30">
                <div className="font-serif text-xl md:text-2xl text-mat-crimson font-black tracking-tight">
                  {art.price || "Liên hệ"}
                </div>
                
                <button
                  onClick={() => setSelectedArt(art)}
                  className="px-4 py-2 bg-mat-crimson hover:bg-mat-crimson/95 text-white font-mono text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Eye className="w-4 h-4 text-mat-ochre" /> CHI TIẾT
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedArt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mat-charcoal/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-[#F4EFE6] border-4 border-mat-crimson shadow-2xl rounded-3xl max-h-[92vh] overflow-y-auto animate-zoomIn">
            
            {/* Modal Header */}
            <div className="bg-mat-crimson text-white p-5 flex items-center justify-between border-b-2 border-mat-ochre">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-mat-ochre animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-mat-ochre font-bold">
                  HỒ SƠ KHẢO CỨU TÁC PHẨM
                </span>
              </div>
              <button
                onClick={() => setSelectedArt(null)}
                className="text-white hover:text-mat-ochre transition-all cursor-pointer p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Main image in modal */}
              <div className="relative rounded-2xl overflow-hidden border border-mat-charcoal/15 bg-mat-charcoal aspect-video shadow-lg">
                <img
                  src={selectedArt.imageUrl}
                  alt={selectedArt.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full font-mono text-xs font-bold border shadow ${
                    selectedArt.available
                      ? "bg-mat-jade text-white border-mat-jade"
                      : "bg-mat-crimson/30 text-mat-crimson border-mat-crimson/35 backdrop-blur-md"
                  }`}
                >
                  {selectedArt.available ? "● CÒN TRANH SẴN CÓ" : "○ ĐÃ ĐƯỢC SƯU TẬP"}
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-mat-charcoal/15 pb-4">
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-mat-charcoal font-black tracking-tight leading-tight">
                      {selectedArt.title}
                    </h3>
                    <p className="text-xs font-mono font-bold text-mat-crimson mt-1.5">
                      Sáng tác bởi: {selectedArt.artist}
                    </p>
                  </div>
                  <div className="font-serif text-2xl md:text-3xl text-mat-crimson font-black tracking-tight">
                    {selectedArt.price || "Liên hệ nghệ sĩ"}
                  </div>
                </div>

                {/* Attribute Matrix */}
                <div className="grid grid-cols-3 gap-4 bg-white p-4 border border-mat-charcoal/10 rounded-2xl shadow-sm">
                  <div>
                    <span className="block text-[9px] font-mono text-mat-charcoal/50 font-bold uppercase">NĂM SÁNG TÁC</span>
                    <span className="font-mono text-sm font-bold text-mat-charcoal">{selectedArt.year}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-mat-charcoal/50 font-bold uppercase">CHẤT LIỆU DI SẢN</span>
                    <span className="font-serif text-xs md:text-sm font-bold text-mat-charcoal leading-none">{selectedArt.medium}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-mat-charcoal/50 font-bold uppercase">MÃ SỐ LƯU TRỮ</span>
                    <span className="font-mono text-xs md:text-sm font-bold text-mat-crimson">{selectedArt.id.toUpperCase()}</span>
                  </div>
                </div>

                {/* Literary Description / Significance */}
                <div className="space-y-2 bg-white/60 p-5 rounded-2xl border border-mat-charcoal/5">
                  <h4 className="font-serif text-xs font-bold text-mat-crimson tracking-wider uppercase border-b border-mat-crimson/10 pb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-mat-ochre" /> DI TRUYỀN THUYẾT & Ý NGHĨA NGHỆ THUẬT
                  </h4>
                  <p className="font-serif text-sm text-mat-charcoal/90 leading-relaxed whitespace-pre-line">
                    {selectedArt.description}
                  </p>
                </div>
              </div>

              {/* Booking/Contact Footer */}
              <div className="border-t border-mat-charcoal/15 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-mat-charcoal/70 font-mono leading-relaxed">
                  Quý khách có ý định sưu tập hoặc thưởng lãm trực tiếp tác phẩm này trên du thuyền gỗ Kênh Tẻ?
                  <br />
                  Xin liên hệ trực tiếp qua: <span className="text-mat-crimson font-bold">0989 222 890</span>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedArt(null)}
                    className="px-4 py-2 bg-white hover:bg-black/5 text-mat-charcoal border border-mat-charcoal/15 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
                  >
                    ĐÓNG LẠI
                  </button>
                  <a
                    href="tel:0989222890"
                    className="px-5 py-2 bg-mat-crimson hover:bg-mat-crimson/95 text-white font-mono text-xs font-bold rounded-xl transition-all text-center shadow-md border border-mat-ochre/20"
                  >
                    MUA TRANH
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
