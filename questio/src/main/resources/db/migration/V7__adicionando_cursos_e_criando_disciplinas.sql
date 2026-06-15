ALTER TABLE cursos
    ADD COLUMN descricao VARCHAR(1000),
    ADD COLUMN carga_horaria VARCHAR(255),
    ADD COLUMN semestre VARCHAR(255),
    ADD COLUMN coordenador VARCHAR(255),
    ADD COLUMN vagas INTEGER;

CREATE TABLE disciplinas
(
    id_disciplina UUID PRIMARY KEY,
    nome          VARCHAR(150) NOT NULL,
    carga_horaria VARCHAR(255),
    id_curso      UUID         NOT NULL,
    CONSTRAINT fk_disciplinas_curso FOREIGN KEY (id_curso) REFERENCES cursos (id_curso)
);