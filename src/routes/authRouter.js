import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import signUpSchema from "../schemas/signUpSchema.js";
import userController from "../controllers/authControllers.js";
import userMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateSchema(signUpSchema),
  userMiddleware.signUpValidator,
  userController.createUser
);
