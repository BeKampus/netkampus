import { Fragment, useState, useEffect } from "react";
import NavbarCategories from "../shared/navbarCategoriesTabs";
import NavbarButtons from "../shared/navbarButtons";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SEARCH_BAR_CONFIG } from "../constants/categoriesTabs";
import { Search, X } from "lucide-react";
import PanelRouter from "../panels/panelRouter";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@workspace/ui/components/popover";

interface SearchBarProps {
  onClose?: () => void;
}

export default function DesktopExpandedSearchBar({ onClose }: SearchBarProps) {
  const pathname = usePathname();

  type CategoryId = keyof typeof SEARCH_BAR_CONFIG;

  const normalizedCategory =
    pathname === "/" ? "events" : pathname.replace("/", "");

  const currentCategory: CategoryId =
    normalizedCategory in SEARCH_BAR_CONFIG
      ? (normalizedCategory as CategoryId)
      : "events";

  const fields = SEARCH_BAR_CONFIG[currentCategory];

  // Track active section including category so panels don't leak between categories
  type ActiveSection = { category: string; fieldId: string } | null;
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  // Separate search state per category so groups and events don't share inputs
  type SearchState = Record<string, Record<string, string>>;
  const [searchData, setSearchData] = useState<SearchState>({
    events: {},
    groups: {},
  });

  // Reset activeSection when category changes to avoid showing a panel from other category
  useEffect(() => {
    if (activeSection?.category !== currentCategory) {
      setActiveSection(null);
    }
  }, [currentCategory, activeSection]);

  // Manage input changes for the active tab
  const handleInputChange = (tabId: string, value: string) => {
    setSearchData((prev) => ({
      ...prev,
      [currentCategory]: {
        ...(prev[currentCategory] || {}),
        [tabId]: value,
      },
    }));
  };

  // Function to clear a specific field's value
  const clearField = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); // Stop the click from propagating to the tab's onClick
    setSearchData((prev) => {
      const newData = { ...prev } as SearchState;
      const cat = { ...(newData[currentCategory] || {}) };
      delete cat[tabId];
      newData[currentCategory] = cat;
      return newData;
    });
  };

  // Determine if the entire pill should have a gray background (happens when there IS an active tab)
  const isAnyTabActive =
    activeSection !== null && activeSection.category === currentCategory;

  return (
    <div className="w-full h-fit bg-white z-50 fixed pt-2 pb-6 shadow-sm border-b">
      <div className="grid grid-cols-[1fr_auto_1fr] justify-between items-center pb-6 px-4 lg:px-14">
        <Link href="/" className="justify-self-start">
          <Image
            src="/logo/logoBlack.svg"
            alt="BeKampus"
            width={180}
            height={60}
            className="w-auto h-14"
          />
        </Link>
        <div className="justify-self-center">
          <NavbarCategories />
        </div>
        <div className="justify-self-end">
          <NavbarButtons />
        </div>
      </div>

      {/* Contenedor del Buscador */}
      <div className="relative w-full flex justify-center">
        <div
          className={`w-full max-w-4xl rounded-full h-17 flex items-center border border-gray-200 transition-colors duration-200 ${
            isAnyTabActive ? "bg-gray-200" : "bg-white shadow-lg"
          }`}
        >
          {fields?.map((field, index) => {
            const isActive =
              activeSection?.category === currentCategory &&
              activeSection?.fieldId === field.id;

            const hasValue =
              (searchData[currentCategory]?.[field.id]?.length ?? 0) > 0;

            const isInputType = field.hasInput === true;

            return (
              <Fragment key={field.id}>
                <Popover
                  open={isActive}
                  onOpenChange={(open) => {
                    if (open) {
                      setActiveSection({
                        category: currentCategory,
                        fieldId: field.id,
                      });
                    } else if (
                      activeSection?.category === currentCategory &&
                      activeSection?.fieldId === field.id
                    ) {
                      setActiveSection(null);
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <div
                      onClick={(e) => {
                        if (isActive) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      className={`flex-1 flex items-center h-full rounded-full cursor-pointer transition-all duration-200 relative ${
                        isActive
                          ? "bg-white shadow-xl z-10"
                          : "hover:bg-gray-300 z-0"
                      } ${index === fields.length - 1 ? "pl-8 pr-2" : "px-8"}`}
                    >
                      <div className="flex flex-col justify-center flex-1 overflow-hidden pr-2">
                        <span className="text-[11px] font-bold text-gray-800 tracking-wider">
                          {field.label}
                        </span>

                        {isInputType && isActive ? (
                          <input
                            autoFocus
                            type="text"
                            className="text-sm text-black bg-transparent outline-none w-full truncate placeholder-gray-500 font-semibold"
                            placeholder={field.placeholder}
                            value={
                              searchData[currentCategory]?.[field.id] || ""
                            }
                            onChange={(e) =>
                              handleInputChange(field.id, e.target.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <span
                            className={`text-sm truncate ${
                              hasValue
                                ? "text-black font-semibold"
                                : "text-gray-500"
                            }`}
                          >
                            {hasValue
                              ? searchData[currentCategory]?.[field.id]
                              : field.placeholder}
                          </span>
                        )}
                      </div>

                      {hasValue && isActive && (
                        <button
                          onClick={(e) => clearField(e, field.id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-1 mr-2 transition-colors shrink-0"
                        >
                          <X size={14} />
                        </button>
                      )}

                      {index === fields.length - 1 && (
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition shrink-0 ml-2 shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onClose) onClose();
                          }}
                        >
                          <Search size={20} />
                        </button>
                      )}
                    </div>
                  </PopoverTrigger>

                  <PopoverContent
                    align={field.align ?? "start"}
                    side="bottom"
                    sideOffset={20}
                    className="w-[min(53rem,calc(100vw-2rem))] rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl"
                  >
                    <PanelRouter
                      activeField={field}
                      currentCategory={currentCategory}
                      searchData={searchData}
                      onChange={handleInputChange}
                    />
                  </PopoverContent>
                </Popover>

                {index < fields.length - 1 && (
                  <div
                    className={`w-px h-8 bg-gray-300 transition-opacity duration-200 ${
                      activeSection?.category === currentCategory &&
                      (activeSection.fieldId === field.id ||
                        activeSection.fieldId === fields[index + 1]?.id)
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
