import { db } from "../config/database.js";

async function createPatient(insertQuery) {
  await db.query(
    `
    INSERT INTO patient (
        user_id VALUES ($1)`,
    insertQuery
  );
}

export default { createPatient };
