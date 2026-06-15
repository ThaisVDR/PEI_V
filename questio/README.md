# Questio Backend

Backend gamificado para estudantes universitários (API REST).

## Stack

- Java 21
- Spring Boot (WebMVC, Validation, Security)
- Spring Data JPA + Hibernate
- PostgreSQL (dev) + H2 (apenas testes)
- JWT (jjwt)
- Swagger UI (springdoc-openapi)

## Como rodar (desenvolvimento)

### 1) Subir o banco (PostgreSQL)

Na raiz do projeto:

```bash
docker-compose up -d
```

> O `docker-compose.yml` sobe um PostgreSQL em `localhost:5433` com DB `questio_db`, usuário `postgres`, senha `root` (porta externa 5433 para evitar conflitos locais).

### 2) Rodar a aplicação

```bash
./mvnw spring-boot:run
```

Aplicação: `http://localhost:8080`  
Swagger UI: `http://localhost:8080/swagger-ui.html`

## Estrutura do projeto (o que já existe)

- `config/`
  - `CorsConfig.java`, `SecurityConfig.java`, `SecurityFilter.java` (filtro JWT)
- `controller/` (camada HTTP)
  - `AuthController` (cadastro/login)
  - `UserController` (perfil/ranking)
  - `CoordinationController` + `DashboardController` (rotas de coordenação)
  - `TaskController` (tarefas/submissões)
- `service/` (regras de negócio)
  - `UserServiceImpl` (cadastro/login + perfil básico)
  - `GamificationServiceImpl` (XP/nível/streak/atividade)
  - `TaskService` (criação/submissão/listagem de tarefas)
  - `ClassService` (criação de turma + matrícula)
  - `DashboardServiceImpl` (resumo + cursos)
- `entity/` + `repository/`
  - Entidades principais: `User`, `Class` (turma), `Task`, `SubmitTask`, `Curso`
  - Repositórios: `UserRepository`, `ClassRepository`, `TaskRepository`, `SubmitRepository`, `CursoRepository`

## Autenticação (JWT)

O login retorna um token JWT.

Para acessar rotas que dependem do usuário logado, envie:

```
Authorization: Bearer <token>
```

Perfis (enum `TipoUsuario`):
- `ALUNO`
- `PROFESSOR`
- `COORDENACAO`

## Endpoints (para o Front)

Base URL (local): `http://localhost:8080`

### Autenticação

#### `POST /api/auth/register`
Cria um usuário.

Body (JSON):
```json
{
  "nome": "João",
  "email": "joao@email.com",
  "senha": "minhasenha123",
  "curso": "Sistemas de Informação",
  "tipoUsuario": "ALUNO",
  "termoAceito": true
}
```

Resposta: `UserResponseDTO` (em caso de erro, vem `mensagem` preenchida).

> Observação (fase 3): após cadastrar, o usuário precisa **confirmar o e-mail** para conseguir fazer login.

#### `POST /api/auth/login`
Login do usuário.

Body (JSON):
```json
{ "email": "joao@email.com", "senha": "minhasenha123" }
```

Resposta:
```json
{ "token": "<jwt>", "mensagem": "Login bem-sucedido!" }
```

#### `GET /api/auth/verificar-email?token=...`
Endpoint chamado pelo link enviado por e-mail no cadastro. Ativa a conta do usuário.

Resposta: texto simples (`"Conta ativada com sucesso! Você já pode fazer login."`).

#### `POST /api/auth/forgot-password`
Solicita link/token de redefinição de senha por e-mail.

Body (JSON):
```json
{ "email": "joao@email.com" }
```

Resposta: texto simples (por segurança a mensagem é genérica).

#### `POST /api/auth/reset-password`
Redefine senha usando token gerado no “forgot-password”.

Body (JSON):
```json
{ "token": "<token>", "novaSenha": "NovaSenha123" }
```

Resposta: texto simples (`"Senha redefinida com sucesso!"`).

### Usuário

#### `GET /api/user/me`
Retorna o perfil do usuário autenticado.

Resposta: `UserResponseDTO`.

#### `GET /api/user/ranking`
Ranking do usuário.

Resposta: `UserRankingResponseDTO`.

### Coordenação / Turmas

#### `POST /api/coordenacao/turmas`
Cria uma turma.

Body (JSON):
```json
{ "nome": "Turma A", "idProfessor": "UUID_DO_PROFESSOR" }
```

Resposta: `ClassResponseDTO`.

#### `POST /api/coordenacao/matricular-alunos`
Matricula alunos em uma turma.

Body (JSON):
```json
{
  "idTurma": "UUID_DA_TURMA",
  "idsAlunos": ["UUID_ALUNO_1", "UUID_ALUNO_2"]
}
```

Resposta: string (`"Alunos matriculados com sucesso na turma!"`).

#### `PATCH /api/coordenacao/usuarios/{idUsuario}/acesso`
Bloqueia/libera o acesso do usuário às rotas (ex.: tarefas).

Body (JSON):
```json
{ "acessoBloqueado": true }
```

Resposta: `UserResponseDTO` (com `acessoBloqueado` e `mensagem`).

### Coordenação / Dashboard

#### `GET /api/coordenacao/dashboard/resumo`
Retorna totais para dashboard.

Resposta:
```json
{ "totalAlunos": 0, "totalProfessores": 0, "totalCursosAtivos": 0 }
```

#### `GET /api/coordenacao/dashboard/cursos-alunos`
Lista cursos ativos + quantidade de alunos.

Resposta: `List<CursoDashboardDTO>`.

### Tarefas

#### `POST /api/tarefas/criar`
Cria uma tarefa para uma turma.

Body (JSON):
```json
{
  "titulo": "Atividade 1",
  "descricao": "Ler capítulo 3",
  "prazo": "2026-06-01T23:59:00",
  "pontos": 10,
  "idClass": "UUID_DA_TURMA"
}
```

Resposta: `TaskResponseDTO`.

#### `POST /api/tarefas/submeter`
Submete uma tarefa.

Body (JSON):
```json
{ "idTask": "UUID_DA_TAREFA", "arquivoUrl": "https://..." }
```

Resposta:
```json
{ "mensagem": "Tarefa enviada com sucesso! +10 XP" }
```

#### `GET /api/tarefas/minhas-tarefas`
Lista tarefas do aluno autenticado (baseado nas turmas em que ele está matriculado).

Resposta: `List<TaskResponseDTO>`.

## Testes

Os testes (`./mvnw test`) rodam com banco em memória (H2) via `src/test/resources/application.properties`, então **não precisa** de Postgres rodando para passar o `contextLoads`.

## Migrations (Flyway)

O projeto usa **Flyway** com migrations em `src/main/resources/db/migration` (V1, V2, V3, V4...).

- Por padrão, ao subir a aplicação apontando para o PostgreSQL do `docker-compose.yml`, o Flyway aplica as migrations automaticamente.
- `spring.jpa.hibernate.ddl-auto` está configurado como `validate` para evitar que o Hibernate “crie/alterar” tabelas por conta própria em produção/dev.

## Padrão de erros (JSON)

Quando a API lança exceções de validação/negócio, a resposta segue este formato:

```json
{
  "timestamp": "2026-05-18T22:00:00-04:00",
  "status": 400,
  "code": "BAD_REQUEST",
  "message": "mensagem do erro",
  "path": "/api/...",
  "fields": { "campo": "erro" }
}
```

## Documentos do projeto

- Sprint/roadmap: `docs/README_SPRINT_QUESTIO.md`

## Nota sobre SOLID / SRP (gamificação)

O backend separa a lógica de gamificação em um serviço dedicado (`GamificationService`):

- **Streak/atividade**: atualização de sequência de dias e última atividade
- **XP/Nível**: atualização de XP e recálculo de nível

Assim, o `updateStreak(...)` não mistura pontuação/nivelamento com a sequência de dias.

## Streak: onde contabiliza e onde reseta

### Onde a streak é salva

- `User.streakAtual`
- `User.ultimoCheckinEm` (referência para cálculo do streak)
- `User.ultimaAtividadeEm` (atividade geral no app)

### Onde contabiliza (check-in)

- `service/GamificationServiceImpl.java` → `checkin(UUID userId)`

#### Gatilho atual no backend

- `GET /api/user/me` chama `gamificationService.checkin(...)` automaticamente ao buscar o perfil do usuário autenticado.

#### Regra de negócio (streak)

- **Primeiro check-in**: streak vira **1**
- **Mesmo dia**: mantém o valor
- **Dia seguinte (ontem)**: incrementa (`+1`)
- **Ficou 1+ dia sem entrar (último check-in < ontem)**: **reseta para 0 imediatamente** (antes de “informar o streak”) e registra o check-in do dia atual para evitar reset repetido no mesmo dia.

### Onde registra atividade (última atividade)

- Login: `service/UserServiceImpl.java` → `login(...)`
- Submeter tarefa: `service/TaskService.java` → `gamificationService.touchActivity(...)`
- Check-in (`/api/user/me`): o `checkin(...)` também atualiza `ultimaAtividadeEm`

### Onde reseta automaticamente

- `service/ResetStreakScheduler.java` (job agendado)
- Habilita com: `questio.scheduling.reset-streak.enabled=true`
- Critério do job: usuários com `ultimoCheckinEm` antigo e `streakAtual > 0`
