import React from "react";
import LocationPanel from "./locationPanel";
import DatesPanel from "./datesPanel";
import OptionsPanel from "./optionsPanel";
import SearchNamePanel from "./searchNamePanel";

type ActiveField = { id: string; panel?: string; align?: string } | null;

interface PanelRouterProps {
  activeField: ActiveField;
  currentCategory: string;
  searchData: Record<string, Record<string, string>>;
  onChange: (fieldId: string, value: string) => void;
}

export default function PanelRouter({
  activeField,
  currentCategory,
  searchData,
  onChange,
}: PanelRouterProps) {
  if (!activeField) return null;

  const value = searchData[currentCategory]?.[activeField.id] || "";

  switch (activeField.panel) {
    case "location":
      return (
        <LocationPanel
        //   category={currentCategory}
        //   fieldId={activeField.id}
        //   value={value}
        //   onChange={(newValue: string) => onChange(activeField.id, newValue)}
        //   onSelect={(newValue: string) => onChange(activeField.id, newValue)}
        />
      );

    case "dates":
      return (
        <DatesPanel
        //   category={currentCategory}
        //   value={value}
        //   onSelect={(newValue: string) => onChange(activeField.id, newValue)}
        />
      );

    case "options":
      return (
        <OptionsPanel
        //   category={currentCategory}
        //   fieldId={activeField.id}
        //   value={value}
        //   onSelect={(newValue: string) => onChange(activeField.id, newValue)}
        />
      );

    case "search":
      return (
        <SearchNamePanel
        //   category={currentCategory}
        //   value={value}
        //   onChange={(newValue: string) => onChange(activeField.id, newValue)}
        //   onSelect={(newValue: string) => onChange(activeField.id, newValue)}
        />
      );

    default:
      return null;
  }
}
