package com.questio.questio_backend.dto;

import com.questio.questio_backend.entity.enums.TipoUsuario;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {

    private Long idUsuario;
    private String nome;
    private String email;
    private String curso;
    private TipoUsuario tipoUsuario;
    private Boolean termoAceito;
    private Integer xpTotal;
    private Integer nivel;
    private Integer streakAtual;
    private String mensagem;
}
