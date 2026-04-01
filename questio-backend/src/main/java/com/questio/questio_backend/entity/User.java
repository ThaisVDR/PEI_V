package com.questio.questio_backend.entity;

import com.questio.questio_backend.entity.enums.TipoUsuario;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idUsuario;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "senha", nullable = false,length = 255)
    private String senha;

    @Column(nullable = false, length = 255)
    private String curso;

    @Column(name = "tipo", nullable = false)
    private String tipoUsuario;

    @Column(name = "termo_aceito", nullable = false)
    private Boolean termoAceito = false;

    @Builder.Default
    @Column(name = "xp_total", nullable = false)
    private Integer xpTotal = 0;

    @Builder.Default
    @Column(nullable = false)
    private Integer nivel = 1;

    @Builder.Default
    @Column(name = "sequencia_dias", nullable = false)
    private Integer streakAtual = 0;

    @Builder.Default
    @Column(name = "criado_em", updatable = false, nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority("ROLE" + this.tipoUsuario.toUpperCase()));
    }

    @Override
    public String getPassword() { return this.senha; }

    @Override
    public String getUsername() { return this.email; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
