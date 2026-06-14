// Retorna os 4 cards de stats com as cores corretas da tela
export function getStats(user: any) {
  return [
    {
      label: "Pontos Totais",
      value: user?.pontos ?? 1880,
      color: "blue" as const, // cyan #00d4ff
    },
    {
      label: "Streak Atual",
      value: user?.streak ?? 7,
      color: "white" as const,
    },
    {
      label: "Posição",
      value: user?.posicao ? `#${user.posicao}` : "#3",
      color: "pink" as const, // vermelho/rosa #e8445a
    },
    {
      label: "Insígnias",
      value: user?.insignias ?? 7,
      color: "white" as const,
    },
  ];
}

// Todas as conquistas — só as desbloqueadas aparecem nos ícones horizontais
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
