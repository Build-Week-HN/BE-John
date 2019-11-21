const Joi = require('joi');

const validator = (schema, property) => (req, res, next) => {
  const { error } = Joi.validate(req[property], schema);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    res.status(422).json({ status: 422, error: message });
  }
};

module.exports = validator;
