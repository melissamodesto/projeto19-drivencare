export function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => {
        return detail.message;
      });

      return res.status(422).send({ errorMessage });
    }
    next();
  };
}
