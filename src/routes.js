import { Router } from "express";
import { authRouter } from "./routes/authRouter.js";

const routes = Router();

routes.use("/auth", authRouter);
