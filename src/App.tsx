import React, { useState } from "react";
import { ActiveTab } from "./types";
import Layout from "./components/Layout";
import HomeView from "./components/HomeView";
import GalleryView from "./components/GalleryView";
import HistoryView from "./components/HistoryView";
import ServicesView from "./components/ServicesView";
import AdminView from "./components/AdminView";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return <HomeView />;
      case "gallery":
        return <GalleryView />;
      case "history":
        return <HistoryView />;
      case "services":
        return <ServicesView />;
      case "admin":
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActiveView()}
    </Layout>
  );
}
