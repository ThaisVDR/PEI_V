CREATE TABLE aulas
(
    id_aula      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dia_semana   VARCHAR(20)  NOT NULL,
    horario      VARCHAR(10)  NOT NULL,
    disciplina   VARCHAR(100) NOT NULL,
    sala         VARCHAR(50),
    id_professor UUID         NOT NULL REFERENCES usuarios (id_usuario),
    id_turma     UUID         NOT NULL REFERENCES turmas (id_turma)
);