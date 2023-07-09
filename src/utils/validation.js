const Joi = require('joi');

// Validation schema for user registration
const registrationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Validate user registration input
function validateRegistration(data) {
  return registrationSchema.validate(data);
}

// Validate user login input
function validateLogin(data) {
  return loginSchema.validate(data);
}

module.exports = {
  validateRegistration,
  validateLogin,
};
