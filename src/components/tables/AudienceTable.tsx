// components/AudienceTable.tsx
import React, { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

interface AudienceRow {
    id: string;
    name: string;
    records: number;
    date: string;
    isEnriched: boolean;
    status: string;
}

interface AudienceTableProps {
    rows: AudienceRow[];
    onRowClick?: (row: AudienceRow) => void;
    onEnrichClick?: (uploadId: number) => void;
    rowsPerPage?: number;
    enrichingIds?: number[];
}

const AudienceTable: React.FC<AudienceTableProps> = ({
    rows,
    onRowClick,
    onEnrichClick,
    rowsPerPage = 10,
    enrichingIds = [],
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const paginatedRows = rows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="mt-4 overflow-x-auto rounded-xl shadow-md bg-white">
            <table className="min-w-full text-sm text-gray-800">
                <thead className="text-left text-xs uppercase bg-gray-100 text-gray-500">
                    <tr>
                        <th className="px-4 py-3">Include</th>
                        <th className="px-4 py-3">Audience Name</th>
                        <th className="px-4 py-3">Records</th>
                        <th className="px-4 py-3">Date Uploaded</th>
                        <th className="px-4 py-3">Enrichment</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {paginatedRows.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-50 transition cursor-pointer"
                            onClick={() => onRowClick?.(row)}
                        >
                            <td className="px-4 py-3"><input type="checkbox" /></td>
                            <td className="px-4 py-3">{row.name}</td>
                            <td className="px-4 py-3">{row.records}</td>
                            <td className="px-4 py-3">{row.date}</td>
                            <td className="px-4 py-3">
                                {row.isEnriched ? (
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white bg-[#7063F0]">
                                        Enriched
                                    </span>
                                ) : enrichingIds?.includes(Number(row.id)) ? (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 animate-pulse">
                                            Processing...
                                        </span>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent row click
                                            console.log("Enrich clicked for:", row.id);
                                            if (onEnrichClick) onEnrichClick(Number(row.id));
                                        }}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white bg-[#4CAF90] hover:bg-[#3CA87A] transition"
                                    >
                                        Enrich <HiOutlineArrowRight className="text-sm" />
                                    </button>
                                )}

                            </td>
                            <td className="px-4 py-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    row.status === 'Failed' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800 animate-pulse'
                                    }`}>
                                    {row.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-600">
                <span>
                    Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudienceTable;
