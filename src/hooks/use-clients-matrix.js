"use client";

import { useState, useMemo } from "react";
import { initialClients, statusConfig } from "@/constants/clients";

export function useClientsMatrix() {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("TOUS");
  const [filterAssetType, setFilterAssetType] = useState("TOUS");
  const [filterInterest, setFilterInterest] = useState("TOUS");
  const [filterBuilding, setFilterBuilding] = useState("TOUS");
  const [selectedClient, setSelectedClient] = useState(null);
  const [notification, setNotification] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const updateStatus = (id, status) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    setSelectedClient((prev) =>
      prev?.id === id ? { ...prev, status } : prev
    );
    showNotif(`Client status updated to ${statusConfig[status]?.label || status}`);
  };

  const resetFilters = () => {
    setSearch("");
    setFilterStatus("TOUS");
    setFilterInterest("TOUS");
    setFilterAssetType("TOUS");
    setFilterBuilding("TOUS");
  };

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase());

      const matchStatus = filterStatus === "TOUS" || c.status === filterStatus;
      const matchInterest = filterInterest === "TOUS" || c.interest === filterInterest;
      const matchAssetType = filterAssetType === "TOUS" || c.assetType === filterAssetType;
      const matchBuilding = filterBuilding === "TOUS" || c.buildingName === filterBuilding;

      return matchSearch && matchStatus && matchInterest && matchAssetType && matchBuilding;
    });
  }, [clients, search, filterStatus, filterInterest, filterAssetType, filterBuilding]);

  // KPIs calculations
  const totalClients = clients.length;
  const payeCount = clients.filter((c) => c.status === "Paye").length;
  const enAttenteCount = clients.filter((c) => c.status === "EnAttente").length;
  const partielCount = clients.filter((c) => c.status === "Partiel").length;
  const pendingBell = clients.filter((c) => c.status === "EnAttente" || c.status === "inactive").length;

  return {
    // States & Setters
    search, setSearch,
    filterStatus, setFilterStatus,
    filterAssetType, setFilterAssetType,
    filterInterest, setFilterInterest,
    filterBuilding, setFilterBuilding,
    selectedClient, setSelectedClient,
    notification,
    viewMode, setViewMode,
    
    // Computed Datasets
    filtered,
    
    // Actions
    updateStatus,
    resetFilters,
    
    // Derived Telemetry KPIs
    kpis: {
      totalClients,
      payeCount,
      enAttenteCount,
      partielCount,
      pendingBell
    }
  };
}