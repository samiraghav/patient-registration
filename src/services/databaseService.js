import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://patient-db');

const executeQuery = async (sql, params = []) => {
  try {
    const result = await db.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

export const initDb = async () => {
  await executeQuery(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      dob TEXT,
      age INTEGER,
      gender TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      emergencycontactname TEXT,
      emergencycontactrelation TEXT,
      emergencycontactphone TEXT,
      bloodgroup TEXT,
      allergies TEXT,
      conditions TEXT
    );
  `);
};

export const addPatient = async (patient) => {
  const {
    name, dob, age, gender, phone, email, address,
    emergencycontactname, emergencycontactrelation, emergencycontactphone,
    bloodgroup, allergies, conditions
  } = patient;

  await executeQuery(
    `INSERT INTO patients (
      name, dob, age, gender, phone, email, address,
      emergencycontactname, emergencycontactrelation, emergencycontactphone,
      bloodgroup, allergies, conditions
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12, $13
    )`,
    [
      name, dob, age, gender, phone, email, address,
      emergencycontactname, emergencycontactrelation, emergencycontactphone,
      bloodgroup, allergies, conditions
    ]
  );
};

export const updatePatient = async (id, patient) => {
  await executeQuery(
    `UPDATE patients SET 
      name = $1, dob = $2, age = $3, gender = $4, phone = $5, email = $6, address = $7,
      emergencycontactname = $8, emergencycontactrelation = $9, emergencycontactphone = $10,
      bloodgroup = $11, allergies = $12, conditions = $13
    	WHERE id = $14`,
    [
      patient.name, patient.dob, patient.age, patient.gender, patient.phone, patient.email, patient.address,
      patient.emergencycontactname, patient.emergencycontactrelation, patient.emergencycontactphone,
      patient.bloodgroup, patient.allergies, patient.conditions,
      id
    ]
  );
};

export const getPatients = async () => {
  return await executeQuery('SELECT * FROM patients');
};

export const queryPatients = async (sql) => {
  return await executeQuery(sql);
};

export const deletePatient = async (id) => {
  await executeQuery(`DELETE FROM patients WHERE id = $1`, [id]);
};
