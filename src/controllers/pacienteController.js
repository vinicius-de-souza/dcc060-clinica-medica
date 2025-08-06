const db = require('../config/database');

// Helper function to get patient by ID
const getPacienteByIdInternal = async (id) => {
  const query = `
    SELECT 
      p.id_pessoa,
      p.nome,
      p.cpf,
      p.telefone,
      p.email,
      p.endereco,
      pac.data_nascimento,
      pac.id_convenio,
      c.nome as convenio_nome
    FROM Pessoa p
    INNER JOIN Paciente pac ON p.id_pessoa = pac.id_paciente
    LEFT JOIN Convenio c ON pac.id_convenio = c.id_convenio
    WHERE p.id_pessoa = $1
  `;
  
  const result = await db.query(query, [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

// GET /api/pacientes - List all patients
const getAllPacientes = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id_pessoa,
        p.nome,
        p.cpf,
        p.telefone,
        p.email,
        p.endereco,
        pac.data_nascimento,
        pac.id_convenio,
        c.nome as convenio_nome
      FROM Pessoa p
      INNER JOIN Paciente pac ON p.id_pessoa = pac.id_paciente
      LEFT JOIN Convenio c ON pac.id_convenio = c.id_convenio
      ORDER BY p.nome
    `;
    
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

// GET /api/pacientes/:id - Get patient by ID
const getPacienteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = await getPacienteByIdInternal(id);
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
};

// POST /api/pacientes - Create new patient
const createPaciente = async (req, res) => {
  try {
    const { nome, cpf, telefone, email, endereco, data_nascimento, id_convenio } = req.body;
    
    // Validate required fields
    if (!nome || !cpf || !data_nascimento) {
      return res.status(400).json({ error: 'Nome, CPF and data_nascimento are required' });
    }

    // Start transaction
    await db.query('BEGIN');
    
    try {
      // Get next ID for Pessoa
      const personIdResult = await db.query('SELECT COALESCE(MAX(id_pessoa), 0) + 1 as next_id FROM Pessoa');
      const nextPersonId = personIdResult.rows[0].next_id;
      
      // Insert into Pessoa table
      const insertPersonQuery = `
        INSERT INTO Pessoa (id_pessoa, nome, cpf, telefone, email, endereco)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await db.query(insertPersonQuery, [nextPersonId, nome, cpf, telefone, email, endereco]);
      
      // Insert into Paciente table
      const insertPatientQuery = `
        INSERT INTO Paciente (id_paciente, data_nascimento, id_convenio)
        VALUES ($1, $2, $3)
      `;
      await db.query(insertPatientQuery, [nextPersonId, data_nascimento, id_convenio || null]);
      
      await db.query('COMMIT');
      
      // Return the created patient
      const createdPatient = await getPacienteByIdInternal(nextPersonId);
      res.status(201).json(createdPatient);
      
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Error creating patient:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ error: 'CPF already exists' });
    }
    
    res.status(500).json({ error: 'Failed to create patient' });
  }
};

// PUT /api/pacientes/:id - Update patient
const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email, endereco, data_nascimento, id_convenio } = req.body;
    
    // Check if patient exists
    const existingPatient = await getPacienteByIdInternal(id);
    if (!existingPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    // Start transaction
    await db.query('BEGIN');
    
    try {
      // Update Pessoa table
      const updatePersonQuery = `
        UPDATE Pessoa 
        SET nome = $1, cpf = $2, telefone = $3, email = $4, endereco = $5
        WHERE id_pessoa = $6
      `;
      await db.query(updatePersonQuery, [nome, cpf, telefone, email, endereco, id]);
      
      // Update Paciente table
      const updatePatientQuery = `
        UPDATE Paciente 
        SET data_nascimento = $1, id_convenio = $2
        WHERE id_paciente = $3
      `;
      await db.query(updatePatientQuery, [data_nascimento, id_convenio || null, id]);
      
      await db.query('COMMIT');
      
      // Return the updated patient
      const updatedPatient = await getPacienteByIdInternal(id);
      res.json(updatedPatient);
      
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Error updating patient:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ error: 'CPF already exists' });
    }
    
    res.status(500).json({ error: 'Failed to update patient' });
  }
};

// DELETE /api/pacientes/:id - Delete patient
const deletePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if patient exists
    const existingPatient = await getPacienteByIdInternal(id);
    if (!existingPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    // Start transaction
    await db.query('BEGIN');
    
    try {
      // Delete from Paciente table first (due to foreign key)
      await db.query('DELETE FROM Paciente WHERE id_paciente = $1', [id]);
      
      // Delete from Pessoa table
      await db.query('DELETE FROM Pessoa WHERE id_pessoa = $1', [id]);
      
      await db.query('COMMIT');
      
      res.status(204).send();
      
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Error deleting patient:', error);
    
    if (error.code === '23503') { // Foreign key constraint violation
      return res.status(400).json({ error: 'Cannot delete patient with existing consultations' });
    }
    
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};

module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};
