CREATE TABLE notificacoes
(
    id_notificacao UUID                  NOT NULL,
    id_usuario     UUID                  NOT NULL,
    titulo         VARCHAR(150)          NOT NULL,
    mensagem       TEXT                  NOT NULL,
    lida           BOOLEAN DEFAULT FALSE NOT NULL,
    criada_em      TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT pk_notificacoes PRIMARY KEY (id_notificacao),
    CONSTRAINT fk_notificacoes_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);