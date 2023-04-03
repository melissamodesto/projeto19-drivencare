import userRepository from "../repositories/userRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import patientRepository from "../repositories/patienteRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function createUser(name, email, password, type, speciality) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await userRepository.createUser([name, email, hashedPassword]);

    const {
      rows: [user],
    } = await userRepository.findByEmail(email);

    if (type === "DOCTOR") {
      await doctorRepository.createDoctor(user.id, speciality);
    } else {
      await createPatient(user.id);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
}

async function createPatient(user_id) {
  try {
    await patientRepository.createPatient([user_id]);
  } catch (error) {
    console.log(error);
    throw new Error("Error creating patient");
  }
}

async function createDoctor(user_id, speciality) {
  try {
    await doctorRepository.createDoctor(user_id, speciality);
  } catch (error) {
    console.log(error);
    throw new Error("Error creating doctor");
  }
}

async function createToken(email, password) {
  const {
    rows: [user],
  } = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  if (!rowCount) errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const secretKey = await findSecretKey();

  if (!secretKey) throw new Error("Secret key not found");

  const token = jwt.sign({ userId: user.id }, secretKey, {
    expiresIn: "1h",
  });

  return token;
}

async function findSecretKey() {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw errors.notFoundError();
  }
  return secretKey;
}

export default { createUser, createToken, findSecretKey };
