# Medical Clinic Management System API

A simple and straightforward Node.js API for managing a medical clinic, built with Express.js and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the database connection details in `.env`:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=clinica_medica
   DB_USER=your_username
   DB_PASSWORD=your_password
   PORT=3000
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Test the API:**
   - Health check: `GET http://localhost:3000/health`
   - **API Documentation (Swagger)**: `http://localhost:3000/api-docs`

## 📚 API Documentation

The API includes interactive Swagger documentation available at `http://localhost:3000/api-docs`. This provides:

- Complete API endpoint documentation
- Interactive testing interface
- Request/response examples
- Schema definitions

## API Endpoints

### Patients (Pacientes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pacientes` | List all patients |
| GET | `/api/pacientes/:id` | Get patient by ID |
| POST | `/api/pacientes` | Create new patient |
| PUT | `/api/pacientes/:id` | Update patient |
| DELETE | `/api/pacientes/:id` | Delete patient |

### Patient Data Structure

```json
{
  "id_pessoa": 1,
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com",
  "endereco": "Rua das Flores, 123",
  "data_nascimento": "1990-01-15",
  "id_convenio": 1,
  "convenio_nome": "Unimed"
}
```

### Example Requests

**Create Patient:**
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

**Update Patient:**
```bash
PUT /api/pacientes/1
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "cpf": "123.456.789-00",
  "telefone": "(11) 88888-8888",
  "email": "joao.santos@email.com",
  "endereco": "Rua das Rosas, 456",
  "data_nascimento": "1990-01-15",
  "id_convenio": 2
}
```

## Project Structure

```
src/
├── config/
│   └── database.js      # Database connection configuration
├── controllers/
│   └── pacienteController.js  # Patient CRUD operations
├── routes/
│   └── pacienteRoutes.js      # Patient route definitions
└── server.js            # Main application entry point
```

## Features

- ✅ Full CRUD operations for patients
- ✅ Interactive API documentation with Swagger
- ✅ Database transactions for data integrity
- ✅ Proper error handling
- ✅ Input validation
- ✅ Foreign key relationship handling
- ✅ Clean and organized code structure
- ✅ Raw SQL queries (no ORM)

## Database Schema

The API follows the database schema defined in `.github/instructions/instructions.instructions.md`, with proper relationships between `Pessoa`, `Paciente`, and `Convenio` tables.

## Error Handling

The API includes comprehensive error handling for:
- Invalid input data
- Database constraint violations
- Missing resources (404)
- Server errors (500)

## Next Steps

This architecture is designed to be easily extensible. To add more CRUDs (e.g., for doctors, appointments), simply:

1. Create a new controller in `src/controllers/`
2. Create corresponding routes in `src/routes/`
3. Add the routes to `src/server.js`

The same pattern can be followed for all other entities in the medical clinic system.
