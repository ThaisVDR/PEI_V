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

> O `docker-compose.yml` sobe um PostgreSQL em `localhost:5432` com DB `questio_db`, usuário `postgres`, senha `root`.

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

### Usuário

#### `GET /api/user/me`
Retorna o perfil do usuário autenticado.

Resposta: `UserResponseDTO`.

#### `GET /api/user/ranking`
Ranking do usuário (placeholder no momento).

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

