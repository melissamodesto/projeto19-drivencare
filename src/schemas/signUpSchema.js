import Joi from "joi";

const signUpSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  type: Joi.string().required.valid(Joi.ref("DOCTOR", "PATIENT")),
  speciality: Joi.string()
    .required()
    .valid(
      Joi.ref(
        "OPHTHALMOLOGY",
        "PEDIATRICS",
        "CARDIOLOGY",
        "DERMATOLOGY",
        "GYNECOLOGY_AND_OBSTETRICS",
        "UROLOGY",
        "GENERAL_PRACTICE"
      )
    ),
});

export default signUpSchema;
