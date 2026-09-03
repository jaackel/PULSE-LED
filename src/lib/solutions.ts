import { Monitor, LayoutGrid, UtensilsCrossed, Waves, Film, Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ledPanel from "@/assets/service-led-panel.jpg";
import ledPanelOutdoor from "@/assets/service-led-panel-outdoor.jpg";
import videoWall from "@/assets/service-videowall.jpg";
import menuBoard from "@/assets/service-menuboard.jpg";
import menuBoard2 from "@/assets/service-menuboard-2.jpg";
import menuBoard3 from "@/assets/service-menuboard-3.jpg";
import pool from "@/assets/service-pool.jpg";
import videoAds from "@/assets/service-video-ads.jpg";
import software from "@/assets/service-software.jpg";

export type SolutionId = "ledPanel" | "videoWall" | "menuBoard" | "pool" | "videoAds" | "software";

export interface Solution {
  id: SolutionId;
  slug: string;
  icon: LucideIcon;
  /** Capa usada nos cards de Soluções/Projetos. */
  cover: string;
  /** Fotos da página de detalhe. Hoje só a capa; vai crescendo conforme mais fotos de projetos reais chegarem. */
  gallery: string[];
}

export const solutions: Solution[] = [
  { id: "ledPanel", slug: "led-panel", icon: Monitor, cover: ledPanel, gallery: [ledPanel, ledPanelOutdoor] },
  { id: "videoWall", slug: "video-wall", icon: LayoutGrid, cover: videoWall, gallery: [videoWall] },
  { id: "menuBoard", slug: "menu-board", icon: UtensilsCrossed, cover: menuBoard, gallery: [menuBoard, menuBoard2, menuBoard3] },
  { id: "pool", slug: "piscina", icon: Waves, cover: pool, gallery: [pool] },
  { id: "videoAds", slug: "video-ads", icon: Film, cover: videoAds, gallery: [videoAds] },
  { id: "software", slug: "software", icon: Settings2, cover: software, gallery: [software] },
];

export function getSolutionBySlug(slug: string | undefined) {
  return solutions.find((solution) => solution.slug === slug);
}
