// constants/categories.ts
import eventsAnimation from "@/public/animations/Events.json";
import groupsAnimation from "@/public/animations/Groups.json";

export interface Category {
  id: string;
  label: string;
  icon: unknown;
}

export const CategoriesTabs: Category[] = [
  {
    id: "events",
    label: "Eventos",
    icon: eventsAnimation,
  },
  {
    id: "groups",
    label: "Grupos",
    icon: groupsAnimation,
  },
];

type CategoryId = "events" | "groups";

export type SearchPanelType = "location" | "dates" | "options" | "search";

export type SearchField = {
  id: string;
  label: string;
  placeholder: string;
  panel: SearchPanelType;
  hasInput?: boolean;
  align?: "start" | "center" | "end";
};

export const SEARCH_BAR_CONFIG: Record<string, SearchField[]> = {
  events: [
    {
      id: "donde",
      label: "Dónde",
      placeholder: "Explora lugares",
      panel: "location",
      hasInput: true,
      align: "start",
    },
    {
      id: "fechas",
      label: "Fechas",
      placeholder: "Agrega fechas",
      panel: "dates",
      hasInput: false,
      align: "center",
    },
    {
      id: "modalidad",
      label: "Modalidad",
      placeholder: "Cualquier modalidad",
      panel: "options",
      hasInput: false,
      align: "end",
    },
  ],
  groups: [
    {
      id: "buscar",
      label: "Buscar",
      placeholder: "Nombre del grupo",
      panel: "search",
      hasInput: true,
      align: "start",
    },
    {
      id: "donde",
      label: "Dónde",
      placeholder: "Facultad, campus..",
      panel: "location",
      hasInput: true,
      align: "center",
    },
    {
      id: "estado",
      label: "Estado",
      placeholder: "Cualquier estado",
      panel: "options",
      hasInput: false,
      align: "end",
    },
  ],
};
