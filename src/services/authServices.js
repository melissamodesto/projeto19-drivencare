import userRepository from "../repositories/userRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import patientRepository from "../repositories/patienteRepository.js";
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

export default { createUser };
