import { ArtItem, ServiceItem } from "../types";

// Pre-seeded static data for local storage fallback
const INITIAL_ARTS: ArtItem[] = [
  {
    id: "art-1",
    title: "Kiều ở lầu Ngưng Bích",
    artist: "Kinh Mai Thuyết",
    year: "2026",
    medium: "Sơn dầu trên toan (Phong cách Pixelated)",
    description: "Một tác phẩm xúc động lột tả cảnh Thúy Kiều cô đơn ngóng trông về phía cửa bể xa xăm từ lầu Ngưng Bích. Ánh trăng mờ ảo cùng những lớp sóng bạc được tái hiện tỉ mỉ dưới phong cách retro pixel đầy chất thơ.",
    imageUrl: "/src/assets/images/kieu_pixel_art_1783592474719.jpg",
    price: "15,000,000 VND",
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "art-2",
    title: "Bình Minh Kênh Tẻ",
    artist: "Kinh Mai Thuyết",
    year: "2025",
    medium: "Sơn mài trên gỗ lũa",
    description: "Tác phẩm khắc họa những tia nắng vàng đầu tiên chiếu rọi xuống dòng Kênh Tẻ thơ mộng, nơi những chiếc ghe thuyền bắt đầu một ngày mới tấp nập. Màu vàng óng đặc trưng của sơn mài kết hợp với nét mộc mạc của gỗ.",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=60",
    price: "12,500,000 VND",
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "art-3",
    title: "Bồng Bềnh Chiều Hoàng Hôn",
    artist: "Kinh Mai Thuyết",
    year: "2026",
    medium: "Màu nước trên giấy mỹ thuật",
    description: "Khung cảnh quán cà phê The Coffee Ship mộc mạc bồng bềnh trên dòng sông lúc hoàng hôn buông xuống. Sắc hồng tím dịu nhẹ hòa cùng ánh đèn lung linh hắt hiu từ khung cửa sổ mạn thuyền.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=60",
    price: "8,000,000 VND",
    available: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "art-4",
    title: "Trăng Ly Hương",
    artist: "Kinh Mai Thuyết",
    year: "2024",
    medium: "Tranh mực nho (Thủy mặc)",
    description: "Lấy cảm hứng từ tâm trạng nhớ quê hương da diết trong thơ cổ, bức tranh là sự giao thoa giữa nghệ thuật thủy mặc truyền thống và nét chấm phá kỹ thuật số retro.",
    imageUrl: "https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=800&auto=format&fit=crop&q=60",
    price: "6,500,000 VND",
    available: true,
    createdAt: new Date().toISOString()
  }
];

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "service-1",
    title: "Ký họa Chân dung Bến Sông",
    price: "150,000 VND",
    duration: "20 phút",
    description: "Trực tiếp vẽ ký họa chân dung bằng than củi hoặc bút sắt bởi nghệ sĩ Kinh Mai Thuyết ngay trên boong tàu lộng gió. Tặng kèm một ly cà phê muối Sài Gòn đậm vị.",
    provider: "Họa sĩ Kinh Mai Thuyết",
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "service-2",
    title: "Workshop Trải nghiệm Sơn mài Retro",
    price: "450,000 VND",
    duration: "2 giờ",
    description: "Lớp học trải nghiệm làm tranh sơn mài mini phong cách retro. Bạn sẽ được tự tay mài tranh dưới sự hướng dẫn của họa sĩ và mang tác phẩm của mình về nhà.",
    provider: "Bồng Bềnh Team",
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "service-3",
    title: "Tour Trà Chiều & Thưởng ngoạn Truyện Kiều",
    price: "100,000 VND",
    duration: "45 phút",
    description: "Buổi trò chuyện thân mật bên mạn thuyền, thưởng thức trà hoa sen Sài Gòn, nghe kể về những nguồn cảm hứng văn học cổ và phân tích các bức họa vẽ Thúy Kiều.",
    provider: "Bồng Bềnh Gallery Guides",
    available: true,
    createdAt: new Date().toISOString()
  }
];

// Helper to check if backend API is working (dynamic check)
let useLocalStorageFallback = false;

// Client-side Local Storage Database engine
function getLSAriItems(): ArtItem[] {
  const data = localStorage.getItem("bongbenh_arts");
  if (!data) {
    localStorage.setItem("bongbenh_arts", JSON.stringify(INITIAL_ARTS));
    return INITIAL_ARTS;
  }
  return JSON.parse(data);
}

function setLSAriItems(arts: ArtItem[]) {
  localStorage.setItem("bongbenh_arts", JSON.stringify(arts));
}

function getLSServiceItems(): ServiceItem[] {
  const data = localStorage.getItem("bongbenh_services");
  if (!data) {
    localStorage.setItem("bongbenh_services", JSON.stringify(INITIAL_SERVICES));
    return INITIAL_SERVICES;
  }
  return JSON.parse(data);
}

function setLSServiceItems(services: ServiceItem[]) {
  localStorage.setItem("bongbenh_services", JSON.stringify(services));
}

// FETCH ARTS
export async function fetchArts(): Promise<ArtItem[]> {
  if (useLocalStorageFallback) {
    return getLSAriItems();
  }
  try {
    const res = await fetch("/api/arts");
    if (!res.ok) throw new Error("Failed to fetch arts");
    return await res.json();
  } catch (err) {
    console.warn("API Server not reachable. Switching to client-side LocalStorage DB mode.", err);
    useLocalStorageFallback = true;
    return getLSAriItems();
  }
}

// ADD ART
export async function addArt(art: Omit<ArtItem, "id" | "createdAt">): Promise<ArtItem | null> {
  if (useLocalStorageFallback) {
    const newArt: ArtItem = {
      ...art,
      id: "art-" + Date.now(),
      createdAt: new Date().toISOString()
    };
    const current = getLSAriItems();
    current.push(newArt);
    setLSAriItems(current);
    return newArt;
  }
  try {
    const res = await fetch("/api/arts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(art),
    });
    if (!res.ok) throw new Error("Failed to add art");
    return await res.json();
  } catch (err) {
    console.warn("API Server failed for addArt. Retrying with LocalStorage DB.", err);
    useLocalStorageFallback = true;
    return addArt(art);
  }
}

// DELETE ART
export async function deleteArt(id: string): Promise<boolean> {
  if (useLocalStorageFallback) {
    const current = getLSAriItems();
    const filtered = current.filter(art => art.id !== id);
    if (filtered.length === current.length) return false;
    setLSAriItems(filtered);
    return true;
  }
  try {
    const res = await fetch(`/api/arts/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.warn("API Server failed for deleteArt. Retrying with LocalStorage DB.", err);
    useLocalStorageFallback = true;
    return deleteArt(id);
  }
}

// FETCH SERVICES
export async function fetchServices(): Promise<ServiceItem[]> {
  if (useLocalStorageFallback) {
    return getLSServiceItems();
  }
  try {
    const res = await fetch("/api/services");
    if (!res.ok) throw new Error("Failed to fetch services");
    return await res.json();
  } catch (err) {
    console.warn("API Server not reachable for services. Switching to client-side LocalStorage DB mode.", err);
    useLocalStorageFallback = true;
    return getLSServiceItems();
  }
}

// ADD SERVICE
export async function addService(service: Omit<ServiceItem, "id" | "createdAt">): Promise<ServiceItem | null> {
  if (useLocalStorageFallback) {
    const newService: ServiceItem = {
      ...service,
      id: "service-" + Date.now(),
      createdAt: new Date().toISOString()
    };
    const current = getLSServiceItems();
    current.push(newService);
    setLSServiceItems(current);
    return newService;
  }
  try {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    });
    if (!res.ok) throw new Error("Failed to add service");
    return await res.json();
  } catch (err) {
    console.warn("API Server failed for addService. Retrying with LocalStorage DB.", err);
    useLocalStorageFallback = true;
    return addService(service);
  }
}

// DELETE SERVICE
export async function deleteService(id: string): Promise<boolean> {
  if (useLocalStorageFallback) {
    const current = getLSServiceItems();
    const filtered = current.filter(svc => svc.id !== id);
    if (filtered.length === current.length) return false;
    setLSServiceItems(filtered);
    return true;
  }
  try {
    const res = await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.warn("API Server failed for deleteService. Retrying with LocalStorage DB.", err);
    useLocalStorageFallback = true;
    return deleteService(id);
  }
}
