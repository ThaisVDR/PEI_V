package com.questio.questio_backend.entity.enums;

public enum TipoUsuario {
    ALUNO("Aluno"),
    PROFESSOR("Professor"),
    COORDENACAO("Coordenacao");

    private final String valor;

    TipoUsuario(String valor) {
        this.valor = valor;
    }

    public String getValor() {
        return valor;
    }

    public String toUpperCase() {
        return valor;
    }
}
