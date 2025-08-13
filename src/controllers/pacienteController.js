const db = require('../config/database');

// Função auxiliar para buscar paciente por ID
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

// GET /api/pacientes - Lista todos os pacientes
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
    console.error('Erro ao buscar pacientes:', error);
    res.status(500).json({ error: 'Falha ao buscar pacientes' });
  }
};

// GET /api/pacientes/:id - Busca paciente por ID
const getPacienteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = await getPacienteByIdInternal(id);
    
    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    
    res.json(patient);
  } catch (error) {
    console.error('Erro ao buscar paciente:', error);
    res.status(500).json({ error: 'Falha ao buscar paciente' });
  }
};

// POST /api/pacientes - Cria um novo paciente
const createPaciente = async (req, res) => {
  try {
    const { nome, cpf, telefone, email, endereco, data_nascimento, id_convenio } = req.body;
    
    // Valida os campos obrigatórios
    if (!nome || !cpf || !data_nascimento) {
      return res.status(400).json({ error: 'Nome, CPF e data_nascimento são obrigatórios' });
    }

    // Inicia a transação
    await db.query('BEGIN');
    
    try {
      // Obtém o próximo ID para Pessoa
      const personIdResult = await db.query('SELECT COALESCE(MAX(id_pessoa), 0) + 1 as next_id FROM Pessoa');
      const nextPersonId = personIdResult.rows[0].next_id;
      
      // Insere na tabela Pessoa
      const insertPersonQuery = `
        INSERT INTO Pessoa (id_pessoa, nome, cpf, telefone, email, endereco)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await db.query(insertPersonQuery, [nextPersonId, nome, cpf, telefone, email, endereco]);
      
      // Insere na tabela Paciente
      const insertPatientQuery = `
        INSERT INTO Paciente (id_paciente, data_nascimento, id_convenio)
        VALUES ($1, $2, $3)
      `;
      await db.query(insertPatientQuery, [nextPersonId, data_nascimento, id_convenio || null]);
      
      await db.query('COMMIT');
      
      // Retorna o paciente criado
      const createdPatient = await getPacienteByIdInternal(nextPersonId);
      res.status(201).json(createdPatient);
      
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    
    if (error.code === '23505') { // Violação de restrição única
      return res.status(400).json({ error: 'CPF já existe' });
    }
    
    res.status(500).json({ error: 'Falha ao criar paciente' });
  }
};

// PUT /api/pacientes/:id - Atualiza um paciente
const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email, endereco, data_nascimento, id_convenio } = req.body;
    
    // Verifica se o paciente existe
    const existingPatient = await getPacienteByIdInternal(id);
    if (!existingPatient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    
    // Inicia a transação
    await db.query('BEGIN');
    
    try {
      // Atualiza a tabela Pessoa
      const updatePersonQuery = `
        UPDATE Pessoa 
        SET nome = $1, cpf = $2, telefone = $3, email = $4, endereco = $5
        WHERE id_pessoa = $6
      `;
      await db.query(updatePersonQuery, [nome, cpf, telefone, email, endereco, id]);
      
      // Atualiza a tabela Paciente
      const updatePatientQuery = `
        UPDATE Paciente 
        SET data_nascimento = $1, id_convenio = $2
        WHERE id_paciente = $3
      `;
      await db.query(updatePatientQuery, [data_nascimento, id_convenio || null, id]);
      
      await db.query('COMMIT');
      
      // Retorna o paciente atualizado
      const updatedPatient = await getPacienteByIdInternal(id);
      res.json(updatedPatient);
      
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    
    if (error.code === '23505') { // Violação de restrição única
      return res.status(400).json({ error: 'CPF já existe' });
    }
    
    res.status(500).json({ error: 'Falha ao atualizar paciente' });
  }
};

// DELETE /api/pacientes/:id - Deleta um paciente
const deletePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verifica se o paciente existe
    const existingPatient = await getPacienteByIdInternal(id);
    if (!existingPatient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    
    // Inicia a transação
    await db.query('BEGIN');
    
    try {
      // Deleta da tabela Paciente primeiro (devido à chave estrangeira)
      await db.query('DELETE FROM Paciente WHERE id_paciente = $1', [id]);
      
      // Deleta da tabela Pessoa
      await db.query('DELETE FROM Pessoa WHERE id_pessoa = $1', [id]);
      
      await db.query('COMMIT');
      
      res.status(204).send();
      
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    
    if (error.code === '23503') { // Violação de restrição de chave estrangeira
      return res.status(400).json({ error: 'Não é possível deletar paciente com consultas existentes' });
    }
    
    res.status(500).json({ error: 'Falha ao deletar paciente' });
  }
};

module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};
