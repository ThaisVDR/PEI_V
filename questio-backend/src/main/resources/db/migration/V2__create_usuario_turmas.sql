create table usuario_turmas (
    id_usuario UUID not null,
    id_turma UUID not null,
    primary key (id_turma, id_usuario),
    constraint fk_usuario foreign key (id_usuario) references usuarios (id_usuario) on delete cascade,
    constraint fk_turma foreign key (id_turma) references turmas (id_turma) on delete cascade
);