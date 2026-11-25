<div align="center">

<img src="frontend/assets/icon_questio.png" alt="Logo do Questio" width="140">

# Questio

**Aplicativo acadêmico gamificado para alunos, professores e coordenação.**

![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Plataformas](https://img.shields.io/badge/plataformas-Android%20%7C%20iOS%20%7C%20Web-0372D6)

</div>

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades por perfil](#funcionalidades-por-perfil)
- [Gamificação](#gamificação)
- [Tecnologias](#tecnologias)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Telas e navegação](#telas-e-navegação)
- [Integração com a API](#integração-com-a-api)
- [Como executar](#como-executar)
- [Build e deploy](#build-e-deploy)
- [Identidade visual](#identidade-visual)
- [Ícones do projeto](#ícones-do-projeto)
- [Autoria](#autoria)

---

## Sobre o projeto

O **Questio** é o projeto integrador do 5º semestre. É um aplicativo multiplataforma (Android, iOS e Web) que transforma a rotina acadêmica em uma experiência com **XP, níveis, ofensiva diária (streak), ranking e insígnias**.

O app atende três perfis, identificados pelo campo `tipoUsuario` do login: **Aluno**, **Professor** e **Coordenação**. Cada perfil tem sua própria área, com abas e telas específicas.

> **Dica:** adicione capturas de tela em `docs/screenshots/` e referencie-as aqui, por exemplo: `![Home do aluno](docs/screenshots/home-aluno.png)`.

---

## Funcionalidades por perfil

### Aluno
- Check-in diário que mantém a **ofensiva (streak)** e registra a maior sequência.
- Painel com **progresso semanal** e lista de **tarefas pendentes**, cada uma com XP.
- Conclusão de tarefas e detalhes da tarefa.
- **Ranking** com o top 10 e a posição do usuário atual.
- **Insígnias** por categoria (Acadêmico, Eventos, Projetos).
- **Notificações** (sino com contador) alimentadas pelos eventos publicados.
- Perfil com nível, XP e insígnias.

### Professor
- Criação de **tarefas** para as turmas.
- Visualização de **eventos** da coordenação.
- Tela de **desempenho**.
- Perfil.

### Coordenação
- Painel de ações e resumo (dashboard).
- Montagem da **grade horária** (turma, professor, dia da semana, horário, disciplina e sala).
- Cadastro de **cursos** e **turmas**.
- Criação e exclusão de **eventos**, que viram notificações para os alunos.
- Perfil.

### Autenticação (todos os perfis)
- Login, primeiro acesso (cadastro), "esqueci minha senha" e redefinição de senha por **deep link** (`questio-app://reset-password`).

---

## Gamificação

| Regra | Valor |
|---|---|
| Nível | `Math.floor(xpTotal / 100) + 1` |
| XP | Ganho ao concluir tarefas (`+N XP`) |
| Ofensiva | Check-in diário (`POST /checkin`) |
| Ranking | Top 10 por XP + posição do usuário logado |

### Insígnias

| Ícone | Insígnia | Como conquistar |
|:---:|---|---|
| 🚀 | Primeiro Passo | Conclua sua primeira atividade |
| 🔥 | Streak de 7 | Alcance uma ofensiva de 7 dias |
| 🏆 | Veterano Clã | Chegue ao Nível 3 |
| ⚡ | Maratonista | Alcance 500 pontos totais |
| 💯 | Nota Máxima | Alcance 1000 pontos totais |
| 📚 | Leitor Voraz | Alcance 1500 pontos totais |
| 👑 | Mestre Supremo | Alcance 3000 pontos totais |
| ⏱️ | Streak de 30 | Mantenha uma ofensiva de 30 dias |

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | [Expo](https://expo.dev) ~54 · [React Native](https://reactnative.dev) 0.81 · React 19 |
| Linguagem | TypeScript ~5.9 |
| Navegação | [expo-router](https://docs.expo.dev/router/introduction/) ~6 (rotas por arquivo, `Stack` + `Tabs`) |
| HTTP | [axios](https://axios-http.com) com interceptor que injeta o `Bearer token` |
| Sessão | `AsyncStorage` · `expo-secure-store` · `jwt-decode` |
| UI | `expo-linear-gradient` · `@react-native-masked-view/masked-view` · `react-native-svg` · `react-native-reanimated` |
| Ícones | `@expo/vector-icons` (Ionicons, Feather, MaterialCommunityIcons) |
| Outros | `@react-native-community/datetimepicker` · `expo-document-picker` · `expo-crypto` |
| Build | [EAS Build](https://docs.expo.dev/build/introduction/) · Gradle (Android) |
| Hospedagem web | Vercel (`vercel.json` com rewrite para `index.html`) |

---

## Estrutura do repositório

```text
PEI_V/
├── README.md
├── docs/
│   └── icons/                 # PNGs de todos os ícones usados no app
└── frontend/
    ├── app.json               # Nome, scheme, ícones e splash (Expo)
    ├── eas.json               # Perfis de build (development, preview, production)
    ├── vercel.json            # Deploy da versão web
    ├── assets/                # Logo, favicon, ícone adaptativo e splash
    ├── android/               # Projeto nativo Android (com.questio.app)
    └── src/
        ├── app/               # Rotas (expo-router)
        │   ├── index.tsx      # Splash animada + redirecionamento por perfil
        │   ├── _layout.tsx    # Stack raiz + AuthProvider
        │   └── screens/
        │       ├── (Authenticator)/   # Login, Register, ForgotPassWord, ResetPassWord
        │       ├── (Aluno)/           # Home, Tasks, TaskDetails, Ranking, Insignias, Perfil
        │       ├── (Professor)/       # Home, Tasks, Evento, Desempenho, Perfil
        │       └── (Coordenador)/     # Home, Grade, Cursos, Evento, Turmas, Perfil
        ├── components/        # Button, Input, Pill, RadioSelect, StreakCard, Loader, AulaForm, ...
        ├── context/           # AuthContext (login, logout, XP local)
        ├── hooks/             # useTasks, useGrade
        ├── services/          # api.ts (axios + interceptor)
        ├── data/              # Insígnias, grade, tarefas, perfil
        └── styles/            # StyleSheets por tela
```

---

## Telas e navegação

Ao abrir o app, a splash anima a logo por cerca de 2,5 s e lê o token e o `tipoUsuario` salvos. Sem token, vai para o **Login**. Com token, redireciona para a Home do perfil.

| Perfil | Abas |
|---|---|
| Aluno | Início · Tarefas · Ranking · Insígnias · Perfil |
| Professor | Início · Tarefas · Evento · Desempenho · Perfil |
| Coordenação | Início · Grade · Cursos · Evento · Perfil (e Turmas) |

---

## Integração com a API

URL base definida em `frontend/src/services/api.ts`:

```ts
export const API_URL = "https://questio-backend-ku6u.onrender.com/api";
```

O interceptor lê `@Questio:user` do `AsyncStorage` e envia `Authorization: Bearer <token>` em cada requisição.

| Área | Método e rota |
|---|---|
| Autenticação | `POST /auth/register` · `POST /auth/forgot-password` · `POST /auth/reset-password` |
| Usuário | `GET /user/me` · `GET /user/ranking` |
| Check-in | `POST /checkin` |
| Tarefas | `GET /tarefas` · `POST /tarefas/criar` · `PATCH /tarefas/{id}/concluir` |
| Eventos | `GET /eventos` · `POST /eventos` · `DELETE /eventos/{id}` |
| Coordenação | `GET /coordenacao/cursos` · `POST /coordenacao/cursos/criar` · `GET /coordenacao/turmas` · `POST /coordenacao/turmas/criar` · `GET /coordenacao/professores` · `POST /coordenacao/grade` · `GET /coordenacao/dashboard/resumo` |

> O backend não faz parte deste repositório. Ele está hospedado no Render, que pode levar alguns segundos para responder na primeira chamada.

---

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- npm
- App **Expo Go** no celular, ou um emulador Android/iOS configurado

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/ThaisVDR/PEI_V.git

# 2. Entre na pasta do frontend
cd PEI_V/frontend

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm start
```

### Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm start` | Inicia o Expo (QR code para o celular) |
| `npm run web` | Executa a versão web |
| `npm run android` | Compila e executa no Android (`expo run:android`) |
| `npm run ios` | Compila e executa no iOS (`expo run:ios`) |

> O projeto usa `expo-dev-client`, então algumas bibliotecas nativas podem exigir `npm run android` ou `npm run ios` em vez do Expo Go.

---

## Build e deploy

| Destino | Como |
|---|---|
| Android/iOS | `npx eas build --profile preview --platform android` (perfis em `eas.json`: `development`, `preview`, `production`) |
| Web | `npx expo export --platform web` gera a pasta `dist/`, publicada na Vercel com o rewrite de `vercel.json` |

Identificadores: pacote Android e bundle iOS `com.questio.app`, scheme `questio-app`.

---

## Identidade visual

| Elemento | Valor |
|---|---|
| Tema | Escuro (`#020617`, `#050E1D`, `#091628`) |
| Cor de destaque | `#0177F1` / `#0372D6` |
| Gradiente da marca | `#00D2B4` → `#007BFF` |
| XP e pontuação | `#FFD700` |
| Alertas | `#FF5B73` · `#FF6B6B` |

### Ícones do aplicativo

| Logo | Favicon | Ícone adaptativo (Android) | Splash |
|:---:|:---:|:---:|:---:|
| <img src="frontend/assets/icon_questio.png" width="96"> | <img src="frontend/assets/favicon.png" width="96"> | <img src="frontend/assets/adaptive-icon.png" width="96"> | <img src="frontend/assets/splash-icon.png" width="96"> |
| `icon_questio.png` | `favicon.png` | `adaptive-icon.png` | `splash-icon.png` |

---

## Ícones do projeto

Todos os ícones de interface vêm do pacote `@expo/vector-icons`. As imagens abaixo estão em `docs/icons/<biblioteca>/<nome>.png`.

#### Feather (29)

|   |   |   |   |   |   |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="docs/icons/Feather/alert-circle.png" width="36" alt="alert-circle"><br><sub><code>alert-circle</code></sub> | <img src="docs/icons/Feather/arrow-left.png" width="36" alt="arrow-left"><br><sub><code>arrow-left</code></sub> | <img src="docs/icons/Feather/award.png" width="36" alt="award"><br><sub><code>award</code></sub> | <img src="docs/icons/Feather/book.png" width="36" alt="book"><br><sub><code>book</code></sub> | <img src="docs/icons/Feather/book-open.png" width="36" alt="book-open"><br><sub><code>book-open</code></sub> | <img src="docs/icons/Feather/calendar.png" width="36" alt="calendar"><br><sub><code>calendar</code></sub> |
| <img src="docs/icons/Feather/check.png" width="36" alt="check"><br><sub><code>check</code></sub> | <img src="docs/icons/Feather/check-circle.png" width="36" alt="check-circle"><br><sub><code>check-circle</code></sub> | <img src="docs/icons/Feather/chevron-down.png" width="36" alt="chevron-down"><br><sub><code>chevron-down</code></sub> | <img src="docs/icons/Feather/chevron-right.png" width="36" alt="chevron-right"><br><sub><code>chevron-right</code></sub> | <img src="docs/icons/Feather/edit-3.png" width="36" alt="edit-3"><br><sub><code>edit-3</code></sub> | <img src="docs/icons/Feather/eye.png" width="36" alt="eye"><br><sub><code>eye</code></sub> |
| <img src="docs/icons/Feather/eye-off.png" width="36" alt="eye-off"><br><sub><code>eye-off</code></sub> | <img src="docs/icons/Feather/file.png" width="36" alt="file"><br><sub><code>file</code></sub> | <img src="docs/icons/Feather/file-text.png" width="36" alt="file-text"><br><sub><code>file-text</code></sub> | <img src="docs/icons/Feather/inbox.png" width="36" alt="inbox"><br><sub><code>inbox</code></sub> | <img src="docs/icons/Feather/lock.png" width="36" alt="lock"><br><sub><code>lock</code></sub> | <img src="docs/icons/Feather/mail.png" width="36" alt="mail"><br><sub><code>mail</code></sub> |
| <img src="docs/icons/Feather/plus.png" width="36" alt="plus"><br><sub><code>plus</code></sub> | <img src="docs/icons/Feather/plus-circle.png" width="36" alt="plus-circle"><br><sub><code>plus-circle</code></sub> | <img src="docs/icons/Feather/save.png" width="36" alt="save"><br><sub><code>save</code></sub> | <img src="docs/icons/Feather/send.png" width="36" alt="send"><br><sub><code>send</code></sub> | <img src="docs/icons/Feather/trash-2.png" width="36" alt="trash-2"><br><sub><code>trash-2</code></sub> | <img src="docs/icons/Feather/upload.png" width="36" alt="upload"><br><sub><code>upload</code></sub> |
| <img src="docs/icons/Feather/upload-cloud.png" width="36" alt="upload-cloud"><br><sub><code>upload-cloud</code></sub> | <img src="docs/icons/Feather/user.png" width="36" alt="user"><br><sub><code>user</code></sub> | <img src="docs/icons/Feather/users.png" width="36" alt="users"><br><sub><code>users</code></sub> | <img src="docs/icons/Feather/x.png" width="36" alt="x"><br><sub><code>x</code></sub> | <img src="docs/icons/Feather/align-left.png" width="36" alt="align-left"><br><sub><code>align-left</code></sub> |  |

#### Ionicons (26)

|   |   |   |   |   |   |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="docs/icons/Ionicons/alarm.png" width="36" alt="alarm"><br><sub><code>alarm</code></sub> | <img src="docs/icons/Ionicons/bar-chart-outline.png" width="36" alt="bar-chart-outline"><br><sub><code>bar-chart-outline</code></sub> | <img src="docs/icons/Ionicons/calendar-clear-outline.png" width="36" alt="calendar-clear-outline"><br><sub><code>calendar-clear-outline</code></sub> | <img src="docs/icons/Ionicons/calendar-number-outline.png" width="36" alt="calendar-number-outline"><br><sub><code>calendar-number-outline</code></sub> | <img src="docs/icons/Ionicons/checkbox-outline.png" width="36" alt="checkbox-outline"><br><sub><code>checkbox-outline</code></sub> | <img src="docs/icons/Ionicons/checkmark.png" width="36" alt="checkmark"><br><sub><code>checkmark</code></sub> |
| <img src="docs/icons/Ionicons/checkmark-circle-outline.png" width="36" alt="checkmark-circle-outline"><br><sub><code>checkmark-circle-outline</code></sub> | <img src="docs/icons/Ionicons/chevron-forward.png" width="36" alt="chevron-forward"><br><sub><code>chevron-forward</code></sub> | <img src="docs/icons/Ionicons/close.png" width="36" alt="close"><br><sub><code>close</code></sub> | <img src="docs/icons/Ionicons/document-text.png" width="36" alt="document-text"><br><sub><code>document-text</code></sub> | <img src="docs/icons/Ionicons/flame.png" width="36" alt="flame"><br><sub><code>flame</code></sub> | <img src="docs/icons/Ionicons/flash.png" width="36" alt="flash"><br><sub><code>flash</code></sub> |
| <img src="docs/icons/Ionicons/home-outline.png" width="36" alt="home-outline"><br><sub><code>home-outline</code></sub> | <img src="docs/icons/Ionicons/log-out-outline.png" width="36" alt="log-out-outline"><br><sub><code>log-out-outline</code></sub> | <img src="docs/icons/Ionicons/megaphone.png" width="36" alt="megaphone"><br><sub><code>megaphone</code></sub> | <img src="docs/icons/Ionicons/notifications.png" width="36" alt="notifications"><br><sub><code>notifications</code></sub> | <img src="docs/icons/Ionicons/people.png" width="36" alt="people"><br><sub><code>people</code></sub> | <img src="docs/icons/Ionicons/people-outline.png" width="36" alt="people-outline"><br><sub><code>people-outline</code></sub> |
| <img src="docs/icons/Ionicons/person.png" width="36" alt="person"><br><sub><code>person</code></sub> | <img src="docs/icons/Ionicons/person-outline.png" width="36" alt="person-outline"><br><sub><code>person-outline</code></sub> | <img src="docs/icons/Ionicons/ribbon-outline.png" width="36" alt="ribbon-outline"><br><sub><code>ribbon-outline</code></sub> | <img src="docs/icons/Ionicons/star.png" width="36" alt="star"><br><sub><code>star</code></sub> | <img src="docs/icons/Ionicons/time.png" width="36" alt="time"><br><sub><code>time</code></sub> | <img src="docs/icons/Ionicons/time-outline.png" width="36" alt="time-outline"><br><sub><code>time-outline</code></sub> |
| <img src="docs/icons/Ionicons/trending-up.png" width="36" alt="trending-up"><br><sub><code>trending-up</code></sub> | <img src="docs/icons/Ionicons/trophy.png" width="36" alt="trophy"><br><sub><code>trophy</code></sub> |  |  |  |  |

#### MaterialCommunityIcons (5)

|   |   |   |   |   |   |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="docs/icons/MaterialCommunityIcons/calendar-outline.png" width="36" alt="calendar-outline"><br><sub><code>calendar-outline</code></sub> | <img src="docs/icons/MaterialCommunityIcons/chart-bar.png" width="36" alt="chart-bar"><br><sub><code>chart-bar</code></sub> | <img src="docs/icons/MaterialCommunityIcons/lightning-bolt.png" width="36" alt="lightning-bolt"><br><sub><code>lightning-bolt</code></sub> | <img src="docs/icons/MaterialCommunityIcons/robot-outline.png" width="36" alt="robot-outline"><br><sub><code>robot-outline</code></sub> | <img src="docs/icons/MaterialCommunityIcons/school-outline.png" width="36" alt="school-outline"><br><sub><code>school-outline</code></sub> |  |

#### Ícones dinâmicos das notificações

O título do evento define o ícone: títulos com "urgente", "prazo" ou "prova" usam `alarm`; com "aviso" ou "importante" usam `megaphone`; os demais usam `document-text`.

---

## Autoria

Projeto integrador do 5º semestre.

- GitHub: [@ThaisVDR](https://github.com/ThaisVDR)
