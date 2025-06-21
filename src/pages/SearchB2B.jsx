import React, { useState, useCallback, useMemo } from "react";
import { Switch } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

const personalFields = [
  "Is Married", "Has Children", "Home Owner", "First Name", "Last Name", "Gender", "Age Range",
  "Personal Phone", "Personal Address", "Personal City", "Personal State",
  "Personal Zip", "Personal Emails", "LinkedIn URL", "Income Range", "Net Worth"
];
const professionalFields = [
  "Job Title", "Seniority Level", "Department", "Business Emails", "Professional Address",
  "Professional City", "Professional State", "Professional Zip", "Work History", "Education History"
];
const companyFields = [
  "Company Name", "Website", "CCID", "SIC Code", "Company Address", "Company City", "Company State",
  "Company Zip", "Company LinkedIn URL", "Company Revenue", "Company Employee Count",
  "Primary Industry", "Company Description", "Related Domains"
];

const employeeOptions = [
  "1-10", "10-25", "26-50", "51-100", "101-250",
  "251-500", "501-1k", "1k-5k", "5k-10k", "10k+"
];

export default function SearchB2B() {
  const [formData, setFormData] = useState({});
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [employeeCounts, setEmployeeCounts] = useState(["1-10", "10-25", "26-50"]);
  const [showCompany, setShowCompany] = useState(true);
  const [showProfessional, setShowProfessional] = useState(true);
  const [showPersonal, setShowPersonal] = useState(true);

  const isToggleField = (field) =>
    ["Is Married", "Has Children", "Home Owner"].includes(field);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const result = await getSolomonSearchResults(formData);
      console.log("Search Results:", result);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleClearFilters = () => {
    setFormData({});
    setEmployeeCounts([]);
  };

  const handleInputChange = useCallback((section, label, type, value) => {
    setFormData((prev) => {
      const newSection = prev[section] ? { ...prev[section] } : {};
      newSection[`${type}_${label.replace(/\s+/g, "")}`] = value;
      return {
        ...prev,
        [section]: newSection,
      };
    });
  }, []);

  const handleToggle = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field.replace(/\s+/g, "")]: value,
      },
    }));
  };

const FilterBlock = ({ label, section, valueInclude, valueExclude, onChange }) => {
  return (
    <div className="rounded-lg w-full max-w-xs bg-white shadow-sm border border-gray-200">
      <div className="flex justify-between items-center bg-[#7c5eff] text-white px-3 py-2 rounded-t-lg">
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex flex-col gap-2 px-3 py-3">
        <input
          type="text"
          value={valueInclude}
          className="w-full p-2 border border-gray-300 rounded bg-white placeholder-gray-400 text-sm"
          placeholder="Include"
          onChange={(e) => onChange(section, label, "Include", e.target.value)}
        />
        <input
          type="text"
          value={valueExclude}
          className="w-full p-2 border border-gray-300 rounded bg-white placeholder-gray-400 text-sm"
          placeholder="Exclude"
          onChange={(e) => onChange(section, label, "Exclude", e.target.value)}
        />
      </div>
    </div>
  );
};


  const ToggleBlock = ({ label }) => (
    <div className="flex items-center justify-between bg-[#7c5eff] px-5 py-3 rounded-full text-white w-full max-w-xs shadow-sm">
      <span className="text-sm font-medium">{label}</span>
      <Switch
        checked={formData["personalInfo"]?.[label.replace(/\s+/g, "")] ?? true}
        onChange={(val) => handleToggle("personalInfo", label, val)}
        className={`${
          formData["personalInfo"]?.[label.replace(/\s+/g, "")] ? "bg-[#7c5eff]" : "bg-gray-500"
        } relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200`}
      >
        <span
          className={`${
            formData["personalInfo"]?.[label.replace(/\s+/g, "")] ? "translate-x-5" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
        />
      </Switch>
    </div>
  );

  const renderSection = (title, sectionKey, fields, toggleState, setToggleState, bgColor, textColor) => {
  return (
    <div className="mb-6 bg-white rounded-xl shadow-sm">
      {/* Collapsible Header */}
      <button
        onClick={() => setToggleState(!toggleState)}
        className="w-full flex justify-between items-center px-4 py-3 border-b border-gray-200 rounded-t-xl"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="text-lg font-semibold" style={{ color: textColor }}>
          {title}
        </h2>
        <BsChevronDown
          className={`transition-transform ${
            toggleState ? "rotate-180" : ""
          }`}
          style={{ color: textColor }}
        />
      </button>

      {/* Collapsible Content */}
      {toggleState && (
        <div className="p-4 flex flex-col gap-4">
          {/* Separate Toggle Row for personalInfo */}
          {sectionKey === "personalInfo" && (
            <div className="flex gap-4 flex-wrap">
              {fields
                .filter((f) => isToggleField(f))
                .map((field) => (
                  <ToggleBlock key={field} label={field} />
                ))}
            </div>
          )}

          {/* Remaining filter cards */}
          <div className="flex flex-wrap gap-4">
            {fields
              .filter((f) => sectionKey !== "personalInfo" || !isToggleField(f))
              .map((field) => {
                if (field === "Company Employee Count") {
                  return (
                    <div
                      key={field}
                      className="rounded-lg w-full max-w-xs bg-white shadow-sm border border-gray-200"
                    >
                      <div className="flex justify-between items-center bg-[#7c5eff] text-white px-3 py-2 rounded-t-lg">
                        <span className="text-sm font-medium">{field}</span>
                        <button onClick={() => setEmployeeModalOpen(true)}>
                          <BsChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="px-3 py-3 text-sm text-gray-500">
                        Select one or more ranges
                      </div>
                    </div>
                  );
                }
                const includeKey = `Include_${field.replace(/\s+/g, "")}`;
                const excludeKey = `Exclude_${field.replace(/\s+/g, "")}`;

                const valueInclude = formData[sectionKey]?.[includeKey] || "";
                const valueExclude =formData[sectionKey]?.[excludeKey] || "";

                return (
                  <FilterBlock
                    key={`${sectionKey}-${field}`}
                    label={field}
                    section={sectionKey}
                    valueInclude={valueInclude}
                    valueExclude={valueExclude}
                    onChange={handleInputChange}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};


  return (
    <div className="p-6 space-y-6 bg-[#f0f4f8] text-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold">Search B2B</h1>

      {renderSection("Company Information", "companyInfo", companyFields, showCompany, setShowCompany, "#ede9fe", "#4b2996")}
      {renderSection("Professional Information", "professionalInfo", professionalFields, showProfessional, setShowProfessional, "#e6e1ff", "#4a2b9b")}
      {renderSection("Personal Information", "personalInfo", personalFields, showPersonal, setShowPersonal, "#f3e8ff", "#5b2da3")}

      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <button 
          onClick={handleClearFilters}
          className="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-full shadow-md hover:bg-gray-100"
        >
          Clear Filters
        </button>
        <button 
          onClick={() => handleSearch(false)}
          className="bg-[#7c5eff] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#6a4de0]"
        >
          Search
        </button>
      </div>

      {employeeModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[300px] text-gray-900 shadow-xl">
            <h3 className="text-lg font-semibold mb-3 text-white">Employee Count</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {employeeOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={employeeCounts.includes(option)}
                    onChange={() =>
                      setEmployeeCounts((prev) =>
                        prev.includes(option)
                          ? prev.filter((v) => v !== option)
                          : [...prev, option]
                      )
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setEmployeeModalOpen(false)} className="text-sm text-white">
                Cancel
              </button>
              <button
                onClick={() => setEmployeeModalOpen(false)}
                className="bg-blue-500 px-3 py-1 rounded text-sm text-white"
              >
                Save Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
