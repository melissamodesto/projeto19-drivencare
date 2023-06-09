import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
export default { signInSchema };
