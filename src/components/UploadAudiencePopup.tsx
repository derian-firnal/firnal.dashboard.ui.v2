import React, { useRef, useState } from "react";
import audienceService from "../services/AudienceService";

interface UploadAudiencePopupProps {
  open: boolean;
  onClose: () => void;
  onUploadComplete?: () => void;
}

export default function UploadAudiencePopup({
  open,
  onClose,
  onUploadComplete
}: UploadAudiencePopupProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [audienceName, setAudienceName] = useState<string>("");

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const renamedFiles = selectedFiles.map((file, index) => {
      const ext = file.name.split('.').pop() || "";
      const baseName = audienceName.trim() !== "" ? audienceName : file.name.replace(/\.[^/.]+$/, "");
      const newName =
        selectedFiles.length === 1
          ? `${baseName}.${ext}`
          : `${baseName}_${index + 1}.${ext}`;

      return new File([file], newName, { type: file.type });
    });

    // Call upload but don’t await it here
    audienceService.uploadAudienceFiles(renamedFiles);

    if (onUploadComplete) onUploadComplete(); // triggers popup close + refresh
    onClose(); // immediately close popup
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-[#232b44] text-white p-6 rounded-xl shadow-lg w-[460px] relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-white text-lg">✕</button>
        <h2 className="text-lg font-semibold mb-4">Upload a New Audience</h2>

        <label className="block text-sm mb-2">Audience Name</label>
        <input
          type="text"
          value={audienceName}
          onChange={(e) => setAudienceName(e.target.value)}
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
            accept=".csv,.xlsx"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="text-xs text-gray-300 mb-3">
            Selected files: {selectedFiles.map(f => f.name).join(", ")}
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
        >
          Upload
        </button>

        <p className="text-xs text-gray-300 mt-4">
          Only support <strong>.XLSX</strong> and <strong>.CSV</strong> files –
          Need help? <span
            className="text-purple-300 underline cursor-pointer"
            onClick={audienceService.downloadSampleCsv}
          >
            Download sample data
          </span>
        </p>
        <p className="text-xs mt-1 text-gray-300">
          *Dataset must include a phone number, zip, and email address field
        </p>
      </div>
    </div>
  );
}
