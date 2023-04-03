import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";
import authController from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateSchema(signUpSchema),
  authMiddleware.signUpValidator,
  authController.createUser
);

authRouter.post(
  "/signin",
  validateSchema(signInSchema),
  authController.signInUser
);

export default { authRouter };
