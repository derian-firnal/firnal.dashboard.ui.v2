import React, { useState, useEffect } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSelect: (status: string) => void;
    initialStatus: string | null;
}

export default function AudienceStatusPopup({ open, onClose, onSelect, initialStatus }: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        if (open) setSelected(initialStatus); // reset on each open
    }, [open, initialStatus]);

    if (!open) return null;

    const statuses = ["Processing", "Completed", "Downloaded"];

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-[#232b44] rounded-xl p-6 w-[420px] max-w-[90vw] text-white shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Select Audience Status</h2>

                <div className="flex gap-3 mb-6 justify-center">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelected(status)}
                            className={`px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap
                ${selected === status
                                    ? "bg-[#7c5eff] text-white"
                                    : "border border-white text-white"
                                }
              `}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            if (selected) onSelect(selected);
                            onClose();
                        }}
                        className="bg-[#7c5eff] text-white px-5 py-1.5 text-sm rounded-md hover:bg-[#6b4de8] transition"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
}
