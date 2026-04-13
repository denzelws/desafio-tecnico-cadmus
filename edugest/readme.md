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
- **Mock API (desenvolvimento)**: MirageJS
- **Mock API (testes)**: MSW (Mock Service Worker)
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

> **Nota**: O servidor MirageJS é iniciado automaticamente em modo de desenvolvimento (`__DEV__`), interceptando todas as requisições HTTP com dados mockados.

---

## 🪟 Configuração para WSL (Windows Subsystem for Linux)

Se você está desenvolvendo via WSL2, é necessário configurar o modo de rede espelhado para que dispositivos físicos consigam se conectar ao servidor de desenvolvimento.

### 1. Criar/editar o arquivo `.wslconfig`

No PowerShell (Windows), edite o arquivo em `%USERPROFILE%\.wslconfig`:

```ini
[wsl2]
networkingMode=mirrored
[experimental]
hostAddressLoopback=true
```

### 2. Reiniciar o WSL

```powershell
wsl --shutdown
```

### 3. Abrir o Firewall do Hyper-V (PowerShell como Administrador)

```powershell
Set-NetFirewallHyperVVMSetting -Name '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' -DefaultInboundAction Allow
```

Após isso, `npx expo start` exibirá o IP correto da sua rede local e o QR code funcionará normalmente com o Expo Go.

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
│   ├── api/           # Cliente HTTP (Axios)
│   ├── mirage/        # MirageJS server (desenvolvimento)
│   └── mock/          # MSW handlers (testes)
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
