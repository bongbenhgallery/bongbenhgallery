export interface ArtItem {
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

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  provider: string;
  available: boolean;
  createdAt: string;
}

export type ActiveTab = "home" | "gallery" | "history" | "services" | "admin" | "tide";
