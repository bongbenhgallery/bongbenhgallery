import React, { useState, useEffect } from "react";
import { ServiceItem } from "../types";
import { fetchServices } from "../lib/api";
import { Loader2, Sparkles, Clock, User, Heart, Send, X } from "lucide-react";

export default function ServicesView() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [inquiredService, setInquiredService] = useState<ServiceItem | null>(null);
  const [inquirerName, setInquirerName] = useState("");
  const [inquirerPhone, setInquirerPhone] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquirerName || !inquirerPhone) return;
    
    // Simulate inquiry recording
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiredService(null);
      setInquirerName("");
      setInquirerPhone("");
      alert(`Yêu cầu đăng ký dịch vụ của bạn đã được chuyển đến Họa sĩ Kinh Mai Thuyết. Chúng tôi sẽ gọi lại cho bạn sớm nhất!`);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b-4 border-retro-dark pb-4">
        <h2 className="font-retro text-4xl text-retro-wood uppercase tracking-wide">
          Hoạt Động & Trải Nghiệm
        </h2>
        <p className="text-xs text-retro-dark/70 font-mono mt-1">
          Các dịch vụ nghệ thuật và hội thảo tương tác độc đáo được tổ chức ngay trên bến thuyền Bồng Bềnh
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-retro-wood" />
          <p className="font-pixel text-[11px] text-retro-wood">ĐANG SẮP XẾP LỊCH HOẠT ĐỘNG...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="pixel-border bg-retro-beige/50 p-12 text-center">
          <p className="font-pixel text-sm text-retro-wood/60">Chưa có hoạt động nào được lên lịch.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="pixel-border bg-retro-paper p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-retro-dark/10 pb-2">
                  <span className="font-pixel text-[9px] bg-retro-wood text-retro-paper px-2 py-0.5 shadow-sm">
                    {service.available ? "ĐANG MỞ" : "TẠM NGƯNG"}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-retro-dark/60">
                    <Clock className="w-3.5 h-3.5 text-retro-rose" />
                    {service.duration}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-retro text-2xl text-retro-wood tracking-wide uppercase leading-tight">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-retro-dark/70 font-mono">
                    <User className="w-3.5 h-3.5 text-retro-teal" />
                    Hướng dẫn: {service.provider}
                  </div>
                </div>

                <p className="text-xs md:text-sm text-retro-dark/90 leading-relaxed min-h-[80px]">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-retro-dark/10 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block text-[8px] font-pixel text-retro-dark/50">HỌC PHÍ / GIÁ</span>
                  <span className="font-retro text-2xl text-retro-rose font-medium">
                    {service.price}
                  </span>
                </div>

                <button
                  onClick={() => setInquiredService(service)}
                  disabled={!service.available}
                  className={`pixel-btn px-3 py-1.5 ${
                    service.available 
                      ? "pixel-btn-amber" 
                      : "bg-retro-beige/40 text-retro-dark/30 cursor-not-allowed border-retro-dark/30 shadow-none hover:translate-none"
                  }`}
                >
                  {service.available ? "ĐĂNG KÝ" : "HẾT CHỖ"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form Modal */}
      {inquiredService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-dark/75 backdrop-blur-xs">
          <div className="relative w-full max-w-md pixel-border-retro bg-retro-paper animate-zoomIn">
            {/* Modal Header */}
            <div className="bg-retro-wood text-retro-paper p-4 flex items-center justify-between border-b-4 border-retro-dark">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-retro-amber animate-pulse" />
                <span className="font-pixel text-[10px] text-retro-amber">
                  ĐĂNG KÝ TRẢI NGHIỆM
                </span>
              </div>
              <button
                onClick={() => setInquiredService(null)}
                className="text-retro-paper hover:text-retro-amber transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
              <div className="bg-retro-beige/60 p-3 border border-retro-dark/15 rounded-sm">
                <p className="text-[10px] font-pixel text-retro-wood">DỊCH VỤ LỰA CHỌN</p>
                <p className="font-retro text-2xl text-retro-wood uppercase mt-0.5">{inquiredService.title}</p>
                <div className="flex justify-between items-center text-xs text-retro-dark/80 font-mono mt-1">
                  <span>Giá: {inquiredService.price}</span>
                  <span>Thời lượng: {inquiredService.duration}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-pixel text-retro-dark/80">
                    Tên của bạn <span className="text-retro-rose">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={inquirerName}
                    onChange={(e) => setInquirerName(e.target.value)}
                    placeholder="Nhập tên đầy đủ..."
                    className="w-full bg-retro-beige/30 border-2 border-retro-dark p-2 text-sm font-sans focus:outline-none focus:bg-retro-beige/65"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-pixel text-retro-dark/80">
                    Số điện thoại <span className="text-retro-rose">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquirerPhone}
                    onChange={(e) => setInquirerPhone(e.target.value)}
                    placeholder="Nhập số điện thoại liên lạc..."
                    className="w-full bg-retro-beige/30 border-2 border-retro-dark p-2 text-sm font-sans focus:outline-none focus:bg-retro-beige/65"
                  />
                </div>
              </div>

              <div className="text-[10px] text-retro-dark/60 leading-relaxed bg-retro-beige/30 p-2 rounded-xs">
                * Dữ liệu đăng ký được chuyển tiếp trực tiếp đến họa sĩ quản lý bến thuyền qua hệ thống backend để sắp xếp lịch hẹn. Quý khách vui lòng để điện thoại mở sau khi đăng ký.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInquiredService(null)}
                  className="pixel-btn bg-retro-beige hover:bg-retro-beige/80 px-3 py-1.5"
                >
                  HỦY
                </button>
                <button
                  type="submit"
                  disabled={inquirySent}
                  className="pixel-btn pixel-btn-amber px-4 py-1.5 flex items-center gap-1.5"
                >
                  {inquirySent ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> ĐANG GỬI...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> GỬI YÊU CẦU
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
