const express = require('express');
const {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
} = require('../controllers/pacienteController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Endpoints para gerenciamento de pacientes
 */

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Busca todos os pacientes
 *     description: Retorna uma lista de todos os pacientes com suas informações pessoais e detalhes do convênio
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /api/pacientes - Lista todos os pacientes
router.get('/', getAllPacientes);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Busca um paciente por ID
 *     description: Retorna um paciente específico pelo seu ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Paciente
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Paciente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /api/pacientes/:id - Busca paciente por ID
router.get('/:id', getPacienteById);

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     description: Cria um novo paciente com informações pessoais e convênio opcional
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *           example:
 *             nome: "João Silva"
 *             cpf: "123.456.789-00"
 *             telefone: "(11) 99999-9999"
 *             email: "joao@email.com"
 *             endereco: "Rua das Flores, 123"
 *             data_nascimento: "1990-01-15"
 *             id_convenio: 1
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Requisição inválida - Dados de entrada inválidos ou CPF já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// POST /api/pacientes - Cria um novo paciente
router.post('/', createPaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     summary: Atualiza um paciente existente
 *     description: Atualiza as informações de um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Paciente
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *           example:
 *             nome: "João Silva Santos"
 *             cpf: "123.456.789-00"
 *             telefone: "(11) 88888-8888"
 *             email: "joao.santos@email.com"
 *             endereco: "Rua das Rosas, 456"
 *             data_nascimento: "1990-01-15"
 *             id_convenio: 2
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Requisição inválida - Dados de entrada inválidos ou CPF já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// PUT /api/pacientes/:id - Atualiza um paciente
router.put('/:id', updatePaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     summary: Deleta um paciente
 *     description: Deleta um paciente por ID. Não é possível deletar pacientes com consultas existentes.
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Paciente
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Paciente deletado com sucesso
 *       400:
 *         description: Requisição inválida - Não é possível deletar paciente com consultas existentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// DELETE /api/pacientes/:id - Deleta um paciente
router.delete('/:id', deletePaciente);

module.exports = router;
