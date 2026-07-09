import React, { useState, useEffect } from "react";
import { ArtItem } from "../types";
import { fetchArts } from "../lib/api";
import { Loader2, Sparkles, Filter, X, ShoppingBag, Eye } from "lucide-react";

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
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-retro-dark pb-4">
        <div>
          <h2 className="font-retro text-4xl text-retro-wood uppercase tracking-wide">
            Bộ Sưu Tập Nghệ Thuật
          </h2>
          <p className="text-xs text-retro-dark/70 font-mono mt-1">
            Danh sách các tác phẩm hội họa đặc sắc đang trưng bày tại Bồng Bềnh Gallery
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-pixel text-retro-wood/80 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> LỌC:
          </span>
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-xs font-pixel border-2 border-retro-dark cursor-pointer transition-all ${
              filter === "all"
                ? "bg-retro-wood text-retro-paper"
                : "bg-retro-beige text-retro-dark hover:bg-retro-beige/80"
            }`}
          >
            TẤT CẢ ({arts.length})
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-3 py-1 text-xs font-pixel border-2 border-retro-dark cursor-pointer transition-all ${
              filter === "available"
                ? "bg-retro-green text-retro-dark"
                : "bg-retro-beige text-retro-dark hover:bg-retro-beige/80"
            }`}
          >
            CÒN TRANH ({arts.filter((a) => a.available).length})
          </button>
          <button
            onClick={() => setFilter("sold")}
            className={`px-3 py-1 text-xs font-pixel border-2 border-retro-dark cursor-pointer transition-all ${
              filter === "sold"
                ? "bg-retro-rose text-retro-paper"
                : "bg-retro-beige text-retro-dark hover:bg-retro-beige/80"
            }`}
          >
            ĐÃ BÁN ({arts.filter((a) => !a.available).length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-retro-wood" />
          <p className="font-pixel text-[11px] text-retro-wood">ĐANG TẢI TRANH VÀO PHÒNG LÃM...</p>
        </div>
      ) : filteredArts.length === 0 ? (
        <div className="pixel-border bg-retro-beige/50 p-12 text-center space-y-3">
          <p className="font-pixel text-sm text-retro-wood/60">Không tìm thấy tác phẩm phù hợp.</p>
          <button 
            onClick={() => setFilter("all")}
            className="text-xs font-pixel text-retro-rose hover:underline"
          >
            Quay lại tất cả tác phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredArts.map((art) => (
            <div
              key={art.id}
              className="pixel-border bg-retro-paper group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden border-b-4 border-retro-dark bg-retro-dark">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Status Badge */}
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 font-pixel text-[9px] border-2 border-retro-dark shadow-sm ${
                      art.available
                        ? "bg-retro-green text-retro-dark"
                        : "bg-retro-rose text-retro-paper"
                    }`}
                  >
                    {art.available ? "CON TRANH" : "ĐA BAN"}
                  </div>
                  {/* Year Tag */}
                  <div className="absolute bottom-3 right-3 bg-retro-dark/80 text-retro-paper text-xs font-mono px-2 py-0.5 border border-retro-paper/30">
                    {art.year}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-retro text-3xl text-retro-wood tracking-wide leading-tight group-hover:text-retro-rose transition-colors">
                      {art.title}
                    </h3>
                    <div className="text-right text-xs font-mono bg-retro-beige px-2 py-0.5 border border-retro-dark/10">
                      {art.medium.split(" ")[0]}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-retro-dark/60">
                    Tác giả: <span className="font-semibold text-retro-dark">{art.artist}</span>
                  </p>

                  <p className="text-sm text-retro-dark/85 line-clamp-3 leading-relaxed">
                    {art.description}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-retro-dark/10 bg-retro-beige/30">
                <div className="font-retro text-2xl text-retro-rose font-medium">
                  {art.price || "Liên hệ"}
                </div>
                
                <button
                  onClick={() => setSelectedArt(art)}
                  className="pixel-btn px-3 py-1.5 flex items-center gap-1.5 hover:bg-retro-amber"
                >
                  <Eye className="w-4 h-4" /> CHI TIẾT
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedArt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-dark/75 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl pixel-border-retro bg-retro-paper max-h-[90vh] overflow-y-auto animate-zoomIn">
            {/* Modal Header */}
            <div className="bg-retro-wood text-retro-paper p-4 flex items-center justify-between border-b-4 border-retro-dark">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-retro-amber animate-pulse" />
                <span className="font-pixel text-[11px] uppercase tracking-wider text-retro-amber">
                  THÔNG TIN TÁC PHẨM
                </span>
              </div>
              <button
                onClick={() => setSelectedArt(null)}
                className="text-retro-paper hover:text-retro-amber transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 border-2 border-retro-paper p-0.5 hover:border-retro-amber" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Main image in modal */}
              <div className="relative rounded-sm overflow-hidden border-4 border-retro-dark bg-retro-dark aspect-video">
                <img
                  src={selectedArt.imageUrl}
                  alt={selectedArt.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`absolute top-4 left-4 px-3 py-1 font-pixel text-xs border-2 border-retro-dark shadow-sm ${
                    selectedArt.available
                      ? "bg-retro-green text-retro-dark"
                      : "bg-retro-rose text-retro-paper"
                  }`}
                >
                  {selectedArt.available ? "CÒN TRANH" : "ĐÃ BÁN"}
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-retro-dark pb-3">
                  <div>
                    <h3 className="font-retro text-4xl md:text-5xl text-retro-wood leading-tight uppercase tracking-wide">
                      {selectedArt.title}
                    </h3>
                    <p className="text-xs font-pixel text-retro-rose/90 mt-1">
                      Nghệ Sĩ: {selectedArt.artist}
                    </p>
                  </div>
                  <div className="font-retro text-3xl text-retro-rose md:text-right">
                    {selectedArt.price || "Liên hệ nghệ sĩ"}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-retro-beige/50 p-4 border border-retro-dark/15 rounded-sm">
                  <div>
                    <span className="block text-[10px] font-pixel text-retro-wood/70">NĂM SÁNG TÁC</span>
                    <span className="font-mono text-sm font-bold text-retro-dark">{selectedArt.year}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-pixel text-retro-wood/70">CHẤT LIỆU</span>
                    <span className="font-sans text-sm font-bold text-retro-dark">{selectedArt.medium}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-pixel text-retro-wood/70">MÃ SỐ</span>
                    <span className="font-mono text-sm font-bold text-retro-dark">{selectedArt.id.toUpperCase()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-pixel text-[11px] text-retro-wood border-b border-retro-wood/20 pb-1">
                    CÂU CHUYỆN VÀ Ý NGHĨA TÁC PHẨM
                  </h4>
                  <p className="font-sans text-sm text-retro-dark leading-relaxed whitespace-pre-line">
                    {selectedArt.description}
                  </p>
                </div>
              </div>

              {/* Booking/Contact Footer */}
              <div className="border-t-2 border-retro-dark/20 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-retro-dark/80 font-mono">
                  Quý khách muốn xem tranh trực tiếp hoặc mua tác phẩm?
                  <br />
                  Vui lòng liên hệ Hotline: <span className="text-retro-rose font-bold">0989 222 890</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedArt(null)}
                    className="pixel-btn bg-retro-beige hover:bg-retro-beige/80 px-4 py-2"
                  >
                    ĐÓNG
                  </button>
                  <a
                    href="tel:0989222890"
                    className="pixel-btn pixel-btn-amber px-4 py-2 text-center"
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
