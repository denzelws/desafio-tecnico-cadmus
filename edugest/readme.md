# 📄 README.md

````markdown
# EduGest+ - Gestão de Escolas e Turmas

Aplicativo mobile para gestão de escolas públicas e suas turmas.

---

## 📋 Funcionalidades

### Módulo Escolas

- ✅ Listar escolas (nome, endereço, número de turmas)
- ✅ Adicionar nova escola (nome, endereço)
- ✅ Editar escola
- ✅ Excluir escola (com confirmação)
- ✅ Busca de escolas por nome/endereço

### Módulo Turmas

- ✅ Listar turmas por escola
- ✅ Adicionar nova turma (nome, turno, ano letivo)
- ✅ Editar turma
- ✅ Excluir turma (com confirmação)
- ✅ Filtro de turmas por turno

---

## 🛠️ Tecnologias

- **Framework**: Expo SDK 54+ / React Native 0.81+
- **Linguagem**: TypeScript
- **Navegação**: Expo Router
- **UI**: Gluestack UI
- **Estado**: Zustand (com persistência AsyncStorage)
- **Validação**: Zod + React Hook Form
- **Mock API**: MSW (Mock Service Worker)
- **Testes**: Jest

---

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone <repo-url>
cd edugest
```
````

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar o projeto

```bash
npx expo start
```

### 4. Executar em dispositivo/emulador

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Web
npx expo start --web
```

---

## 🧪 Executar Testes

```bash
# Rodar todos os testes
npm test

# Rodar com watch
npm run test:watch

# Ver cobertura
npm run test:coverage
```

---

## 📁 Estrutura do Projeto

```
src/
├── application/        # Camada de aplicação
│   ├── hooks/         # Hooks personalizados
│   ├── services/      # Serviços de API
│   └── store/         # Zustand stores
├── domain/            # Camada de domínio
│   ├── entities/      # Tipos TypeScript
│   └── schemas/       # Zod schemas (validação)
├── infrastructure/    # Infraestrutura
│   ├── api/           # Cliente HTTP
│   └── mock/          # MSW mocks
├── lib/               # Configurações de libs
└── presentation/      # Camada de apresentação
    ├── components/    # Componentes React
    │   ├── common/    # Componentes compartilhados
    │   ├── classes/   # Componentes de turmas
    │   └── schools/   # Componentes de escolas
    └── theme/         # Tokens de design
```

---

## 🎨 Design Tokens

O app usa um sistema de design tokens centralizado em `src/presentation/theme/token.ts`:

- **Cores**: Primary, surface, error, success, etc.
- **Espaçamento**: xs, sm, md, lg, xl
- **Border Radius**: sm, md, lg, xl, full

---

## 📱 Telas

| Tela              | Rota                                 | Descrição             |
| ----------------- | ------------------------------------ | --------------------- |
| Lista de Escolas  | `/schools`                           | Tela principal        |
| Nova Escola       | `/schools/new`                       | Formulário de criação |
| Editar Escola     | `/schools/:id/edit`                  | Formulário de edição  |
| Detalhe da Escola | `/schools/:id`                       | Lista de turmas       |
| Nova Turma        | `/schools/:id/classes/new`           | Formulário de criação |
| Editar Turma      | `/schools/:id/classes/:classId/edit` | Formulário de edição  |

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` se necessário:

```env
API_URL=http://localhost:3000/api
```

---

## 📄 Licença

MIT License

```

```
