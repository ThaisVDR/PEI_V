export const ALL_BADGES = [
  { label: "Primeiro Passo", icon: "🚀", desbloqueada: false },
  { label: "Streak de 7", icon: "🔥", desbloqueada: false },
  { label: "Top 10", icon: "🏆", desbloqueada: false },
  { label: "Maratonista", icon: "⚡", desbloqueada: false },
  { label: "Hackathon", icon: "🖥️", desbloqueada: false },
];

import { UsuarioLogado } from "../context/AuthContext";
export const getStats = (user?: UsuarioLogado | null) => [
  { label: "Tipo",    value: user?.tipoUsuario ?? "—" },
  { label: "Email",  value: user?.email        ?? "—" },
  { label: "Nível",  value: "1" },
  { label: "Insígnias", value: "0" },
];