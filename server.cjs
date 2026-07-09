var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var DB_PATH = import_path.default.join(process.cwd(), "db.json");
var initialArts = [
  {
    id: "art-1",
    title: "Ki\u1EC1u \u1EDF l\u1EA7u Ng\u01B0ng B\xEDch",
    artist: "Kinh Mai Thuy\u1EBFt",
    year: "2026",
    medium: "S\u01A1n d\u1EA7u tr\xEAn toan (Phong c\xE1ch Pixelated)",
    description: "M\u1ED9t t\xE1c ph\u1EA9m x\xFAc \u0111\u1ED9ng l\u1ED9t t\u1EA3 c\u1EA3nh Th\xFAy Ki\u1EC1u c\xF4 \u0111\u01A1n ng\xF3ng tr\xF4ng v\u1EC1 ph\xEDa c\u1EEDa b\u1EC3 xa x\u0103m t\u1EEB l\u1EA7u Ng\u01B0ng B\xEDch. \xC1nh tr\u0103ng m\u1EDD \u1EA3o c\xF9ng nh\u1EEFng l\u1EDBp s\xF3ng b\u1EA1c \u0111\u01B0\u1EE3c t\xE1i hi\u1EC7n t\u1EC9 m\u1EC9 d\u01B0\u1EDBi phong c\xE1ch retro pixel \u0111\u1EA7y ch\u1EA5t th\u01A1.",
    imageUrl: "/src/assets/images/kieu_pixel_art_1783592474719.jpg",
    price: "15,000,000 VND",
    available: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "art-2",
    title: "B\xECnh Minh K\xEAnh T\u1EBB",
    artist: "Kinh Mai Thuy\u1EBFt",
    year: "2025",
    medium: "S\u01A1n m\xE0i tr\xEAn g\u1ED7 l\u0169a",
    description: "T\xE1c ph\u1EA9m kh\u1EAFc h\u1ECDa nh\u1EEFng tia n\u1EAFng v\xE0ng \u0111\u1EA7u ti\xEAn chi\u1EBFu r\u1ECDi xu\u1ED1ng d\xF2ng K\xEAnh T\u1EBB th\u01A1 m\u1ED9ng, n\u01A1i nh\u1EEFng chi\u1EBFc ghe thuy\u1EC1n b\u1EAFt \u0111\u1EA7u m\u1ED9t ng\xE0y m\u1EDBi t\u1EA5p n\u1EADp. M\xE0u v\xE0ng \xF3ng \u0111\u1EB7c tr\u01B0ng c\u1EE7a s\u01A1n m\xE0i k\u1EBFt h\u1EE3p v\u1EDBi n\xE9t m\u1ED9c m\u1EA1c c\u1EE7a g\u1ED7.",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=60",
    price: "12,500,000 VND",
    available: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "art-3",
    title: "B\u1ED3ng B\u1EC1nh Chi\u1EC1u Ho\xE0ng H\xF4n",
    artist: "Kinh Mai Thuy\u1EBFt",
    year: "2026",
    medium: "M\xE0u n\u01B0\u1EDBc tr\xEAn gi\u1EA5y m\u1EF9 thu\u1EADt",
    description: "Khung c\u1EA3nh qu\xE1n c\xE0 ph\xEA The Coffee Ship m\u1ED9c m\u1EA1c b\u1ED3ng b\u1EC1nh tr\xEAn d\xF2ng s\xF4ng l\xFAc ho\xE0ng h\xF4n bu\xF4ng xu\u1ED1ng. S\u1EAFc h\u1ED3ng t\xEDm d\u1ECBu nh\u1EB9 h\xF2a c\xF9ng \xE1nh \u0111\xE8n lung linh h\u1EAFt hiu t\u1EEB khung c\u1EEDa s\u1ED5 m\u1EA1n thuy\u1EC1n.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=60",
    price: "8,000,000 VND",
    available: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "art-4",
    title: "Tr\u0103ng Ly H\u01B0\u01A1ng",
    artist: "Kinh Mai Thuy\u1EBFt",
    year: "2024",
    medium: "Tranh m\u1EF1c nho (Th\u1EE7y m\u1EB7c)",
    description: "L\u1EA5y c\u1EA3m h\u1EE9ng t\u1EEB t\xE2m tr\u1EA1ng nh\u1EDB qu\xEA h\u01B0\u01A1ng da di\u1EBFt trong th\u01A1 c\u1ED5, b\u1EE9c tranh l\xE0 s\u1EF1 giao thoa gi\u1EEFa ngh\u1EC7 thu\u1EADt th\u1EE7y m\u1EB7c truy\u1EC1n th\u1ED1ng v\xE0 n\xE9t ch\u1EA5m ph\xE1 k\u1EF9 thu\u1EADt s\u1ED1 retro.",
    imageUrl: "https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=800&auto=format&fit=crop&q=60",
    price: "6,500,000 VND",
    available: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
var initialServices = [
  {
    id: "service-1",
    title: "K\xFD h\u1ECDa Ch\xE2n dung B\u1EBFn S\xF4ng",
    price: "150,000 VND",
    duration: "20 ph\xFAt",
    description: "Tr\u1EF1c ti\u1EBFp v\u1EBD k\xFD h\u1ECDa ch\xE2n dung b\u1EB1ng than c\u1EE7i ho\u1EB7c b\xFAt s\u1EAFt b\u1EDFi ngh\u1EC7 s\u0129 Kinh Mai Thuy\u1EBFt ngay tr\xEAn boong t\xE0u l\u1ED9ng gi\xF3. T\u1EB7ng k\xE8m m\u1ED9t ly c\xE0 ph\xEA mu\u1ED1i S\xE0i G\xF2n \u0111\u1EADm v\u1ECB.",
    provider: "H\u1ECDa s\u0129 Kinh Mai Thuy\u1EBFt",
    available: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "service-2",
    title: "Workshop Tr\u1EA3i nghi\u1EC7m S\u01A1n m\xE0i Retro",
    price: "450,000 VND",
    duration: "2 gi\u1EDD",
    description: "L\u1EDBp h\u1ECDc tr\u1EA3i nghi\u1EC7m l\xE0m tranh s\u01A1n m\xE0i mini phong c\xE1ch retro. B\u1EA1n s\u1EBD \u0111\u01B0\u1EE3c t\u1EF1 tay m\xE0i tranh d\u01B0\u1EDBi s\u1EF1 h\u01B0\u1EDBng d\u1EABn c\u1EE7a h\u1ECDa s\u0129 v\xE0 mang t\xE1c ph\u1EA9m c\u1EE7a m\xECnh v\u1EC1 nh\xE0.",
    provider: "B\u1ED3ng B\u1EC1nh Team",
    available: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "service-3",
    title: "Tour Tr\xE0 Chi\u1EC1u & Th\u01B0\u1EDFng ngo\u1EA1n Truy\u1EC7n Ki\u1EC1u",
    price: "100,000 VND",
    duration: "45 ph\xFAt",
    description: "Bu\u1ED5i tr\xF2 chuy\u1EC7n th\xE2n m\u1EADt b\xEAn m\u1EA1n thuy\u1EC1n, th\u01B0\u1EDFng th\u1EE9c tr\xE0 hoa sen S\xE0i G\xF2n, nghe k\u1EC3 v\u1EC1 nh\u1EEFng ngu\u1ED3n c\u1EA3m h\u1EE9ng v\u0103n h\u1ECDc c\u1ED5 v\xE0 ph\xE2n t\xEDch c\xE1c b\u1EE9c h\u1ECDa v\u1EBD Th\xFAy Ki\u1EC1u.",
    provider: "B\u1ED3ng B\u1EC1nh Gallery Guides",
    available: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
function initDb() {
  if (!import_fs.default.existsSync(DB_PATH)) {
    const data = {
      arts: initialArts,
      services: initialServices
    };
    import_fs.default.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
    console.log("Database initialized with pre-seeded data.");
  }
}
function readDb() {
  initDb();
  try {
    const content = import_fs.default.readFileSync(DB_PATH, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading database:", err);
    return { arts: initialArts, services: initialServices };
  }
}
function writeDb(data) {
  try {
    import_fs.default.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}
async function startServer() {
  initDb();
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/arts", (req, res) => {
    const db = readDb();
    res.json(db.arts);
  });
  app.post("/api/arts", (req, res) => {
    const db = readDb();
    const newArt = {
      id: "art-" + Date.now(),
      title: req.body.title || "T\xE1c ph\u1EA9m ch\u01B0a \u0111\u1EB7t t\xEAn",
      artist: req.body.artist || "Ngh\u1EC7 s\u0129 v\xF4 danh",
      year: req.body.year || (/* @__PURE__ */ new Date()).getFullYear().toString(),
      medium: req.body.medium || "Ch\u1EA5t li\u1EC7u h\u1ED7n h\u1EE3p",
      description: req.body.description || "Ch\u01B0a c\xF3 m\xF4 t\u1EA3 chi ti\u1EBFt.",
      imageUrl: req.body.imageUrl || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=60",
      price: req.body.price || "Li\xEAn h\u1EC7 ngh\u1EC7 s\u0129",
      available: req.body.available !== void 0 ? req.body.available : true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    db.arts.push(newArt);
    writeDb(db);
    res.status(201).json(newArt);
  });
  app.delete("/api/arts/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const initialCount = db.arts.length;
    db.arts = db.arts.filter((art) => art.id !== id);
    if (db.arts.length === initialCount) {
      return res.status(404).json({ error: "Art not found" });
    }
    writeDb(db);
    res.json({ success: true, message: "Art removed successfully" });
  });
  app.get("/api/services", (req, res) => {
    const db = readDb();
    res.json(db.services);
  });
  app.post("/api/services", (req, res) => {
    const db = readDb();
    const newService = {
      id: "service-" + Date.now(),
      title: req.body.title || "D\u1ECBch v\u1EE5 m\u1EDBi",
      price: req.body.price || "Mi\u1EC5n ph\xED",
      duration: req.body.duration || "Ch\u01B0a r\xF5 th\u1EDDi l\u01B0\u1EE3ng",
      description: req.body.description || "Ch\u01B0a c\xF3 m\xF4 t\u1EA3 chi ti\u1EBFt.",
      provider: req.body.provider || "B\u1ED3ng B\u1EC1nh Team",
      available: req.body.available !== void 0 ? req.body.available : true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    db.services.push(newService);
    writeDb(db);
    res.status(201).json(newService);
  });
  app.delete("/api/services/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const initialCount = db.services.length;
    db.services = db.services.filter((svc) => svc.id !== id);
    if (db.services.length === initialCount) {
      return res.status(404).json({ error: "Service not found" });
    }
    writeDb(db);
    res.json({ success: true, message: "Service removed successfully" });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`B\u1ED3ng B\u1EC1nh Gallery server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
