import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export const languages = [
  { code: "pt", label: "Português", short: "PT", htmlLang: "pt-BR" },
  { code: "en", label: "English", short: "EN", htmlLang: "en" },
  { code: "es", label: "Español", short: "ES", htmlLang: "es" },
] as const;

export type Lang = (typeof languages)[number]["code"];

const STORAGE_KEY = "pulse-led:lang";
const DEFAULT_LANG: Lang = "en";

const pt = {
  nav: {
    home: "Início",
    solutions: "Soluções",
    projects: "Projetos",
    about: "Sobre",
    contact: "Contato",
    quote: "Solicitar orçamento",
    logoAria: "Pulse LED Display — início",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    languageAria: "Selecionar idioma",
  },
  solutions: {
    chip: "Soluções",
    title: "Soluções que dão vida à sua comunicação",
    description:
      "Do impacto de um grande painel de LED à praticidade do gerenciamento remoto, criamos soluções completas para transformar a forma como sua empresa se comunica.",
    learnMore: "Saiba mais",
    inquiry: (service: string) => `Olá! Gostaria de saber mais sobre ${service}.`,
    items: {
      ledPanel: {
        title: "Painéis de LED Digital",
        description:
          "Painéis de LED de alta qualidade para comunicação visual, publicidade, eventos e ambientes corporativos.",
        alt: "Painel de LED com a marca Pulse LED Display instalado em parede de madeira",
      },
      videoWall: {
        title: "Video Wall",
        description:
          "Soluções de Video Wall para criar grandes experiências visuais em ambientes corporativos, comerciais e institucionais.",
        alt: "Video wall corporativo formado por várias telas exibindo uma composição azul",
      },
      menuBoard: {
        title: "Menu Board Digital",
        description:
          "Menus digitais modernos para restaurantes, lanchonetes, cafeterias e estabelecimentos que desejam uma comunicação mais dinâmica.",
        alt: "Telas de LED na vitrine de um restaurante exibindo pratos do cardápio",
      },
      pool: {
        title: "Painéis de LED para Piscina",
        description:
          "Painéis de LED para área de piscina e lazer, resistentes ao tempo e com alto brilho para ficarem nítidos mesmo sob sol forte.",
        alt: "Painel de LED instalado na área de piscina coberta, exibindo um filme durante o dia",
      },
      videoAds: {
        title: "Criação de Anúncios em Vídeo",
        description:
          "Produção de conteúdos em vídeo para painéis de LED e sinalização digital, criando anúncios mais atrativos e envolventes.",
        alt: "Tela de LED exibindo conteúdo publicitário em movimento",
      },
      software: {
        title: "Software de Gerenciamento Remoto",
        description:
          "Gerencie conteúdos e informações das suas telas de forma prática, flexível e remota.",
        alt: "Dashboard de gerenciamento remoto de telas em um monitor",
      },
    },
  },
  projects: {
    chip: "Projetos",
    titleLead: "Projetos que",
    titleAccent: "chamam atenção.",
    items: {
      facade: { category: "Fachada comercial", title: "Painel de LED externo" },
      videoWall: { category: "Corporativo", title: "Video Wall" },
      pool: { category: "Área de lazer", title: "Painel de LED na piscina" },
      menuBoard: { category: "Alimentação", title: "Menu Board Digital" },
      ledPanel: { category: "Display", title: "Módulo de LED profissional" },
      software: { category: "Gerenciamento", title: "Sinalização digital remota" },
    },
  },
  about: {
    chip: "Sobre",
    titleLead: "Tecnologia, inovação e",
    titleAccent: "visibilidade.",
    paragraph1:
      "A Pulse LED Display oferece soluções em comunicação visual digital desenvolvidas para empresas, instituições e espaços que precisam comunicar com impacto.",
    paragraph2:
      "Unimos tecnologia, qualidade e criatividade para entregar experiências visuais modernas e eficientes.",
    tagline: "Innovation • Impact • Visibility",
  },
  benefits: {
    titleLead: "Por que investir em",
    titleAccent: "comunicação digital?",
    items: {
      impact: {
        title: "Alto impacto visual",
        description: "Sua comunicação ganha destaque e chama mais atenção.",
      },
      dynamic: {
        title: "Conteúdo dinâmico",
        description: "Atualize campanhas e informações de maneira rápida.",
      },
      technology: {
        title: "Tecnologia moderna",
        description: "Soluções desenvolvidas para ambientes que exigem qualidade visual.",
      },
      smart: {
        title: "Comunicação inteligente",
        description: "Conteúdo digital que pode acompanhar as necessidades do seu negócio.",
      },
    },
  },
  impact: {
    chip: "Impacto",
    titleLead: "Sua mensagem.",
    titleAccent: "Em grande escala.",
    description: "Transformamos tecnologia em visibilidade para sua marca.",
    imageAlt:
      "Fachada comercial noturna coberta por grandes painéis de LED com iluminação azul",
  },
  parallax: {
    chip: "Tecnologia",
    titleLead: "Cada pixel",
    titleAccent: "conta uma história",
    description:
      "Painéis de LED de última geração com brilho, contraste e nitidez para transformar qualquer ambiente em uma experiência visual memorável.",
    imageAlt: "Painel de LED de alta definição exibindo um efeito visual de energia azul",
  },
  cta: {
    titleLead: "Pronto para",
    titleAccent: "transformar sua comunicação?",
    description: "Conte para nós o que você precisa e encontre a solução ideal para o seu espaço.",
    button: "Solicitar orçamento pelo WhatsApp",
  },
  solutionPage: {
    back: "Voltar",
    ctaButton: "Falar sobre este projeto",
    galleryTitle: "Fotos de projetos",
    otherSolutions: "Outras soluções",
    notFoundTitle: "Solução não encontrada",
    notFoundDescription: "A página que você procura não existe ou foi movida.",
    backHome: "Voltar para a página inicial",
  },
  footer: {
    tagline: "Innovation • Impact • Visibility",
    navAria: "Rodapé",
    navHeading: "Navegação",
    contactHeading: "Contato",
    contactText: "Fale com nossa equipe e receba uma proposta para o seu projeto.",
    rights: (year: number) => `© ${year} Pulse LED Display. Todos os direitos reservados.`,
  },
  float: {
    whatsappAria: "Fale conosco pelo WhatsApp",
    whatsappLabel: "Fale conosco",
    smsAria: "Fale conosco por SMS",
    smsLabel: "Envie um SMS",
    instagramAria: "Siga a Pulse LED no Instagram",
    facebookAria: "Siga a Pulse LED no Facebook",
  },
  contact: {
    defaultMessage: "Olá! Gostaria de solicitar um orçamento para painéis de LED.",
  },
};

/** O português é a fonte da verdade: os outros idiomas precisam bater com esta forma. */
export type Dict = typeof pt;

const en: Dict = {
  nav: {
    home: "Home",
    solutions: "Solutions",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    quote: "Request a quote",
    logoAria: "Pulse LED Display — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageAria: "Select language",
  },
  solutions: {
    chip: "Solutions",
    title: "Solutions that bring your message to life",
    description:
      "From the impact of a large LED panel to the convenience of remote management, we build complete solutions to transform the way your company communicates.",
    learnMore: "Learn more",
    inquiry: (service: string) => `Hi! I'd like to know more about ${service}.`,
    items: {
      ledPanel: {
        title: "Digital LED Panels",
        description:
          "High-quality LED panels for visual communication, advertising, events and corporate environments.",
        alt: "LED panel with the Pulse LED Display logo mounted on a wood-paneled wall",
      },
      videoWall: {
        title: "Video Wall",
        description:
          "Video Wall solutions that create large-scale visual experiences in corporate, retail and institutional spaces.",
        alt: "Corporate video wall made of several screens showing a blue composition",
      },
      menuBoard: {
        title: "Digital Menu Board",
        description:
          "Modern digital menus for restaurants, diners, coffee shops and any business that wants more dynamic communication.",
        alt: "LED screens in a restaurant storefront displaying menu dishes",
      },
      pool: {
        title: "LED Panels for Pools",
        description:
          "Weather-resistant LED panels for pool and outdoor living areas, with high brightness that stays sharp even in direct sunlight.",
        alt: "LED panel installed in a screened pool enclosure, playing a movie during the day",
      },
      videoAds: {
        title: "Video Ad Production",
        description:
          "Video content production for LED panels and digital signage, creating more attractive and engaging ads.",
        alt: "LED screen displaying moving advertising content",
      },
      software: {
        title: "Remote Management Software",
        description:
          "Manage the content and information on your screens in a practical, flexible and remote way.",
        alt: "Remote screen management dashboard on a monitor",
      },
    },
  },
  projects: {
    chip: "Projects",
    titleLead: "Projects that",
    titleAccent: "turn heads.",
    items: {
      facade: { category: "Commercial facade", title: "Outdoor LED panel" },
      videoWall: { category: "Corporate", title: "Video Wall" },
      pool: { category: "Outdoor living", title: "Poolside LED panel" },
      menuBoard: { category: "Food service", title: "Digital Menu Board" },
      ledPanel: { category: "Display", title: "Professional LED module" },
      software: { category: "Management", title: "Remote digital signage" },
    },
  },
  about: {
    chip: "About",
    titleLead: "Technology, innovation and",
    titleAccent: "visibility.",
    paragraph1:
      "Pulse LED Display delivers digital visual communication solutions built for companies, institutions and spaces that need to communicate with impact.",
    paragraph2:
      "We combine technology, quality and creativity to deliver modern, efficient visual experiences.",
    tagline: "Innovation • Impact • Visibility",
  },
  benefits: {
    titleLead: "Why invest in",
    titleAccent: "digital communication?",
    items: {
      impact: {
        title: "High visual impact",
        description: "Your message stands out and draws far more attention.",
      },
      dynamic: {
        title: "Dynamic content",
        description: "Update campaigns and information in a matter of seconds.",
      },
      technology: {
        title: "Modern technology",
        description: "Solutions engineered for environments that demand visual quality.",
      },
      smart: {
        title: "Smart communication",
        description: "Digital content that keeps up with the needs of your business.",
      },
    },
  },
  impact: {
    chip: "Impact",
    titleLead: "Your message.",
    titleAccent: "On a grand scale.",
    description: "We turn technology into visibility for your brand.",
    imageAlt: "Nighttime commercial facade covered by large LED panels with blue lighting",
  },
  parallax: {
    chip: "Technology",
    titleLead: "Every pixel",
    titleAccent: "tells a story",
    description:
      "Next-generation LED panels with brightness, contrast and sharpness that turn any space into a memorable visual experience.",
    imageAlt: "High-definition LED panel displaying a blue energy visual effect",
  },
  cta: {
    titleLead: "Ready to",
    titleAccent: "transform your communication?",
    description: "Tell us what you need and find the ideal solution for your space.",
    button: "Request a quote on WhatsApp",
  },
  solutionPage: {
    back: "Back",
    ctaButton: "Talk about this project",
    galleryTitle: "Project photos",
    otherSolutions: "Other solutions",
    notFoundTitle: "Solution not found",
    notFoundDescription: "The page you're looking for doesn't exist or was moved.",
    backHome: "Back to home",
  },
  footer: {
    tagline: "Innovation • Impact • Visibility",
    navAria: "Footer",
    navHeading: "Navigation",
    contactHeading: "Contact",
    contactText: "Talk to our team and get a proposal for your project.",
    rights: (year: number) => `© ${year} Pulse LED Display. All rights reserved.`,
  },
  float: {
    whatsappAria: "Talk to us on WhatsApp",
    whatsappLabel: "Talk to us",
    smsAria: "Text us by SMS",
    smsLabel: "Send an SMS",
    instagramAria: "Follow Pulse LED on Instagram",
    facebookAria: "Follow Pulse LED on Facebook",
  },
  contact: {
    defaultMessage: "Hi! I'd like to request a quote for LED panels.",
  },
};

const es: Dict = {
  nav: {
    home: "Inicio",
    solutions: "Soluciones",
    projects: "Proyectos",
    about: "Nosotros",
    contact: "Contacto",
    quote: "Solicitar presupuesto",
    logoAria: "Pulse LED Display — inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageAria: "Seleccionar idioma",
  },
  solutions: {
    chip: "Soluciones",
    title: "Soluciones que dan vida a tu comunicación",
    description:
      "Desde el impacto de un gran panel de LED hasta la practicidad de la gestión remota, creamos soluciones completas para transformar la forma en que tu empresa se comunica.",
    learnMore: "Saber más",
    inquiry: (service: string) => `¡Hola! Me gustaría saber más sobre ${service}.`,
    items: {
      ledPanel: {
        title: "Paneles de LED Digital",
        description:
          "Paneles de LED de alta calidad para comunicación visual, publicidad, eventos y entornos corporativos.",
        alt: "Panel de LED con el logo de Pulse LED Display instalado en una pared de madera",
      },
      videoWall: {
        title: "Video Wall",
        description:
          "Soluciones de Video Wall para crear grandes experiencias visuales en entornos corporativos, comerciales e institucionales.",
        alt: "Video wall corporativo formado por varias pantallas con una composición azul",
      },
      menuBoard: {
        title: "Menu Board Digital",
        description:
          "Menús digitales modernos para restaurantes, cafeterías y establecimientos que buscan una comunicación más dinámica.",
        alt: "Pantallas de LED en el escaparate de un restaurante mostrando platos del menú",
      },
      pool: {
        title: "Paneles de LED para Piscina",
        description:
          "Paneles de LED para áreas de piscina y ocio, resistentes a la intemperie y con alto brillo para verse nítidos incluso bajo el sol.",
        alt: "Panel de LED instalado en el área cubierta de la piscina, reproduciendo una película durante el día",
      },
      videoAds: {
        title: "Creación de Anuncios en Video",
        description:
          "Producción de contenidos en video para paneles de LED y señalización digital, creando anuncios más atractivos y envolventes.",
        alt: "Pantalla de LED mostrando contenido publicitario en movimiento",
      },
      software: {
        title: "Software de Gestión Remota",
        description:
          "Gestiona los contenidos e informaciones de tus pantallas de forma práctica, flexible y remota.",
        alt: "Panel de gestión remota de pantallas en un monitor",
      },
    },
  },
  projects: {
    chip: "Proyectos",
    titleLead: "Proyectos que",
    titleAccent: "llaman la atención.",
    items: {
      facade: { category: "Fachada comercial", title: "Panel de LED exterior" },
      videoWall: { category: "Corporativo", title: "Video Wall" },
      pool: { category: "Área de ocio", title: "Panel de LED junto a la piscina" },
      menuBoard: { category: "Alimentación", title: "Menu Board Digital" },
      ledPanel: { category: "Display", title: "Módulo de LED profesional" },
      software: { category: "Gestión", title: "Señalización digital remota" },
    },
  },
  about: {
    chip: "Nosotros",
    titleLead: "Tecnología, innovación y",
    titleAccent: "visibilidad.",
    paragraph1:
      "Pulse LED Display ofrece soluciones de comunicación visual digital desarrolladas para empresas, instituciones y espacios que necesitan comunicar con impacto.",
    paragraph2:
      "Unimos tecnología, calidad y creatividad para entregar experiencias visuales modernas y eficientes.",
    tagline: "Innovation • Impact • Visibility",
  },
  benefits: {
    titleLead: "¿Por qué invertir en",
    titleAccent: "comunicación digital?",
    items: {
      impact: {
        title: "Alto impacto visual",
        description: "Tu comunicación gana protagonismo y llama mucho más la atención.",
      },
      dynamic: {
        title: "Contenido dinámico",
        description: "Actualiza campañas e informaciones de manera rápida.",
      },
      technology: {
        title: "Tecnología moderna",
        description: "Soluciones desarrolladas para entornos que exigen calidad visual.",
      },
      smart: {
        title: "Comunicación inteligente",
        description: "Contenido digital que acompaña las necesidades de tu negocio.",
      },
    },
  },
  impact: {
    chip: "Impacto",
    titleLead: "Tu mensaje.",
    titleAccent: "A gran escala.",
    description: "Transformamos tecnología en visibilidad para tu marca.",
    imageAlt: "Fachada comercial nocturna cubierta por grandes paneles de LED con luz azul",
  },
  parallax: {
    chip: "Tecnología",
    titleLead: "Cada píxel",
    titleAccent: "cuenta una historia",
    description:
      "Paneles de LED de última generación con brillo, contraste y nitidez que transforman cualquier espacio en una experiencia visual memorable.",
    imageAlt: "Panel de LED de alta definición mostrando un efecto visual de energía azul",
  },
  cta: {
    titleLead: "¿Listo para",
    titleAccent: "transformar tu comunicación?",
    description: "Cuéntanos qué necesitas y encuentra la solución ideal para tu espacio.",
    button: "Solicitar presupuesto por WhatsApp",
  },
  solutionPage: {
    back: "Volver",
    ctaButton: "Hablar sobre este proyecto",
    galleryTitle: "Fotos de proyectos",
    otherSolutions: "Otras soluciones",
    notFoundTitle: "Solución no encontrada",
    notFoundDescription: "La página que buscas no existe o fue movida.",
    backHome: "Volver al inicio",
  },
  footer: {
    tagline: "Innovation • Impact • Visibility",
    navAria: "Pie de página",
    navHeading: "Navegación",
    contactHeading: "Contacto",
    contactText: "Habla con nuestro equipo y recibe una propuesta para tu proyecto.",
    rights: (year: number) => `© ${year} Pulse LED Display. Todos los derechos reservados.`,
  },
  float: {
    whatsappAria: "Habla con nosotros por WhatsApp",
    whatsappLabel: "Habla con nosotros",
    smsAria: "Escríbenos por SMS",
    smsLabel: "Envía un SMS",
    instagramAria: "Sigue a Pulse LED en Instagram",
    facebookAria: "Sigue a Pulse LED en Facebook",
  },
  contact: {
    defaultMessage: "¡Hola! Me gustaría solicitar un presupuesto para paneles de LED.",
  },
};

const dictionaries: Record<Lang, Dict> = { pt, en, es };

function isLang(value: string | null): value is Lang {
  return value === "pt" || value === "en" || value === "es";
}

/** Escolha salva do visitante → inglês (idioma principal do site). */
function detectLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // localStorage bloqueado (aba anônima, cookies desativados): segue no padrão.
  }

  return DEFAULT_LANG;
}

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  useEffect(() => {
    const meta = languages.find((l) => l.code === lang);
    if (meta) document.documentElement.lang = meta.htmlLang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sem persistência: o idioma vale só para esta sessão.
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n precisa estar dentro de <I18nProvider>");
  return context;
}
