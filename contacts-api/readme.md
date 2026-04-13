# Contacts API

API REST para gerenciamento de contatos com operações de CRUD completo.

## 🚀 Tecnologias

- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- FluentValidation
- Docker & Docker Compose
- XUnit & Moq (Testes)

## 📋 Funcionalidades

- ✅ Criar contato (maior de idade, data ≤ hoje)
- ✅ Listar contatos (apenas ativos, com paginação)
- ✅ Visualizar detalhes do contato
- ✅ Atualizar contato
- ✅ Desativar contato
- ✅ Excluir contato
- ✅ Validação de entrada com FluentValidation

## 🏗️ Arquitetura

```
src/
├── Contacts.Api           → Controllers, Middleware
├── Contacts.Application   → DTOs, Services, Interfaces, Validators
├── Contacts.Domain        → Entities, Enums, Exceptions, Interfaces
├── Contacts.Infrastructure → DbContext, Repositories, Migrations
tests/
└── Contacts.Tests        → Testes Unitários
```

## ⚡ Como Rodar

### Local (sem Docker)

```bash
# Restaurar dependências
dotnet restore

# Compilar
dotnet build

# Rodar migrações (necessário SQL Server local)
dotnet ef database update

# Iniciar API
dotnet run --project src/Contacts.Api/Contacts.Api.csproj
```

### Com Docker

```bash
# Subir containers
docker-compose up --build

# Acessar API
http://localhost:5000/swagger
```

## 📦 Endpoints

| Método | Endpoint                        | Descrição                                 |
| ------ | ------------------------------- | ----------------------------------------- |
| GET    | `/api/contacts`                 | Listar contatos (paginado, apenas ativos) |
| GET    | `/api/contacts/{id}`            | Buscar contato por ID                     |
| POST   | `/api/contacts`                 | Criar novo contato                        |
| PUT    | `/api/contacts/{id}`            | Atualizar contato                         |
| PATCH  | `/api/contacts/{id}/deactivate` | Desativar contato                         |
| DELETE | `/api/contacts/{id}`            | Excluir contato                           |

### Parâmetros de Query

- `page` - Página atual (padrão: 1)
- `pageSize` - Itens por página (padrão: 10)

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

### Resposta

```json
{
  "id": "guid",
  "name": "João Silva",
  "birthDate": "1995-05-15T00:00:00",
  "age": 29,
  "gender": 1,
  "isActive": true,
  "createdAt": "2026-04-13T00:00:00",
  "updatedAt": null
}
```

## 🧪 Testes

```bash
# Rodar todos os testes
dotnet test
```

## 🔐 Validações

| Campo              | Regra                           |
| ------------------ | ------------------------------- |
| Nome               | Obrigatório, máx 150 caracteres |
| Data de Nascimento | Não pode ser futura             |
| Idade              | Deve ser maior de idade (≥18)   |
| Gênero             | Male(1), Female(2), Other(3)    |

## 📄 Licença

MIT

```

---
```
