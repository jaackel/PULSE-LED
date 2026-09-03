/** Chaves de tradução (`nav.*` em src/lib/i18n.tsx) casadas com as âncoras da página. */
export const navLinks = [
  { key: "home", href: "#inicio" },
  { key: "solutions", href: "#solucoes" },
  { key: "projects", href: "#projetos" },
  { key: "about", href: "#sobre" },
  { key: "contact", href: "#contato" },
] as const;

const PHONE = "15616435045";

export function whatsappLink(text: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

export function smsLink(text: string) {
  // `?&` mantém compatibilidade com iOS e Android
  return `sms:+${PHONE}?&body=${encodeURIComponent(text)}`;
}

/** TODO: trocar por "#" pelas URLs reais assim que as contas forem criadas. */
export const socialLinks = {
  instagram: "https://www.instagram.com/pulseled.usa/",
  facebook: "https://www.facebook.com/profile.php?id=61593736915705",
};
