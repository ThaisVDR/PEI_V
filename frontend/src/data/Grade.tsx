// data/Grade.ts
export interface Turma {
  idTurma: string; // Mapeado do idClass do backend
  nome: string;
  nomeProfessor: string;
  ativa: boolean;
}

export interface Professor {
  idUsuario: string;
  nome: string;
  email?: string;
}

export interface AulaRequestDTO {
  diaSemana: string;
  horario: string;
  disciplina: string;
  sala: string;
  idProfessor: string;
  idTurma: string;
  salva?: boolean; // controle local
}

export const DIAS_SEMANA = [
  "SEGUNDA",
  "TERCA",
  "QUARTA",
  "QUINTA",
  "SEXTA",
  "SABADO",
] as const;

export const HORARIOS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
] as const;

export type DiaSemana = (typeof DIAS_SEMANA)[number];
