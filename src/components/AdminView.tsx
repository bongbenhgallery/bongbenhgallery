import React, { useState, useEffect } from "react";
import { ArtItem, ServiceItem } from "../types";
import { fetchArts, addArt, deleteArt, fetchServices, addService, deleteService } from "../lib/api";
import { Loader2, Plus, Trash2, Key, Check, ShieldAlert, Sparkles, LayoutGrid, Cog } from "lucide-react";

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
    // Validate passcode: Accept phone number 0989222890 or 1234
    if (passcode === "0989222890" || passcode === "1234") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("MÃ KHÔNG ĐÚNG! VUI LÒNG THỬ LẠI.");
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
      // Reset form
      setArtTitle("");
      setArtPrice("");
      setArtImageUrl("");
      setArtDescription("");
      setArtAvailable(true);
      // Reload arts list
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
      // Reset form
      setSvcTitle("");
      setSvcPrice("");
      setSvcDuration("30 phút");
      setSvcDescription("");
      setSvcAvailable(true);
      // Reload services list
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

  // Auth Gate
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center py-12 animate-fadeIn">
        <div className="w-full max-w-md pixel-border bg-retro-beige p-6 md:p-8 space-y-6 shadow-md text-center">
          <div className="inline-flex items-center justify-center bg-retro-wood text-retro-paper p-3 rounded-full border-4 border-retro-dark">
            <Key className="w-8 h-8 animate-pulse text-retro-amber" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-retro text-4xl text-retro-wood uppercase tracking-wide">
              Phòng Quản Trị
            </h2>
            <p className="text-xs font-mono text-retro-dark/70">
              Vui lòng nhập mã bảo mật của Bồng Bềnh Gallery để tiếp tục chỉnh sửa hệ thống.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="block text-xs font-pixel text-retro-dark/80">MÃ BẢO MẬT (PASSCODE):</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••"
                className="w-full bg-retro-paper border-2 border-retro-dark p-3 text-center text-lg font-mono focus:outline-none focus:ring-0"
              />
            </div>

            {errorMsg && (
              <div className="bg-retro-rose/25 border-2 border-retro-rose text-retro-rose text-xs font-pixel p-2 rounded-sm flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <button type="submit" className="pixel-btn pixel-btn-amber w-full">
              XÁC THỰC MÃ
            </button>
          </form>

          <div className="bg-retro-paper/50 border border-retro-dark/10 p-3 text-left space-y-1 rounded-sm">
            <span className="font-pixel text-[9px] text-retro-wood font-bold uppercase block">Gợi ý trải nghiệm nhanh:</span>
            <span className="text-[11px] font-mono text-retro-dark/80 leading-relaxed block">
              Sử dụng mã liên lạc chính thức của họa sĩ: <strong className="text-retro-rose">0989222890</strong> hoặc mã thử nghiệm <strong className="text-retro-rose">1234</strong> để đăng nhập.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Sub tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-retro-dark pb-4">
        <div>
          <h2 className="font-retro text-4xl text-retro-wood uppercase tracking-wide flex items-center gap-2">
            <Cog className="w-7 h-7 text-retro-wood animate-spin-slow" /> BAN QUẢN TRỊ BỒNG BỀNH
          </h2>
          <p className="text-xs text-retro-dark/70 font-mono mt-1">
            Hệ thống quản lý thời gian thực lưu trữ trên cơ sở dữ liệu Express CJS.
          </p>
        </div>

        {/* Dashboard Log out */}
        <button
          onClick={() => setIsAuthenticated(false)}
          className="pixel-btn text-[9px] bg-retro-rose text-retro-paper border-retro-dark px-3 py-1.5 hover:bg-red-700"
        >
          ĐĂNG XUẤT 🔓
        </button>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab("arts")}
          className={`pixel-btn px-4 py-2 flex items-center gap-1.5 ${
            activeSubTab === "arts" ? "pixel-btn-amber" : "bg-retro-beige text-retro-dark"
          }`}
        >
          + THÊM TÁC PHẨM
        </button>
        <button
          onClick={() => setActiveSubTab("services")}
          className={`pixel-btn px-4 py-2 flex items-center gap-1.5 ${
            activeSubTab === "services" ? "pixel-btn-amber" : "bg-retro-beige text-retro-dark"
          }`}
        >
          + THÊM HOẠT ĐỘNG
        </button>
        <button
          onClick={() => setActiveSubTab("manage")}
          className={`pixel-btn px-4 py-2 flex items-center gap-1.5 ${
            activeSubTab === "manage" ? "pixel-btn-teal" : "bg-retro-beige text-retro-dark"
          }`}
        >
          ⚙️ QUẢN LÝ DANH SÁCH ({arts.length + services.length})
        </button>
      </div>

      {/* Add Art Form */}
      {activeSubTab === "arts" && (
        <div className="pixel-border bg-retro-paper p-6 space-y-6">
          <div className="border-b border-retro-dark/15 pb-2">
            <h3 className="font-pixel text-xs text-retro-wood uppercase flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-retro-rose animate-pulse" /> ĐĂNG KÝ TÁC PHẨM MỚI VÀO PHÒNG LÃM
            </h3>
          </div>

          <form onSubmit={handleAddArt} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-pixel text-retro-dark/80">TÊN TÁC PHẨM <span className="text-retro-rose">*</span></label>
                <input
                  type="text"
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="Ví dụ: Thuyền Trăng Kênh Tẻ..."
                  className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-pixel text-retro-dark/80">HỌA SĨ SÁNG TÁC</label>
                  <input
                    type="text"
                    required
                    value={artArtist}
                    onChange={(e) => setArtArtist(e.target.value)}
                    className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-pixel text-retro-dark/80">NĂM SÁNG TÁC</label>
                  <input
                    type="text"
                    required
                    value={artYear}
                    onChange={(e) => setArtYear(e.target.value)}
                    className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-pixel text-retro-dark/80">CHẤT LIỆU</label>
                  <input
                    type="text"
                    required
                    value={artMedium}
                    onChange={(e) => setArtMedium(e.target.value)}
                    className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-pixel text-retro-dark/80">GIÁ TRANH (VND / LIÊN HỆ)</label>
                  <input
                    type="text"
                    value={artPrice}
                    onChange={(e) => setArtPrice(e.target.value)}
                    placeholder="Ví dụ: 12,000,000 VND"
                    className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-pixel text-retro-dark/80">HÌNH ẢNH URL <span className="text-retro-rose">*</span></label>
                <input
                  type="url"
                  required
                  value={artImageUrl}
                  onChange={(e) => setArtImageUrl(e.target.value)}
                  placeholder="Nhập đường dẫn ảnh từ CDN hoặc Unsplash..."
                  className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-xs focus:outline-none font-mono"
                />
                <span className="block text-[10px] text-retro-dark/60 italic">Gợi ý: Dán link ảnh Unsplash hoặc dán link ảnh có sẵn trong thư mục.</span>
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-1">
                <label className="block text-xs font-pixel text-retro-dark/80">MÔ TẢ CHI TIẾT & Ý NGHĨA TÁC PHẨM</label>
                <textarea
                  rows={6}
                  value={artDescription}
                  onChange={(e) => setArtDescription(e.target.value)}
                  placeholder="Nhập nguồn cảm hứng, chất nghệ thuật và ý nghĩa câu chuyện đằng sau bức vẽ..."
                  className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-3 bg-retro-beige p-3 border border-retro-dark/15 rounded-sm">
                <input
                  type="checkbox"
                  id="artAvailable"
                  checked={artAvailable}
                  onChange={(e) => setArtAvailable(e.target.checked)}
                  className="w-4 h-4 text-retro-wood border-retro-dark cursor-pointer"
                />
                <label htmlFor="artAvailable" className="text-xs font-pixel text-retro-wood cursor-pointer select-none">
                  Tác phẩm có sẵn để giao lưu / bán? (Mặc định: Sẵn sàng)
                </label>
              </div>

              <button
                type="submit"
                disabled={submittingArt}
                className="pixel-btn pixel-btn-amber w-full h-12 text-sm flex items-center justify-center gap-2"
              >
                {submittingArt ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> ĐANG LƯU TÁC PHẨM...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" /> ĐĂNG KÝ PHÒNG LÃM
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Service Form */}
      {activeSubTab === "services" && (
        <div className="pixel-border bg-retro-paper p-6 space-y-6">
          <div className="border-b border-retro-dark/15 pb-2">
            <h3 className="font-pixel text-xs text-retro-wood uppercase flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-retro-rose animate-pulse" /> ĐĂNG KÝ HOẠT ĐỘNG MỚI TRÊN THUYỀN
            </h3>
          </div>

          <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-pixel text-retro-dark/80">TÊN HOẠT ĐỘNG / TRẢI NGHIỆM <span className="text-retro-rose">*</span></label>
                <input
                  type="text"
                  required
                  value={svcTitle}
                  onChange={(e) => setSvcTitle(e.target.value)}
                  placeholder="Ví dụ: Đêm Nhạc Trịnh Công Sơn Mạn Thuyền..."
                  className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-pixel text-retro-dark/80">MỨC PHÍ (VND / MIỄN PHÍ) <span className="text-retro-rose">*</span></label>
                  <input
                    type="text"
                    required
                    value={svcPrice}
                    onChange={(e) => setSvcPrice(e.target.value)}
                    placeholder="Ví dụ: 200,000 VND"
                    className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-pixel text-retro-dark/80">THỜI LƯỢNG</label>
                  <input
                    type="text"
                    required
                    value={svcDuration}
                    onChange={(e) => setSvcDuration(e.target.value)}
                    placeholder="Ví dụ: 1 tiếng / 45 phút..."
                    className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-pixel text-retro-dark/80">NGƯỜI CHỦ TRÌ / HƯỚNG DẪN</label>
                <input
                  type="text"
                  required
                  value={svcProvider}
                  onChange={(e) => setSvcProvider(e.target.value)}
                  className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-1">
                <label className="block text-xs font-pixel text-retro-dark/80">MÔ TẢ CHI TIẾT HOẠT ĐỘNG</label>
                <textarea
                  rows={5}
                  value={svcDescription}
                  onChange={(e) => setSvcDescription(e.target.value)}
                  placeholder="Nhập nội dung chi tiết của hoạt động trải nghiệm, những bất ngờ thú vị và quà tặng đính kèm..."
                  className="w-full bg-retro-beige/35 border-2 border-retro-dark p-2 text-sm focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-3 bg-retro-beige p-3 border border-retro-dark/15 rounded-sm">
                <input
                  type="checkbox"
                  id="svcAvailable"
                  checked={svcAvailable}
                  onChange={(e) => setSvcAvailable(e.target.checked)}
                  className="w-4 h-4 text-retro-wood border-retro-dark cursor-pointer"
                />
                <label htmlFor="svcAvailable" className="text-xs font-pixel text-retro-wood cursor-pointer select-none">
                  Dịch vụ đã sẵn sàng phục vụ? (Mặc định: Có sẵn)
                </label>
              </div>

              <button
                type="submit"
                disabled={submittingSvc}
                className="pixel-btn pixel-btn-amber w-full h-12 text-sm flex items-center justify-center gap-2"
              >
                {submittingSvc ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> ĐANG ĐĂNG KÝ...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" /> HOÀN TẤT ĐĂNG KÝ DỊCH VỤ
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
          <div className="pixel-border bg-retro-paper p-5 space-y-4">
            <h3 className="font-retro text-2xl text-retro-wood uppercase border-b-2 border-retro-dark pb-2">
              Danh Sách Tranh ({arts.length})
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-retro-wood" />
              </div>
            ) : arts.length === 0 ? (
              <p className="text-xs font-pixel text-retro-wood/50 py-4 text-center">Chưa có tác phẩm nào.</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {arts.map((art) => (
                  <div
                    key={art.id}
                    className="flex gap-3 items-center justify-between bg-retro-beige/40 p-2 border border-retro-dark/10 hover:bg-retro-beige/70 transition-colors rounded-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-12 h-12 object-cover border border-retro-dark"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-retro text-lg text-retro-dark font-bold leading-tight line-clamp-1">{art.title}</h4>
                        <p className="text-[10px] text-retro-dark/60 font-mono mt-0.5">{art.price} — {art.year}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteArt(art.id, art.title)}
                      className="text-retro-rose hover:bg-retro-rose/20 p-2 rounded-sm border border-transparent hover:border-retro-rose/30 cursor-pointer"
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
          <div className="pixel-border bg-retro-paper p-5 space-y-4">
            <h3 className="font-retro text-2xl text-retro-wood uppercase border-b-2 border-retro-dark pb-2">
              Danh Sách Hoạt Động ({services.length})
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-retro-wood" />
              </div>
            ) : services.length === 0 ? (
              <p className="text-xs font-pixel text-retro-wood/50 py-4 text-center">Chưa có hoạt động nào.</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="flex gap-3 items-center justify-between bg-retro-beige/40 p-2 border border-retro-dark/10 hover:bg-retro-beige/70 transition-colors rounded-xs"
                  >
                    <div>
                      <h4 className="font-retro text-lg text-retro-dark font-bold leading-tight">{svc.title}</h4>
                      <p className="text-[10px] text-retro-dark/60 font-mono mt-0.5">{svc.price} — {svc.duration}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteService(svc.id, svc.title)}
                      className="text-retro-rose hover:bg-retro-rose/20 p-2 rounded-sm border border-transparent hover:border-retro-rose/30 cursor-pointer"
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
