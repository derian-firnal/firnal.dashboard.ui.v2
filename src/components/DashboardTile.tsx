// components/ActionTile.tsx
import React from "react";

interface DashboardTileProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export default function DashboardTile({ icon, label, onClick }: DashboardTileProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 bg-white rounded-2xl shadow-md px-5 py-4 w-full h-[115px] hover:shadow-lg transition border border-gray-200 text-left"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-lg font-semibold text-gray-800">{label}</span>
    </button>
  );
}