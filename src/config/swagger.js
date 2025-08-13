const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Sistema de Gestão de Clínica Médica',
      version: '1.0.0',
      description: 'Uma API simples e direta para gerenciar uma clínica médica',
      contact: {
        name: 'Suporte da API',
        email: 'support@clinica-medica.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Paciente: {
          type: 'object',
          properties: {
            id_pessoa: {
              type: 'integer',
              description: 'ID do paciente (gerado automaticamente)',
              example: 1
            },
            nome: {
              type: 'string',
              description: 'Nome completo do paciente',
              example: 'João Silva'
            },
            cpf: {
              type: 'string',
              description: 'CPF do paciente',
              example: '123.456.789-00'
            },
            telefone: {
              type: 'string',
              description: 'Número de telefone do paciente',
              example: '(11) 99999-9999'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Endereço de e-mail do paciente',
              example: 'joao@email.com'
            },
            endereco: {
              type: 'string',
              description: 'Endereço do paciente',
              example: 'Rua das Flores, 123'
            },
            data_nascimento: {
              type: 'string',
              format: 'date',
              description: 'Data de nascimento do paciente',
              example: '1990-01-15'
            },
            id_convenio: {
              type: 'integer',
              description: 'ID do convênio (opcional)',
              example: 1
            },
            convenio_nome: {
              type: 'string',
              description: 'Nome do convênio',
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
              description: 'Nome completo do paciente',
              example: 'João Silva'
            },
            cpf: {
              type: 'string',
              description: 'CPF do paciente',
              example: '123.456.789-00'
            },
            telefone: {
              type: 'string',
              description: 'Número de telefone do paciente',
              example: '(11) 99999-9999'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Endereço de e-mail do paciente',
              example: 'joao@email.com'
            },
            endereco: {
              type: 'string',
              description: 'Endereço do paciente',
              example: 'Rua das Flores, 123'
            },
            data_nascimento: {
              type: 'string',
              format: 'date',
              description: 'Data de nascimento do paciente',
              example: '1990-01-15'
            },
            id_convenio: {
              type: 'integer',
              description: 'ID do convênio (opcional)',
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
              description: 'Mensagem de erro',
              example: 'Paciente não encontrado'
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
