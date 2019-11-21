const Joi = require('joi');

const schemas = {
  itemId: Joi.object().keys({
    id: Joi.number().required(),
  }),

  story: Joi.object().keys({
    title: Joi.string().required(),
    url: Joi.string().required(),
  }),

  comment: Joi.object().keys({
    text: Joi.string().required(),
  }),

  ask: Joi.object().keys({
    title: Joi.string().required(),
    text: Joi.string().required(),
    url: Joi.string().optional(),
  }),

  job: Joi.object().keys({
    title: Joi.string().required(),
    text: Joi.string().required(),
    url: Joi.string().optional(),
  }),

  userLogin: Joi.object().keys({
    username: Joi.string().min(1).required(),
    password: Joi.string().required(),
  }),

  userReg: Joi.object().keys({
    username: Joi.string().min(1).required(),
    password: Joi.string().regex(/^[\x20-\x7E]+$/).min(8).max(72)
      .required(),
  }),
};

module.exports = schemas;
