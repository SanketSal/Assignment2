// utils/validation.js
const Joi = require('joi');

// Validation schema for user registration
const registrationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(8),
});

// Validation schema for event creation and updates
const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
});

// Validate user registration input
function validateRegistration(data) {
  return registrationSchema.validate(data);
}

// Validate event input
function validateEvent(data) {
  return eventSchema.validate(data);
}

module.exports = {
  validateRegistration,
  validateEvent,
};
