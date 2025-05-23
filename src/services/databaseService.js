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
      conditions TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

  const updated = await getPatients();
  localStorage.setItem('patients', JSON.stringify(updated));
};

export const updatePatient = async (id, patient) => {
  await executeQuery(
    `UPDATE patients SET 
      name = $1, dob = $2, age = $3, gender = $4, phone = $5, email = $6, address = $7,
      emergencycontactname = $8, emergencycontactrelation = $9, emergencycontactphone = $10,
      bloodgroup = $11, allergies = $12, conditions = $13,
      modified_at = CURRENT_TIMESTAMP
    WHERE id = $14`,
    [
      patient.name, patient.dob, patient.age, patient.gender, patient.phone, patient.email, patient.address,
      patient.emergencycontactname, patient.emergencycontactrelation, patient.emergencycontactphone,
      patient.bloodgroup, patient.allergies, patient.conditions,
      id
    ]
  );

  const updated = await getPatients();
  localStorage.setItem('patients', JSON.stringify(updated));
};

export const getPatients = async () => {
  const fromDb = await executeQuery('SELECT * FROM patients ORDER BY created_at DESC');
  return fromDb;
};

export const deletePatient = async (id) => {
  await executeQuery(`DELETE FROM patients WHERE id = $1`, [id]);
  const updated = await getPatients();
  localStorage.setItem('patients', JSON.stringify(updated));
};

export const queryPatients = async (sql) => {
  return await executeQuery(sql);
};

export const syncLocalStorageToDb = async () => {
  const data = localStorage.getItem('patients');
  if (!data) return;

  const patients = JSON.parse(data);
  for (const p of patients) {
    await executeQuery(
      `INSERT INTO patients (
        id, name, dob, age, gender, phone, email, address,
        emergencycontactname, emergencycontactrelation, emergencycontactphone,
        bloodgroup, allergies, conditions, created_at, modified_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15, $16
      )
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        dob = excluded.dob,
        age = excluded.age,
        gender = excluded.gender,
        phone = excluded.phone,
        email = excluded.email,
        address = excluded.address,
        emergencycontactname = excluded.emergencycontactname,
        emergencycontactrelation = excluded.emergencycontactrelation,
        emergencycontactphone = excluded.emergencycontactphone,
        bloodgroup = excluded.bloodgroup,
        allergies = excluded.allergies,
        conditions = excluded.conditions,
        created_at = excluded.created_at,
        modified_at = excluded.modified_at
      `
      ,
      [
        p.id, p.name, p.dob, p.age, p.gender, p.phone, p.email, p.address,
        p.emergencycontactname, p.emergencycontactrelation, p.emergencycontactphone,
        p.bloodgroup, p.allergies, p.conditions, p.created_at, p.modified_at
      ]
    );
  }
};
