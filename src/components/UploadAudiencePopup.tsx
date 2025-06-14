import React, { useRef } from "react";

interface UploadAudiencePopupProps {
  open: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
}

export default function UploadAudiencePopup({
  open,
  onClose,
  onFileUpload,
}: UploadAudiencePopupProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-[#232b44] text-white p-6 rounded-xl shadow-lg w-[460px] relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-white text-lg">✕</button>
        <h2 className="text-lg font-semibold mb-4">Upload a New Audience</h2>

        <label className="block text-sm mb-2">Audience Name</label>
        <input
          type="text"
          placeholder="Ex. Highest Retained Users"
          className="w-full px-3 py-2 mb-4 text-black rounded"
        />

        <div
          className="border border-dashed border-purple-400 bg-[#1f263e] rounded-md p-6 flex flex-col items-center justify-center cursor-pointer mb-4"
          onClick={() => fileInputRef.current?.click()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-sm">Drag your file(s) or <span className="text-purple-400 underline">browse</span></p>
          <p className="text-xs mt-1">Max 10 MB files are allowed</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <p className="text-xs text-gray-300">
          Only support <strong>.XLSX</strong> and <strong>.CSV</strong> files –
          Need help? <span className="text-purple-300 underline cursor-pointer">Download sample data</span>
        </p>
        <p className="text-xs mt-1 text-gray-300">
          *Dataset must include a phone number, zip, and email address field
        </p>
      </div>
    </div>
  );
}
