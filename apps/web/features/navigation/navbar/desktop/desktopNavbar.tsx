"use client";

import { useState } from "react";
import DesktopCompactedNavbar from "./desktopCompactedSearchBar";
import DesktopExpandedNavbar from "./desktopExpandedSearchBar";

export default function HeaderController() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative w-full">
      {isExpanded ? (
        <DesktopExpandedNavbar onClose={() => setIsExpanded(false)} />
      ) : (
        <DesktopCompactedNavbar onOpen={() => setIsExpanded(true)} />
      )}

      {/* Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/25 z-40 transition-opacity duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}
