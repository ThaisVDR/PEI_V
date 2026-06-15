export function getStats(user: any) {
  return [
    {
      label: "Pontos Totais",
      value: user?.xpTotal ?? 0,
      color: "blue" as const,
    },
    {
      label: "Streak Atual",
      value: user?.streakAtual ?? 0,
      color: "white" as const,
    },
    { label: "Posição", value: 1, color: "pink" as const },
    {
      label: "Insígnias",
      value: user?.insignias ?? 0,
      color: "white" as const,
    },
  ];
}

export const ALL_BADGES = [
  {
    label: "Primeiro Passo",
    icon: "🚀",
    desbloqueada: true,
    description: "Complete sua primeira atividade",
  },
  {
    label: "Streak de 7",
    icon: "🔥",
    desbloqueada: true,
    description: "7 dias consecutivos",
  },
  {
    label: "Top 10",
    icon: "🏆",
    desbloqueada: true,
    description: "Entre no top 10 do ranking",
  },
  {
    label: "Maratonista",
    icon: "⚡",
    desbloqueada: true,
    description: "Complete 50 questões em um dia",
  },
  {
    label: "Hacker",
    icon: "💻",
    desbloqueada: true,
    description: "Acerte 10 questões de programação",
  },
  {
    label: "Mestre",
    icon: "🎓",
    desbloqueada: false,
    description: "Alcance 5000 pontos",
  },
  {
    label: "Lendário",
    icon: "👑",
    desbloqueada: false,
    description: "Fique #1 no ranking",
  },
];
