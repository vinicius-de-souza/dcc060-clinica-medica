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
 *   description: Patient management endpoints
 */

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of all patients with their personal information and health insurance details
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: List of patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /api/pacientes - List all patients
router.get('/', getAllPacientes);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Get patient by ID
 *     description: Retrieve a specific patient by their ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Patient retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /api/pacientes/:id - Get patient by ID
router.get('/:id', getPacienteById);

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     summary: Create a new patient
 *     description: Create a new patient with personal information and optional health insurance
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
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Bad request - Invalid input data or CPF already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// POST /api/pacientes - Create new patient
router.post('/', createPaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     summary: Update an existing patient
 *     description: Update patient information by ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
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
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Bad request - Invalid input data or CPF already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// PUT /api/pacientes/:id - Update patient
router.put('/:id', updatePaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     summary: Delete a patient
 *     description: Delete a patient by ID. Cannot delete patients with existing consultations.
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Patient deleted successfully
 *       400:
 *         description: Bad request - Cannot delete patient with existing consultations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// DELETE /api/pacientes/:id - Delete patient
router.delete('/:id', deletePaciente);

module.exports = router;
