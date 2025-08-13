# API de Gestão de Clínica Médica

Uma API simples feita em **Node.js**, **Express** e **PostgreSQL** para gerenciar uma clínica médica.

## Requisitos

- Node.js (v14+)
- PostgreSQL
- npm ou yarn

## Como rodar

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**
   - Copie `.env.example` para `.env`
   - Edite as informações do banco:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=clinica_medica
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     PORT=3000
     NODE_ENV=development
     ```

3. **Iniciar servidor**
   ```bash
   # Desenvolvimento (com auto-restart)
   npm run dev

   # Produção
   npm start
   ```

4. **Testar API**
   - Health check: `GET http://localhost:3000/health`
   - Documentação Swagger: `http://localhost:3000/api-docs`

**Exemplo de criação**
```bash
POST /api/pacientes
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com",
  "endereco": "Rua das Flores, 123",
  "data_nascimento": "1990-01-15",
  "id_convenio": 1
}
```

## Estrutura do projeto

```
src/
├── config/              # Configuração do banco
├── controllers/         # Lógica dos endpoints
├── routes/              # Definição das rotas
└── server.js            # Entrada da aplicação
```

## Recursos

- CRUD completo de pacientes
- Documentação interativa com Swagger
- Validação de entrada e tratamento de erros
- Relacionamento com convênios
- Consultas SQL puras (sem ORM)
