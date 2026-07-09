import React from "react";
import { MapPin, Phone, User, Compass, Anchor, BookOpen } from "lucide-react";

export default function HomeView() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome banner */}
      <div className="pixel-border-retro bg-retro-beige p-6 relative overflow-hidden shadow-md">
        <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
          <Anchor className="w-48 h-48 text-retro-wood" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-retro-wood text-retro-paper px-3 py-1 text-xs font-pixel rounded-sm">
            <Compass className="w-4 h-4 animate-spin-slow" /> NHÀ TRIỂN LÃM DI ĐỘNG
          </div>
          <h1 className="font-retro text-5xl md:text-6xl text-retro-wood tracking-wide leading-none uppercase">
            Bồng Bềnh Gallery
          </h1>
          <p className="font-sans text-sm md:text-base text-retro-dark max-w-2xl leading-relaxed">
            Nơi hội tụ giữa hội họa đương đại, văn học cổ điển và sóng nước Sài Gòn. 
            Tọa lạc độc đáo trên một chiếc thuyền gỗ bồng bềnh tại Kênh Tẻ, triển lãm mang 
            đến cho giới mộ điệu một không gian thưởng lãm nghệ thuật đầy hoài niệm, lãng mạn và đậm chất retro.
          </p>
        </div>
      </div>

      {/* Tale of Kiều Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 pixel-border bg-retro-paper p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-retro-dark pb-3">
              <BookOpen className="w-5 h-5 text-retro-rose" />
              <h2 className="font-pixel text-xs md:text-sm text-retro-rose uppercase tracking-wider">
                Cảm Hứng Khởi Nguồn: Truyện Kiều
              </h2>
            </div>
            
            <p className="font-sans text-sm md:text-base text-retro-dark leading-relaxed">
              Tên gọi <strong className="text-retro-wood font-semibold">"Bồng Bềnh"</strong> không chỉ gợi tả nhịp chao nghiêng 
              của chiếc thuyền gỗ trên bến sông, mà còn là lời tri ân sâu sắc đến cuộc đời trôi nổi, 
              dập dềnh của nàng Kiều trong kiệt tác văn học trung đại của đại thi hào Nguyễn Du.
            </p>

            <div className="bg-retro-beige/60 p-4 border-l-4 border-retro-wood my-4">
              <p className="italic font-serif text-retro-wood text-center text-sm md:text-base leading-relaxed">
                "Trăm năm trong cõi người ta,<br />
                Chữ tài chữ mệnh khéo là ghét nhau.<br />
                Trải qua một cuộc bể dâu,<br />
                Những điều trông thấy mà đau đớn lòng."
              </p>
              <p className="text-right text-xs font-pixel text-retro-wood/80 mt-2">— Nguyễn Du, Truyện Kiều</p>
            </div>

            <p className="font-sans text-sm text-retro-dark/90 leading-relaxed">
              Người nghệ sĩ mượn nét cọ pixel hóa để phủ lên tác phẩm cổ điển một làn sương ảo ảnh hoài cổ. 
              Thúy Kiều ở lầu Ngưng Bích ngóng trông cánh buồm xa khơi, giữa trời mây sông nước bao la, 
              như tìm thấy tiếng vọng đồng điệu với thân phận của những kiếp người trôi dạt dọc theo các bến sông Sài Gòn xưa và nay.
            </p>
          </div>

          <div className="pt-4 border-t border-retro-dark/10 flex flex-wrap gap-2">
            <span className="bg-retro-beige px-2 py-1 text-xs font-mono text-retro-dark border border-retro-dark/20">#Truyện_Kiều</span>
            <span className="bg-retro-beige px-2 py-1 text-xs font-mono text-retro-dark border border-retro-dark/20">#Nguyễn_Du</span>
            <span className="bg-retro-beige px-2 py-1 text-xs font-mono text-retro-dark border border-retro-dark/20">#Hội_Họa_Pixel</span>
          </div>
        </div>

        {/* Kieu Picture Card */}
        <div className="lg:col-span-5 pixel-border bg-retro-dark p-4 flex flex-col justify-between text-retro-paper">
          <div className="relative aspect-4/3 overflow-hidden border-4 border-retro-beige">
            <img 
              src="/src/assets/images/kieu_pixel_art_1783592474719.jpg" 
              alt="Minh họa Truyện Kiều - Bồng Bềnh Gallery" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 left-2 bg-retro-rose text-retro-paper font-pixel text-[9px] px-2 py-0.5 shadow-sm">
              HOẠ BẢN #01
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="font-retro text-3xl text-retro-amber tracking-wide">
              Kều ở lầu Ngưng Bích
            </div>
            <p className="text-xs font-mono text-retro-paper/80 leading-relaxed">
              Tác phẩm biểu tượng trưng bày tại sảnh chính. Sơn dầu phong cách pixel vẽ lại nội tâm Thúy Kiều trước bối cảnh mênh mông sông nước, một nét u buồn tuyệt diệu.
            </p>
          </div>
        </div>
      </div>

      {/* Info & Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Info Card */}
        <div className="lg:col-span-5 pixel-border bg-retro-beige p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-retro-dark/20 pb-2">
              <Anchor className="w-5 h-5 text-retro-wood" />
              <h3 className="font-pixel text-xs text-retro-wood uppercase">
                Bến Đỗ Nghệ Thuật
              </h3>
            </div>
            
            <p className="font-sans text-sm text-retro-dark leading-relaxed">
              Triển lãm tọa lạc trên một chiếc du thuyền gỗ hoài cổ mang tên <strong>The Coffee Ship</strong>, 
              neo đậu vững chãi trên dòng Kênh Tẻ thơ mộng, một nhánh sông Sài Gòn lộng gió.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-retro-rose shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm">
                  <p className="font-semibold text-retro-dark">Bến thuyền Kênh Tẻ</p>
                  <p className="text-retro-dark/80">The Coffee Ship, Kênh Tẻ, Quận 7, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-retro-wood shrink-0" />
                <div className="text-xs md:text-sm">
                  <p className="font-semibold text-retro-dark">Chủ nhân & Nghệ sĩ sáng lập</p>
                  <p className="text-retro-dark/80">Họa sĩ Kinh Mai Thuyết</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-retro-teal shrink-0" />
                <div className="text-xs md:text-sm">
                  <p className="font-semibold text-retro-dark">Đường dây nóng kết nối</p>
                  <a href="tel:0989222890" className="text-retro-teal hover:underline font-mono">0989 222 890</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-retro-wood text-retro-paper p-3 text-center rounded-sm">
            <span className="font-pixel text-[10px] tracking-wider block">MỞ CỬA THƯỞNG LÃM MỖI NGÀY</span>
            <span className="font-retro text-lg text-retro-amber">08:00 AM - 10:00 PM</span>
          </div>
        </div>

        {/* Embedded Map Card */}
        <div className="lg:col-span-7 pixel-border bg-retro-paper p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b border-retro-dark/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-retro-green rounded-full animate-pulse"></span>
              <span className="font-pixel text-[10px] text-retro-dark/70 uppercase">Định vị Hải Trình (Sài Gòn)</span>
            </div>
            <a 
              href="https://maps.app.goo.gl/S4FsjjRGSEHn5rmq6" 
              target="_blank" 
              rel="noreferrer"
              className="text-[10px] font-pixel text-retro-rose hover:underline"
            >
              Mở trong Bản Đồ ↗
            </a>
          </div>

          <div className="relative rounded-sm overflow-hidden border-2 border-retro-dark bg-retro-beige min-h-[300px] flex-1">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7839.546573542662!2d106.69753997417249!3d10.751948359646548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f7344c4d211%3A0x6c706e702d1b385c!2sThe%20Coffee%20Ship!5e0!3m2!1sen!2s!4v1783591912203!5m2!1sen!2s" 
              className="absolute top-0 left-0 w-full h-full border-none"
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
              title="Bản đồ Bồng Bềnh Gallery"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
