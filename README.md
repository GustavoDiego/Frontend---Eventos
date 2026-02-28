# Carva Admin — Painel do Organizador de Eventos

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EE5B9E?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Zod](https://img.shields.io/badge/Zod-3.22-3E67B1?style=flat-square)](https://zod.dev/)

---

## Descrição

Painel web para organizadores de eventos com autenticação JWT, CRUD de eventos e participantes, e gerenciamento de regras de check-in com validação cross-field.

---

## Stack

- **Base:** React 18 + TypeScript + Vite
- **Roteamento:** React Router v6 (rotas protegidas)
- **Dados remotos:** TanStack Query (cache, loading/error, mutations)
- **HTTP:** Axios (interceptor de token + tratamento de 401)
- **Formulários/Validação:** React Hook Form + Zod
- **UI:** Tailwind CSS (Design System Neo-Brutalista customizado)
- **Animações:** Framer Motion (transições de rota + drawer)
- **Notificações:** react-hot-toast

---

## Como Rodar (local)

### Pré-requisitos
- Node 18+

### Instalar dependências

```bash
npm install
```

### Variáveis de ambiente

Crie `.env` na raiz:

```env
# Base URL da API (ex.: https://minha-api.com/api)
VITE_API_URL=https://backend-eventos-gw6c.onrender.com/api
```

Observações:
- Se `VITE_API_URL` não existir, o front usa `'/api'` como fallback (mesma origem).
- Como é Vite, `VITE_*` é injetado **no build**.

### Rodar

```bash
npm run dev
```

---

## Arquitetura (resumo)

- `src/domain/`: tipos e schemas Zod por domínio
- `src/services/`: camada de API organizada em services “pequenos” + **facade**
- `src/state/`: reducer/estado complexo (regras de check-in)
- `src/components/ui/`: componentes reutilizáveis
- `src/components/layout/`: layout + transições

### Services (Facade)

O arquivo `src/services/api.ts` é um **facade** que re-exporta os serviços:

```ts
import { eventsService, participantsService } from '@/services/api';
```

Para usos novos, também pode importar direto:

```ts
import { eventsService } from '@/services/events.service';
```

---

## Deploy na Vercel (produção)

### O que é obrigatório

1) **Rewrite de SPA (React Router)**
- O projeto usa `createBrowserRouter`. Em produção, qualquer rota (ex.: `/eventos/novo`) precisa cair no `index.html` quando o usuário dá refresh.
- Este repo já inclui `vercel.json` na raiz com o rewrite para `/index.html`.

2) **Build settings na Vercel**
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

3) **Variáveis de ambiente na Vercel**
Configure em **Settings → Environment Variables**:
- `VITE_API_URL` = `https://backend-eventos-gw6c.onrender.com/api`

Importante:
- `VITE_*` é lido em build time; mudou a env → precisa de redeploy.

### Observações sobre o back (Render)

- Como o back está rodando no Render, o **DB tem vida útil de ~1 mês** (pode ser apagado após esse período).
- Após **~15 minutos de inatividade**, a API pode “dormir” (cold start). Se isso acontecer, pode ser necessário **recarregar a página algumas vezes** até a API responder.

### Checklist final
- Backend com CORS permitindo o domínio da Vercel
- `VITE_API_URL` apontando para a API correta
- Rotas protegidas funcionando (refresh em rotas internas não pode dar 404)

---

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```
