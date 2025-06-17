// components/audience/ICPPreview.tsx
import React from "react";

export default function ICPPreview() {
  return (
    <div className="bg-white rounded-xl p-6 text-gray-900 shadow-md w-full relative">
      {/* Flat Top-Left Button */}
      <div className="absolute top-0 left-0">
        <button className="bg-[#6D6DFA] hover:bg-[#8181ff] text-white text-sm font-semibold px-4 py-2">
          Refine ICP
        </button>
      </div>

      {/* Centered Content */}
      <div className="text-center mt-14">
        <h3 className="text-sm font-semibold mb-3">Ideal Customer Profile Preview</h3>
        <p className="text-sm text-gray-600 mb-6">
          Leverage your audience insights to find customers with similar traits and interests.
        </p>

        {/* CTA */}
        <button className="bg-[#E2E8F0] hover:bg-[#CBD5E1] text-gray-800 px-4 py-2 rounded text-sm font-medium">
          Find Lookalike Audience
        </button>
      </div>
    </div>
  );
}
