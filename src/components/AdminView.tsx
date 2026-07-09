import React, { useState, useEffect } from "react";
import { ArtItem, ServiceItem } from "../types";
import { fetchArts, addArt, deleteArt, fetchServices, addService, deleteService } from "../lib/api";
import { Loader2, Plus, Trash2, Key, Check, ShieldAlert, Sparkles, LayoutGrid, Cog, Lock, LogOut } from "lucide-react";

export default function AdminView() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Dashboard states
  const [activeSubTab, setActiveSubTab] = useState<"arts" | "services" | "manage">("arts");
  const [arts, setArts] = useState<ArtItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Art form states
  const [artTitle, setArtTitle] = useState("");
  const [artArtist, setArtArtist] = useState("Kinh Mai Thuyết");
  const [artYear, setArtYear] = useState(new Date().getFullYear().toString());
  const [artMedium, setArtMedium] = useState("Sơn dầu trên toan");
  const [artPrice, setArtPrice] = useState("");
  const [artImageUrl, setArtImageUrl] = useState("");
  const [artDescription, setArtDescription] = useState("");
  const [artAvailable, setArtAvailable] = useState(true);
  const [submittingArt, setSubmittingArt] = useState(false);

  // Service form states
  const [svcTitle, setSvcTitle] = useState("");
  const [svcPrice, setSvcPrice] = useState("");
  const [svcDuration, setSvcDuration] = useState("30 phút");
  const [svcProvider, setSvcProvider] = useState("Kinh Mai Thuyết");
  const [svcDescription, setSvcDescription] = useState("");
  const [svcAvailable, setSvcAvailable] = useState(true);
  const [submittingSvc, setSubmittingSvc] = useState(false);

  // Load backend data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  async function loadData() {
    setLoading(true);
    try {
      const [artList, svcList] = await Promise.all([fetchArts(), fetchServices()]);
      setArts(artList);
      setServices(svcList);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "0989222890" || passcode === "1234") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("MÃ KHÔNG ĐÚNG! VUI LÒNG THỬ LẠI CHÍNH XÁC.");
      setPasscode("");
    }
  };

  const handleAddArt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || !artImageUrl) {
      alert("Vui lòng điền đầy đủ tiêu đề và liên kết hình ảnh!");
      return;
    }

    setSubmittingArt(true);
    const newArt = await addArt({
      title: artTitle,
      artist: artArtist,
      year: artYear,
      medium: artMedium,
      price: artPrice || "Liên hệ nghệ sĩ",
      imageUrl: artImageUrl,
      description: artDescription,
      available: artAvailable
    });

    setSubmittingArt(false);
    if (newArt) {
      alert("Đã thêm tác phẩm mới thành công!");
      setArtTitle("");
      setArtPrice("");
      setArtImageUrl("");
      setArtDescription("");
      setArtAvailable(true);
      loadData();
    } else {
      alert("Có lỗi xảy ra, không thể lưu tác phẩm.");
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!svcTitle || !svcPrice) {
      alert("Vui lòng điền đầy đủ tiêu đề và giá dịch vụ!");
      return;
    }

    setSubmittingSvc(true);
    const newSvc = await addService({
      title: svcTitle,
      price: svcPrice,
      duration: svcDuration,
      description: svcDescription,
      provider: svcProvider,
      available: svcAvailable
    });

    setSubmittingSvc(false);
    if (newSvc) {
      alert("Đã thêm hoạt động/trải nghiệm mới thành công!");
      setSvcTitle("");
      setSvcPrice("");
      setSvcDuration("30 phút");
      setSvcDescription("");
      setSvcAvailable(true);
      loadData();
    } else {
      alert("Có lỗi xảy ra, không thể lưu hoạt động.");
    }
  };

  const handleDeleteArt = async (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa tác phẩm "${name}" khỏi phòng lãm?`)) {
      const ok = await deleteArt(id);
      if (ok) {
        alert("Đã xóa tác phẩm!");
        loadData();
      } else {
        alert("Có lỗi xảy ra, không thể xóa.");
      }
    }
  };

  const handleDeleteService = async (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa dịch vụ "${name}" khỏi danh sách?`)) {
      const ok = await deleteService(id);
      if (ok) {
        alert("Đã xóa hoạt động!");
        loadData();
      } else {
        alert("Có lỗi xảy ra, không thể xóa.");
      }
    }
  };

  // Auth Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center py-12 animate-fadeIn max-w-lg mx-auto">
        <div className="w-full bg-[#F4EFE6] border-4 border-mat-crimson rounded-3xl p-6 md:p-8 space-y-6 shadow-xl text-center">
          <div className="inline-flex items-center justify-center bg-mat-crimson text-white p-4 rounded-full border-2 border-mat-ochre">
            <Lock className="w-6 h-6 text-mat-ochre animate-pulse" />
          </div>
          
          <div className="space-y-1.5">
            <span className="font-mono text-xs text-mat-crimson font-bold uppercase tracking-wider block">QUYỀN CHỦ KHÁNH</span>
            <h2 className="font-serif text-3xl text-mat-charcoal font-black tracking-tight">
              Phòng Quản Trị Triển Lãm
            </h2>
            <p className="text-xs font-mono text-mat-charcoal/70 max-w-sm mx-auto leading-relaxed">
              Vui lòng cung cấp mã bảo mật của Bồng Bềnh Gallery để hiệu chỉnh hoặc cập nhật danh sách tác phẩm.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="block text-xs font-mono font-bold text-mat-charcoal/70">MÃ SỐ BẢO MẬT (PASSCODE):</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
              />
            </div>

            {errorMsg && (
              <div className="bg-mat-crimson/10 border border-mat-crimson text-mat-crimson text-xs font-mono py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button type="submit" className="w-full py-3 bg-mat-crimson hover:bg-mat-crimson/95 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border border-mat-ochre/20">
              XÁC THỰC QUYỀN TRUY CẬP
            </button>
          </form>

          <div className="bg-white/60 border border-mat-charcoal/5 p-4 text-left space-y-1.5 rounded-2xl font-mono text-[11px] text-mat-charcoal/80 leading-relaxed">
            <span className="font-bold text-mat-crimson uppercase block">💡 Khảo cứu nhanh cho lập trình viên:</span>
            <span>
              Quý danh mật khẩu chính thức của họa sĩ Kinh Mai Thuyết là SĐT: <strong className="text-mat-crimson font-bold">0989222890</strong> hoặc mã kiểm thử nhanh: <strong className="text-mat-crimson font-bold">1234</strong>.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Header and Sub tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mat-charcoal/15 pb-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-mat-crimson font-bold uppercase tracking-wider block">CHỈ HUY SỐ HÓA</span>
          <h2 className="font-serif text-3xl md:text-4xl text-mat-charcoal font-black tracking-tight mt-1 flex items-center gap-2">
            <Cog className="w-7 h-7 text-mat-crimson animate-spin-slow shrink-0" /> Thư phòng Biên Tập
          </h2>
          <p className="text-xs md:text-sm text-mat-charcoal/70">
            Công cụ thêm sửa xóa các tác phẩm hội họa và lịch hoạt động trên chiếc thuyền gỗ "The Coffee Ship" neo tại Kênh Tẻ.
          </p>
        </div>

        {/* Log out */}
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 bg-mat-crimson/10 hover:bg-mat-crimson/15 text-mat-crimson border border-mat-crimson/25 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" /> ĐĂNG XUẤT HỆ THỐNG
        </button>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setActiveSubTab("arts")}
          className={`px-4 py-2.5 text-xs font-mono font-bold rounded-full border transition-all cursor-pointer ${
            activeSubTab === "arts" 
              ? "bg-mat-crimson text-white border-mat-crimson shadow-md" 
              : "bg-white text-mat-charcoal border-mat-charcoal/15 hover:bg-mat-crimson/5"
          }`}
        >
          ✍️ ĐĂNG KÝ HỌA PHẨM MỚI
        </button>
        <button
          onClick={() => setActiveSubTab("services")}
          className={`px-4 py-2.5 text-xs font-mono font-bold rounded-full border transition-all cursor-pointer ${
            activeSubTab === "services" 
              ? "bg-mat-crimson text-white border-mat-crimson shadow-md" 
              : "bg-white text-mat-charcoal border-mat-charcoal/15 hover:bg-mat-crimson/5"
          }`}
        >
          📆 LÊN LỊCH TRẢI NGHIỆM MỚI
        </button>
        <button
          onClick={() => setActiveSubTab("manage")}
          className={`px-4 py-2.5 text-xs font-mono font-bold rounded-full border transition-all cursor-pointer ${
            activeSubTab === "manage" 
              ? "bg-mat-jade text-white border-mat-jade shadow-md" 
              : "bg-white text-mat-charcoal border-mat-charcoal/15 hover:bg-mat-jade/5"
          }`}
        >
          📂 QUẢN LÝ KHO LƯU TRỮ ({arts.length + services.length})
        </button>
      </div>

      {/* Add Art Form */}
      {activeSubTab === "arts" && (
        <div className="bg-white mat-card p-6 md:p-8 space-y-6">
          <div className="border-b border-mat-charcoal/10 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-mat-crimson animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-mat-charcoal">
              Đăng Ký Tác Phẩm Vào Phòng Lãm Số
            </h3>
          </div>

          <form onSubmit={handleAddArt} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-bold text-mat-charcoal/70">TÊN HỌA PHẨM <span className="text-mat-crimson">*</span></label>
                <input
                  type="text"
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="Ví dụ: Nàng Kiều bên bến Kênh Tẻ..."
                  className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-mat-charcoal/70">DANH TÁNH HỌA SĨ</label>
                  <input
                    type="text"
                    required
                    value={artArtist}
                    onChange={(e) => setArtArtist(e.target.value)}
                    className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-mat-charcoal/70">NĂM SÁNG TÁC</label>
                  <input
                    type="text"
                    required
                    value={artYear}
                    onChange={(e) => setArtYear(e.target.value)}
                    className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-mat-charcoal/70">CHẤT LIỆU DI SẢN</label>
                  <input
                    type="text"
                    required
                    value={artMedium}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-mat-charcoal/70">GIÁ GIAO LƯU (VND / LIÊN HỆ)</label>
                  <input
                    type="text"
                    value={artPrice}
                    onChange={(e) => setArtPrice(e.target.value)}
                    placeholder="Ví dụ: 15,000,000 VND"
                    className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono font-bold text-mat-charcoal/70">LIÊN KẾT HÌNH ẢNH URL <span className="text-mat-crimson">*</span></label>
                <input
                  type="url"
                  required
                  value={artImageUrl}
                  onChange={(e) => setArtImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                />
                <span className="block text-[10px] text-mat-charcoal/50 italic leading-relaxed">Mẹo: Quý vị có thể sao chép liên kết ảnh từ Unsplash hoặc dán bất cứ tệp tin ảnh trực tuyến nào.</span>
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-bold text-mat-charcoal/70">PHÁP CHỦ & Ý NGHĨA SÁNG TÁC</label>
                <textarea
                  rows={6}
                  value={artDescription}
                  onChange={(e) => setArtDescription(e.target.value)}
                  placeholder="Mô tả câu chuyện và nội dung tư tưởng của họa phẩm sơn dầu hoặc sơn mài..."
                  className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 bg-[#F4EFE6] p-4 rounded-xl border border-mat-charcoal/5">
                <input
                  type="checkbox"
                  id="artAvailable"
                  checked={artAvailable}
                  onChange={(e) => setArtAvailable(e.target.checked)}
                  className="w-4 h-4 rounded-md border-mat-charcoal/30 text-mat-crimson focus:ring-mat-crimson/25 cursor-pointer"
                />
                <label htmlFor="artAvailable" className="text-xs font-mono font-bold text-mat-charcoal/80 cursor-pointer select-none">
                  Tranh sẵn sàng giao lưu trực tiếp tại bến du thuyền?
                </label>
              </div>

              <button
                type="submit"
                disabled={submittingArt}
                className="w-full py-4 bg-mat-crimson hover:bg-mat-crimson/95 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border border-mat-ochre/20 flex items-center justify-center gap-2"
              >
                {submittingArt ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-mat-ochre" /> ĐANG BIÊN CHÉP TRANH VÀO KHO...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-mat-ochre" /> TREO TRANH LÊN PHÒNG TRIỂN LÃM
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Service Form */}
      {activeSubTab === "services" && (
        <div className="bg-white mat-card p-6 md:p-8 space-y-6">
          <div className="border-b border-mat-charcoal/10 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-mat-crimson animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-mat-charcoal">
              Đăng Ký Hoạt Động & Sự Kiện Mới
            </h3>
          </div>

          <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-bold text-mat-charcoal/70">TIÊU ĐỀ TRẢI NGHIỆM <span className="text-mat-crimson">*</span></label>
                <input
                  type="text"
                  required
                  value={svcTitle}
                  onChange={(e) => setSvcTitle(e.target.value)}
                  placeholder="Ví dụ: Đàm Đạo Triết Lý Thúy Kiều..."
                  className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-mat-charcoal/70">CHI PHÍ THAM DỰ <span className="text-mat-crimson">*</span></label>
                  <input
                    type="text"
                    required
                    value={svcPrice}
                    onChange={(e) => setSvcPrice(e.target.value)}
                    placeholder="Ví dụ: Miễn phí trà mộc / 250,000 VND..."
                    className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-mat-charcoal/70">THỜI LƯỢNG ƯỚC CHỪNG</label>
                  <input
                    type="text"
                    required
                    value={svcDuration}
                    onChange={(e) => setSvcDuration(e.target.value)}
                    className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono font-bold text-mat-charcoal/70">HỌA SĨ CHỦ TOẠ / HƯỚNG DẪN</label>
                <input
                  type="text"
                  required
                  value={svcProvider}
                  onChange={(e) => setSvcProvider(e.target.value)}
                  className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                />
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-bold text-mat-charcoal/70">MÔ TẢ NỘI DUNG SỰ KIỆN</label>
                <textarea
                  rows={5}
                  value={svcDescription}
                  onChange={(e) => setSvcDescription(e.target.value)}
                  placeholder="Ghi rõ thông tin chi tiết sự kiện trải nghiệm vẽ tranh cổ động, thắt nút lụa Áo dài hoặc hòa âm đàn nguyệt..."
                  className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 bg-[#F4EFE6] p-4 rounded-xl border border-mat-charcoal/5">
                <input
                  type="checkbox"
                  id="svcAvailable"
                  checked={svcAvailable}
                  onChange={(e) => setSvcAvailable(e.target.checked)}
                  className="w-4 h-4 rounded-md border-mat-charcoal/30 text-mat-crimson focus:ring-mat-crimson/25 cursor-pointer"
                />
                <label htmlFor="svcAvailable" className="text-xs font-mono font-bold text-mat-charcoal/80 cursor-pointer select-none">
                  Kích hoạt lịch trải nghiệm ngay lập tức?
                </label>
              </div>

              <button
                type="submit"
                disabled={submittingSvc}
                className="w-full py-4 bg-mat-crimson hover:bg-mat-crimson/95 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border border-mat-ochre/20 flex items-center justify-center gap-2"
              >
                {submittingSvc ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-mat-ochre" /> ĐANG LƯU SỰ KIỆN SỔ SÁCH...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-mat-ochre" /> PHÁT HÀNH SỰ KIỆN LÊN TRANG CHỦ
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Manage/Lists Screen */}
      {activeSubTab === "manage" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Arts List */}
          <div className="bg-white mat-card p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-mat-charcoal border-b border-mat-charcoal/10 pb-2 flex items-center justify-between">
              <span>Danh Sách Tranh Lưu Kho ({arts.length})</span>
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-mat-crimson" />
              </div>
            ) : arts.length === 0 ? (
              <p className="text-xs font-mono text-mat-charcoal/50 py-8 text-center">Chưa có tác phẩm nào.</p>
            ) : (
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2">
                {arts.map((art) => (
                  <div
                    key={art.id}
                    className="flex gap-3 items-center justify-between bg-[#F4EFE6]/40 p-3 border border-mat-charcoal/10 hover:bg-[#F4EFE6]/90 transition-all rounded-2xl"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-12 h-12 object-cover rounded-lg border border-mat-charcoal/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-serif text-sm font-bold text-mat-charcoal leading-tight truncate">{art.title}</h4>
                        <p className="text-[10px] text-mat-charcoal/50 font-mono mt-0.5 truncate">{art.price} — Năm {art.year}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteArt(art.id, art.title)}
                      className="text-mat-crimson hover:bg-mat-crimson/10 p-2.5 rounded-xl border border-transparent hover:border-mat-crimson/20 cursor-pointer shrink-0 transition-all"
                      title="Xóa tác phẩm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Services List */}
          <div className="bg-white mat-card p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-mat-charcoal border-b border-mat-charcoal/10 pb-2 flex items-center justify-between">
              <span>Danh Sách Hoạt Động Trải Nghiệm ({services.length})</span>
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-mat-crimson" />
              </div>
            ) : services.length === 0 ? (
              <p className="text-xs font-mono text-mat-charcoal/50 py-8 text-center">Chưa có trải nghiệm nào.</p>
            ) : (
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="flex gap-3 items-center justify-between bg-[#F4EFE6]/40 p-3 border border-mat-charcoal/10 hover:bg-[#F4EFE6]/90 transition-all rounded-2xl"
                  >
                    <div className="overflow-hidden">
                      <h4 className="font-serif text-sm font-bold text-mat-charcoal leading-tight truncate">{svc.title}</h4>
                      <p className="text-[10px] text-mat-charcoal/50 font-mono mt-0.5 truncate">{svc.price} — {svc.duration}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteService(svc.id, svc.title)}
                      className="text-mat-crimson hover:bg-mat-crimson/10 p-2.5 rounded-xl border border-transparent hover:border-mat-crimson/20 cursor-pointer shrink-0 transition-all"
                      title="Xóa hoạt động"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
