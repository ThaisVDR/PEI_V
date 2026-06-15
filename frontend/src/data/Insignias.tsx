export const CATEGORIES = [
  { key: "todas", label: "Todas" },
  { key: "academico", label: "Acadêmico" },
  { key: "eventos", label: "Eventos" },
  { key: "projetos", label: "Projetos" },
];

export interface Badge {
  id: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  check: (user: any) => boolean; // 🔥 Regra de validação dinâmica
}

export const BADGES: Badge[] = [
  {
    id: "1",
    title: "Primeiro Passo",
    icon: "🚀",
    category: "academico",
    description: "Conclua sua primeira atividade",
    check: (user) => (user?.xpTotal ?? 0) > 0,
  },
  {
    id: "2",
    title: "Streak de 7",
    icon: "🔥",
    category: "academico",
    description: "Alcance uma ofensiva de 7 dias",
    check: (user) => (user?.streak ?? 0) >= 7,
  },
  {
    id: "3",
    title: "Veterano Clã",
    icon: "🏆",
    category: "eventos",
    description: "Chegue ao Nível 3",
    check: (user) => (user?.nivel ?? 1) >= 3,
  },
  {
    id: "4",
    title: "Maratonista",
    icon: "⚡",
    category: "academico",
    description: "Alcance 500 pontos totais",
    check: (user) => (user?.xpTotal ?? 0) >= 500,
  },
  {
    id: "5",
    title: "Nota Máxima",
    icon: "💯",
    category: "academico",
    description: "Alcance 1000 pontos totais",
    check: (user) => (user?.xpTotal ?? 0) >= 1000,
  },
  {
    id: "6",
    title: "Leitor Voraz",
    icon: "📚",
    category: "academico",
    description: "Alcance 1500 pontos totais",
    check: (user) => (user?.xpTotal ?? 0) >= 1500,
  },
  {
    id: "7",
    title: "Mestre Supremo",
    icon: "👑",
    category: "projetos",
    description: "Alcance 3000 pontos totais",
    check: (user) => (user?.xpTotal ?? 0) >= 3000,
  },
  {
    id: "8",
    title: "Streak de 30",
    icon: "⏱️",
    category: "academico",
    description: "Mantenha uma ofensiva de 30 dias",
    check: (user) => (user?.streak ?? 0) >= 30,
  },
];
