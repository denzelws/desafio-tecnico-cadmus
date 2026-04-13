# Contacts API (Node.js)

API REST para gerenciamento de contatos com operações de CRUD completo.

## 🚀 Tecnologias

- Node.js 18
- Express.js
- MongoDB / Mongoose
- Yup (Validação)
- Jest (Testes)
- TypeScript
- Docker & Docker Compose

## 📋 Funcionalidades

- ✅ Criar contato (maior de idade, data ≤ hoje)
- ✅ Listar contatos (apenas ativos, com paginação)
- ✅ Visualizar detalhes do contato
- ✅ Atualizar contato
- ✅ Desativar contato
- ✅ Excluir contato
- ✅ Validação de entrada com Yup

## 🏗️ Arquitetura

```
src/
├── domain/              → Entidades, exceções, enums
├── application/         → DTOs, Services, Interfaces, Validators
├── infrastructure/      → Database, Repositories, Schemas
├── presentation/        → Controllers, Routes
└── middleware/         → Error handling, Validation
tests/
└── unit/              → Testes Unitários
```

## ⚡ Como Rodar

### Com Docker

```bash
docker-compose up --build
```

### Local

```bash
npm install
npm run build
npm start
```

## 📦 Endpoints

| Método | Endpoint                       | Descrição                                 |
| ------ | ------------------------------ | ----------------------------------------- |
| GET    | `/api/contacts`                | Listar contatos (paginado, apenas ativos) |
| GET    | `/api/contacts/:id`            | Buscar contato por ID                     |
| POST   | `/api/contacts`                | Criar novo contato                        |
| PUT    | `/api/contacts/:id`            | Atualizar contato                         |
| PATCH  | `/api/contacts/:id/deactivate` | Desativar contato                         |
| DELETE | `/api/contacts/:id`            | Excluir contato                           |

## 📝 Exemplos

### Criar Contato

```json
POST /api/contacts
{
  "name": "João Silva",
  "birthDate": "1995-05-15",
  "gender": 1
}
```

## 🧪 Testes

```bash
npm test
```

## 🔐 Validações

| Campo              | Regra                         |
| ------------------ | ----------------------------- |
| Nome               | Obrigatório                   |
| Data de Nascimento | Não pode ser futura           |
| Idade              | Deve ser maior de idade (≥18) |
| Gênero             | Male(1), Female(2), Other(3)  |

## 📄 Licença

MIT

```

```
