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
      emergencyContactName TEXT,
      emergencyContactRelation TEXT,
      emergencyContactPhone TEXT,
      bloodGroup TEXT,
      allergies TEXT,
      conditions TEXT
    );
  `);
};

export const addPatient = async (patient) => {
  const {
    name, dob, age, gender, phone, email, address,
    emergencyContactName, emergencyContactRelation, emergencyContactPhone,
    bloodGroup, allergies, conditions
  } = patient;

  await executeQuery(
    `INSERT INTO patients (
      name, dob, age, gender, phone, email, address,
      emergencyContactName, emergencyContactRelation, emergencyContactPhone,
      bloodGroup, allergies, conditions
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12, $13
    )`,
    [
      name, dob, age, gender, phone, email, address,
      emergencyContactName, emergencyContactRelation, emergencyContactPhone,
      bloodGroup, allergies, conditions
    ]
  );
};

export const getPatients = async () => {
  return await executeQuery('SELECT * FROM patients');
};

export const queryPatients = async (sql) => {
  return await executeQuery(sql);
};
