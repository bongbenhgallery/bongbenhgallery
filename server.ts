import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface ArtItem {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  description: string;
  imageUrl: string;
  price?: string;
  available: boolean;
  createdAt: string;
}

interface ServiceItem {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  provider: string;
  available: boolean;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), "db.json");

// Pre-seeded data
const initialArts: ArtItem[] = [
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

const initialServices: ServiceItem[] = [
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

// Ensure DB exists
function initDb() {
  if (!fs.existsSync(DB_PATH)) {
    const data = {
      arts: initialArts,
      services: initialServices
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
    console.log("Database initialized with pre-seeded data.");
  }
}

function readDb() {
  initDb();
  try {
    const content = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading database:", err);
    return { arts: initialArts, services: initialServices };
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

async function startServer() {
  initDb();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Get Arts
  app.get("/api/arts", (req, res) => {
    const db = readDb();
    res.json(db.arts);
  });

  // API: Add Art
  app.post("/api/arts", (req, res) => {
    const db = readDb();
    const newArt: ArtItem = {
      id: "art-" + Date.now(),
      title: req.body.title || "Tác phẩm chưa đặt tên",
      artist: req.body.artist || "Nghệ sĩ vô danh",
      year: req.body.year || new Date().getFullYear().toString(),
      medium: req.body.medium || "Chất liệu hỗn hợp",
      description: req.body.description || "Chưa có mô tả chi tiết.",
      imageUrl: req.body.imageUrl || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=60",
      price: req.body.price || "Liên hệ nghệ sĩ",
      available: req.body.available !== undefined ? req.body.available : true,
      createdAt: new Date().toISOString()
    };
    db.arts.push(newArt);
    writeDb(db);
    res.status(201).json(newArt);
  });

  // API: Delete Art
  app.delete("/api/arts/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const initialCount = db.arts.length;
    db.arts = db.arts.filter((art: any) => art.id !== id);
    if (db.arts.length === initialCount) {
      return res.status(404).json({ error: "Art not found" });
    }
    writeDb(db);
    res.json({ success: true, message: "Art removed successfully" });
  });

  // API: Get Services
  app.get("/api/services", (req, res) => {
    const db = readDb();
    res.json(db.services);
  });

  // API: Add Service
  app.post("/api/services", (req, res) => {
    const db = readDb();
    const newService: ServiceItem = {
      id: "service-" + Date.now(),
      title: req.body.title || "Dịch vụ mới",
      price: req.body.price || "Miễn phí",
      duration: req.body.duration || "Chưa rõ thời lượng",
      description: req.body.description || "Chưa có mô tả chi tiết.",
      provider: req.body.provider || "Bồng Bềnh Team",
      available: req.body.available !== undefined ? req.body.available : true,
      createdAt: new Date().toISOString()
    };
    db.services.push(newService);
    writeDb(db);
    res.status(201).json(newService);
  });

  // API: Delete Service
  app.delete("/api/services/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const initialCount = db.services.length;
    db.services = db.services.filter((svc: any) => svc.id !== id);
    if (db.services.length === initialCount) {
      return res.status(404).json({ error: "Service not found" });
    }
    writeDb(db);
    res.json({ success: true, message: "Service removed successfully" });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bồng Bềnh Gallery server running on http://localhost:${PORT}`);
  });
}

startServer();
