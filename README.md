# Carva Admin — Painel do Organizador de Eventos

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EE5B9E?style=flat-square&logo=framer&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
[![Zod](https://img.shields.io/badge/Zod-3.22-3E67B1?style=flat-square)](https://zod.dev/)


---

## Descricao

Painel web para organizadores de eventos com autenticacao JWT, CRUD completo de eventos e participantes, e gerenciamento de regras de check-in com validacao cross-field avancada. O projeto conecta-se a uma API real configuravel via variavel de ambiente

---

## Stack Completa

| Camada | Tecnologia |
|---|---|
| Base | React 18 + TypeScript 5 + Vite 5 |
| Roteamento | React Router v6 + rotas protegidas com RequireAuth |
| Dados remotos | TanStack Query v5 (cache, mutations, loading/error states) |
| HTTP Client | Axios com interceptors de token e tratamento de 401 |
| Formularios | React Hook Form + Zod (schemas por dominio) |
| Estilos | Tailwind CSS (Design System Neo-Brutalista customizado) |
| Animacoes | Framer Motion - AnimatePresence para transicoes de rota e drawer mobile |
| Notificacoes | react-hot-toast com estetica Neo-Brutalista |
| Icones | Lucide React |
| Mock de API | MSW v2 (Mock Service Worker) |
| Utilitarios | clsx, tailwind-merge, date-fns, zustand |

---

## Como Rodar

### Pre-requisitos
- Node 18+
- npm ou pnpm

### Instalacao

```bash
git clone https://github.com/GustavoDiego/Frontend---Eventos.git
cd Frontend---Eventos
npm install
```

### Variaveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
# URL da API real (deixar em branco para usar o MSW)
VITE_API_URL=http://localhost:3000/api
```

Se `VITE_API_URL` nao estiver definido, todas as requisicoes caem no mock do MSW em `/api`.

### Rodar em desenvolvimento

```bash
npm run dev
```

O app sobe em `http://localhost:5173`. Abra o console do navegador para confirmar a mensagem `[MSW] Mocking enabled`.

**Credenciais de teste:**
```
E-mail: admin@events.com
Senha:  admin123
```

### Build de producao

```bash
npm run build
npm run preview
```

---

## Arquitetura

### Estrutura de Pastas

```
src/
 app/
    router.tsx              # Rotas + RequireAuth + withTransition HOC
    providers/
        AuthProvider.tsx    # Contexto JWT global
 components/
    layout/
       AppShell.tsx        # Layout base com AnimatePresence
       Topbar.tsx          # Header responsivo (hamburger em mobile/tablet)
       Transitions/
           PageTransition.tsx  # Wrapper framer-motion por rota
    ui/                    # Componentes "burros" reutilizaveis
        Button.tsx
        Input.tsx
        Select.tsx
        BannerAlert.tsx
        EmptyState.tsx
        Loading.tsx
 domain/                    # Modelos de dominio + schemas Zod
    auth/auth.schema.ts
    events/event.schema.ts
    participants/participant.schema.ts
    checkin/
        checkin.schema.ts
        checkin.validation.ts  # Validacao cross-field de janelas
 pages/
    Dashboard.tsx
    Login.tsx / Register.tsx / ErrorPage.tsx
    Events/
       EventsList.tsx
       EventForm.tsx
       CheckinRules.tsx
       CheckinRuleForm.tsx
    Participants/
        ParticipantsList.tsx
        ParticipantForm.tsx
 services/                  # Camada de acesso a API
    api.ts                 # Facade - re-exporta todos os services
    auth.service.ts
    dashboard.service.ts
    events.service.ts
    participants.service.ts
    checkin.service.ts
    api/
        http.ts            # Axios client com interceptors
 state/
    checkin.reducer.ts     # useReducer para estado das regras de check-in
 styles/
    globals.css            # Tailwind directives + @font-face + resets
 utils/
     storage.ts
```

### Padrao de Services (Facade)

`src/services/api.ts` e um facade puro que re-exporta todos os services individuais:

```ts
// Importar pelo facade (retrocompativel):
import { eventsService } from '@/services/api';

// Ou importar diretamente o service (preferido para novos usos):
import { eventsService } from '@/services/events.service';
```

Cada service isola logica de acesso a API, sanitizacao de payloads e parsing de resposta do backend.

---

## Decisoes de Arquitetura

### 1. Token JWT no localStorage
Para o escopo deste desafio a persistencia via `localStorage` e aceita. Em producao seria substituido por cookie `HttpOnly`. O `AuthProvider` centraliza todo o controle de acesso e forcas logout em caso de 401.

### 2. useReducer nas Regras de Check-in
A tela de `CheckinRules` usa `useReducer` pois o estado envolve: adicionar, editar localmente, descartar, e validar interdependencias entre regras antes de enviar o array inteiro em um unico `PUT`. O padrao `dispatch({ type, payload })` torna as transicoes auditageis.

### 3. Validacao Cross-field das Janelas de Horario
Regras com `obrigatoriedade: OBRIGATORIO` tem seus intervalos validados via `checkin.validation.ts`. A logica garante que as janelas de abertura (`liberarMinAntes`) e encerramento (`encerrarMinDepois`) nao criem periodos simultaneamente vazios entre regras ativas.

### 4. Design System Neo-Brutalista
Bordas solidas `4px #1A1A1A`, sombras estaticas sem blur (`box-shadow: 8px 8px 0`), paleta Sunset Paper (`#FAF6EF` base, `#FF4D3D` primary, `#B8F400` accent), tipografias `Laviossa` (display), `LifeCinemaScreen` (logo) e `Inter` (UI).

### 5. Responsividade  Mobile, Tablet e Desktop
- **Mobile e Tablet (< 1024px):** Topbar com menu hamburguer e drawer animado via Framer Motion.
- **Desktop (>= 1024px):** Header com navegacao inline e botao de logout.
- Listas usam `overflow-x-auto`; filtros colapsam em grid de 2 colunas em telas medias.

### 6. Transicoes de Pagina
Cada rota e envoluta pelo HOC `withTransition(Component)` no `router.tsx`, que injeta o `PageTransition` (Framer Motion) com slide-up de `0.2s`. O `AnimatePresence mode="wait"` no `AppShell` garante que o exit da pagina anterior complete antes do enter da proxima.

---

## Design Tokens (Paleta Principal)

| Token | Descricao | Hex |
|---|---|---|
| `bg` | Fundo papel quente | `#FAF6EF` |
| `ink` | Texto principal | `#1A1A1A` |
| `primary` | Coral | `#FF4D3D` |
| `secondary` | Royal Blue | `#2D5BFF` |
| `accent` | Lima | `#B8F400` |
| `accent2` | Magenta | `#FF2DAA` |
| `success` | Verde | `#14B86A` |
| `warning` | Ambar | `#FFB020` |
| `danger` | Vermelho | `#E5262A` |

---

## Scripts Disponiveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR
npm run build    # Type-check + build de producao (tsc && vite build)
npm run preview  # Preview do build local
npm run lint     # ESLint em todos os arquivos .ts/.tsx
```

---

## Integracao com API Real

Para desligar o MSW e conectar em um backend real, defina `VITE_API_URL` no `.env` apontando para a URL base da API. O `http.ts` injeta automaticamente o Bearer token em todas as requisicoes via interceptor e redireciona para `/login` em caso de `401`.
