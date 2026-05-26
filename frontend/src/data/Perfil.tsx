export const ALL_BADGES = [
  { label: "Primeiro Passo", icon: "🚀", desbloqueada: false },
  { label: "Streak de 7", icon: "🔥", desbloqueada: false },
  { label: "Top 10", icon: "🏆", desbloqueada: false },
  { label: "Maratonista", icon: "⚡", desbloqueada: false },
  { label: "Hackathon", icon: "🖥️", desbloqueada: false },
];

import { UsuarioLogado } from "../context/AuthContext";

// data/Perfil.ts

// data/Perfil.ts

export function getStats(user: UsuarioLogado | null) {
  return [
    {
      label: "Tipo",
      value: user?.tipoUsuario || "—",
      icon: "person-outline" as const,
      iconColor: "blue" as const,
    },
    {
      label: "Email",
      value: user?.email || "—",
      icon: "mail-outline" as const,
      iconColor: "purple" as const,
      smallValue: true,  // ← ativa fonte menor
    },
    {
      label: "Nível",
      value: 1,
      icon: "star-outline" as const,
      iconColor: "amber" as const,
    },
    {
      label: "Insígnias",
      value: 0,
      icon: "trophy-outline" as const,
      iconColor: "green" as const,
    },
  ];
}