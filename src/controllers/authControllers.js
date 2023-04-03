import httpStatus from "http-status";
import userServices from "../services/userServices.js";

async function createUser(req, res) {
  const { name, email, password, type, especiality } = req.body;

  try {
    const user = await userServices.createUser(
      name,
      email,
      password,
      type,
      especiality
    );
    return res.status(httpStatus.CREATED).json(user);
  } catch {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al crear usuario" });
  }
}

export default { createUser }; 
