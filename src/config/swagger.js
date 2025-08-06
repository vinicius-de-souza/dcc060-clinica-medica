const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Medical Clinic Management System API',
      version: '1.0.0',
      description: 'A simple and straightforward API for managing a medical clinic',
      contact: {
        name: 'API Support',
        email: 'support@clinica-medica.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Paciente: {
          type: 'object',
          properties: {
            id_pessoa: {
              type: 'integer',
              description: 'Patient ID (auto-generated)',
              example: 1
            },
            nome: {
              type: 'string',
              description: 'Patient full name',
              example: 'João Silva'
            },
            cpf: {
              type: 'string',
              description: 'Patient CPF (Brazilian ID)',
              example: '123.456.789-00'
            },
            telefone: {
              type: 'string',
              description: 'Patient phone number',
              example: '(11) 99999-9999'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Patient email address',
              example: 'joao@email.com'
            },
            endereco: {
              type: 'string',
              description: 'Patient address',
              example: 'Rua das Flores, 123'
            },
            data_nascimento: {
              type: 'string',
              format: 'date',
              description: 'Patient birth date',
              example: '1990-01-15'
            },
            id_convenio: {
              type: 'integer',
              description: 'Health insurance ID (optional)',
              example: 1
            },
            convenio_nome: {
              type: 'string',
              description: 'Health insurance name',
              example: 'Unimed'
            }
          },
          required: ['nome', 'cpf', 'data_nascimento']
        },
        PacienteInput: {
          type: 'object',
          properties: {
            nome: {
              type: 'string',
              description: 'Patient full name',
              example: 'João Silva'
            },
            cpf: {
              type: 'string',
              description: 'Patient CPF (Brazilian ID)',
              example: '123.456.789-00'
            },
            telefone: {
              type: 'string',
              description: 'Patient phone number',
              example: '(11) 99999-9999'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Patient email address',
              example: 'joao@email.com'
            },
            endereco: {
              type: 'string',
              description: 'Patient address',
              example: 'Rua das Flores, 123'
            },
            data_nascimento: {
              type: 'string',
              format: 'date',
              description: 'Patient birth date',
              example: '1990-01-15'
            },
            id_convenio: {
              type: 'integer',
              description: 'Health insurance ID (optional)',
              example: 1
            }
          },
          required: ['nome', 'cpf', 'data_nascimento']
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Patient not found'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/server.js']
};

const specs = swaggerJSDoc(options);

module.exports = {
  specs,
  swaggerUi
};
