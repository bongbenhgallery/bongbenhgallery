import { ArtItem, ServiceItem } from "../types";

export async function fetchArts(): Promise<ArtItem[]> {
  try {
    const res = await fetch("/api/arts");
    if (!res.ok) throw new Error("Failed to fetch arts");
    return await res.json();
  } catch (err) {
    console.error("fetchArts error:", err);
    return [];
  }
}

export async function addArt(art: Omit<ArtItem, "id" | "createdAt">): Promise<ArtItem | null> {
  try {
    const res = await fetch("/api/arts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(art),
    });
    if (!res.ok) throw new Error("Failed to add art");
    return await res.json();
  } catch (err) {
    console.error("addArt error:", err);
    return null;
  }
}

export async function deleteArt(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/arts/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error("deleteArt error:", err);
    return false;
  }
}

export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch("/api/services");
    if (!res.ok) throw new Error("Failed to fetch services");
    return await res.json();
  } catch (err) {
    console.error("fetchServices error:", err);
    return [];
  }
}

export async function addService(service: Omit<ServiceItem, "id" | "createdAt">): Promise<ServiceItem | null> {
  try {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    });
    if (!res.ok) throw new Error("Failed to add service");
    return await res.json();
  } catch (err) {
    console.error("addService error:", err);
    return null;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error("deleteService error:", err);
    return false;
  }
}
