import React, { useState, useEffect } from "react";
import { ServiceItem } from "../types";
import { fetchServices } from "../lib/api";
import { Loader2, Sparkles, Clock, User, Heart, Send, X, Compass, Calendar, Bookmark } from "lucide-react";

export default function ServicesView() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [inquiredService, setInquiredService] = useState<ServiceItem | null>(null);
  const [inquirerName, setInquirerName] = useState("");
  const [inquirerPhone, setInquirerPhone] = useState("");
  const [inquirySent, setInquirySent] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await fetchServices();
        setArtsServices(data);
      } catch (err) {
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();

    // Helper to bypass typescript warning if any
    function setArtsServices(items: ServiceItem[]) {
      setServices(items);
    }
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquirerName || !inquirerPhone) return;
    
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      const servTitle = inquiredService?.title || "Dịch vụ";
      setInquiredService(null);
      setInquirerName("");
      setInquirerPhone("");
      setShowNotification(`Yêu cầu đăng ký khóa học "${servTitle}" đã được gửi tới Ban Biên Tập Bồng Bềnh và họa sĩ Kinh Mai Thuyết. Chúng tôi sẽ liên hệ lại qua SĐT sớm nhất!`);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-mat-charcoal/15 pb-6">
        <span className="font-mono text-xs text-mat-crimson font-bold uppercase tracking-wider block">
          KHÔNG GIAN TƯƠNG TÁC
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-mat-charcoal font-black tracking-tight mt-1">
          Hoạt Động & Trải Nghiệm Di Sản
        </h2>
        <p className="text-xs md:text-sm text-mat-charcoal/70 max-w-xl mt-1">
          Đăng ký tham gia các buổi đàm đạo nghệ thuật, lớp vẽ tranh cổ hoài cổ, và thưởng trà ngắm sóng Kênh Tẻ được tổ chức trên du thuyền Bồng Bềnh.
        </p>
      </div>

      {showNotification && (
        <div className="bg-mat-jade/10 border border-mat-jade p-5 rounded-2xl flex items-start gap-3 relative animate-fadeIn">
          <div className="bg-mat-jade text-white p-1.5 rounded-lg shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-mat-ochre" />
          </div>
          <div className="text-xs md:text-sm text-mat-charcoal">
            <span className="font-bold text-mat-jade block">Đăng Ký Thành Công!</span>
            {showNotification}
          </div>
          <button 
            onClick={() => setShowNotification(null)}
            className="absolute right-3 top-3 text-mat-charcoal/50 hover:text-mat-charcoal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-mat-crimson" />
          <p className="font-mono text-xs text-mat-crimson font-bold animate-pulse">ĐANG THIẾT LẬP LỊCH TRÌNH TRẢI NGHIỆM...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="mat-card bg-white p-12 text-center">
          <p className="font-serif text-lg text-mat-charcoal/60 italic">Hiện tại chưa có sự kiện trải nghiệm mới nào được phát hành.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white mat-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden"
            >
              {/* Subtle heritage background watermark */}
              <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-8 translate-y-8">
                <Compass className="w-40 h-40 text-mat-crimson" />
              </div>

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between border-b border-mat-charcoal/10 pb-2.5">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    service.available 
                      ? "bg-mat-jade/10 text-mat-jade border border-mat-jade/20" 
                      : "bg-mat-crimson/10 text-mat-crimson border border-mat-crimson/20"
                  }`}>
                    {service.available ? "ĐĂNG KÝ NGAY" : "HẾT SUẤT"}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs font-mono text-mat-charcoal/60">
                    <Clock className="w-3.5 h-3.5 text-mat-crimson" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-mat-charcoal leading-tight">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-mat-charcoal/70 font-mono">
                    <User className="w-3.5 h-3.5 text-mat-ochre" />
                    <span>Họa sĩ: {service.provider}</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-mat-charcoal/80 leading-relaxed font-serif min-h-[72px]">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-mat-charcoal/10 flex items-center justify-between relative z-10">
                <div className="space-y-0.5">
                  <span className="block text-[9px] font-mono text-mat-charcoal/50 font-bold uppercase">HỌC PHÍ / CHÍ PHÍ</span>
                  <span className="font-serif text-lg md:text-xl text-mat-crimson font-black tracking-tight">
                    {service.price}
                  </span>
                </div>

                <button
                  onClick={() => setInquiredService(service)}
                  disabled={!service.available}
                  className={`px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer border ${
                    service.available 
                      ? "bg-mat-crimson hover:bg-mat-crimson/95 text-white border-mat-crimson shadow" 
                      : "bg-black/5 text-mat-charcoal/30 border-transparent cursor-not-allowed"
                  }`}
                >
                  {service.available ? "ĐĂNG KÝ" : "HẾT GHẾ"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form Modal */}
      {inquiredService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mat-charcoal/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#F4EFE6] border-4 border-mat-crimson rounded-3xl overflow-hidden shadow-2xl animate-zoomIn">
            
            {/* Modal Header */}
            <div className="bg-mat-crimson text-white p-5 flex items-center justify-between border-b-2 border-mat-ochre">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-mat-ochre animate-pulse" />
                <span className="font-mono text-xs text-mat-ochre font-bold uppercase tracking-wider">
                  GIAO ƯỚC THAM GIA TRẢI NGHIỆM
                </span>
              </div>
              <button
                onClick={() => setInquiredService(null)}
                className="text-white hover:text-mat-ochre transition-all cursor-pointer p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInquirySubmit} className="p-6 space-y-5">
              <div className="bg-white p-4 border border-mat-charcoal/10 rounded-2xl shadow-sm">
                <p className="text-[9px] font-mono text-mat-charcoal/40 font-bold uppercase">BẠN ĐANG ĐĂNG KÝ</p>
                <p className="font-serif text-xl font-bold text-mat-crimson leading-tight mt-1">{inquiredService.title}</p>
                <div className="flex justify-between items-center text-xs font-mono text-mat-charcoal/60 mt-2 border-t border-mat-charcoal/5 pt-2">
                  <span>Học phí: {inquiredService.price}</span>
                  <span>Thời lượng: {inquiredService.duration}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-mat-charcoal/80">
                    Tên của quý khách <span className="text-mat-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={inquirerName}
                    onChange={(e) => setInquirerName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                    className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-mat-charcoal/80">
                    Số điện thoại liên hệ <span className="text-mat-crimson">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquirerPhone}
                    onChange={(e) => setInquirerPhone(e.target.value)}
                    placeholder="Nhập số điện thoại di động..."
                    className="w-full bg-white border border-mat-charcoal/15 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mat-crimson/20"
                  />
                </div>
              </div>

              <div className="text-[10px] text-mat-charcoal/60 leading-relaxed bg-white/60 p-3 rounded-xl border border-mat-charcoal/5 font-mono">
                💡 Sau khi gởi yêu cầu, thông tin sẽ được truyền trực tiếp đến bộ phận tổ chức của bến thuyền. Quý khách vui lòng lưu số Hotline <strong className="text-mat-crimson">0989 222 890</strong> để nhận cuộc gọi xác nhận lịch rước mạn thuyền gỗ.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInquiredService(null)}
                  className="px-4 py-2 bg-white hover:bg-black/5 text-mat-charcoal border border-mat-charcoal/15 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
                >
                  BỎ QUA
                </button>
                <button
                  type="submit"
                  disabled={inquirySent}
                  className="px-5 py-2 bg-mat-crimson hover:bg-mat-crimson/95 text-white font-mono text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md border border-mat-ochre/20 cursor-pointer"
                >
                  {inquirySent ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-mat-ochre" /> ĐANG ĐĂNG KÝ...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-mat-ochre" /> GỬI PHIẾU ĐĂNG KÝ
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
