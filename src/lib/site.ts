export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function whatsappLink(text?: string) {
  const phone = "5511999999999";
  const message = text
    ? encodeURIComponent(text)
    : encodeURIComponent("Olá! Gostaria de solicitar um orçamento para painéis de LED.");
  return `https://wa.me/${phone}?text=${message}`;
}
