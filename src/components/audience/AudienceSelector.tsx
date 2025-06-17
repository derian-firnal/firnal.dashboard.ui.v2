// components/audience/AudienceSelector.tsx
import React from "react";

interface Props {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function AudienceSelector({ options, selected, onChange }: Props) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-gray-300 text-sm text-gray-900 px-4 py-2 rounded-md shadow-sm"
    >
      {options.map((option) => (
        <option key={option} value={option} className="text-gray-900">
          {option}
        </option>
      ))}
    </select>
  );
}
