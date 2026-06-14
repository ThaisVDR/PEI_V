package com.questio.questio_backend.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Async
    public void enviarEmailResetSenha(String para, String urlLink) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            Context context = new Context();
            context.setVariable("urlLink", urlLink);

            String htmlConteudo = templateEngine.process("emails/reset-senha", context);

            helper.setTo(para);
            helper.setSubject("Questio - Redefinição de Senha");
            helper.setText(htmlConteudo, true);
            helper.setFrom("nao-responda@questio.com");

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            // Log de erro
        }
    }

    @Async
    public void enviarEmailVerificacaoHtml(String para, String nome, String urlLink) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            Context context = new Context();
            context.setVariable("nomeUsuario", nome);
            context.setVariable("urlLink", urlLink);

            String htmlConteudo = templateEngine.process("emails/verificar-email", context);

            helper.setTo(para);
            helper.setSubject("Bem-vindo ao Questio - Confirme seu e-mail");
            helper.setText(htmlConteudo, true);
            helper.setFrom("nao-responda@questio.com");

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email de verificação: " + e.getMessage());
        }
    }
}