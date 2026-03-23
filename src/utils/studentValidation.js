const Joi = require("joi");

const studentSchema = Joi.object({
  studentId: Joi.string().trim().required().messages({
    "string.empty": "studentId is required",
    "any.required": "studentId is required"
  }),
  fullName: Joi.string().trim().min(1).required().messages({
    "string.empty": "fullName must not be empty",
    "any.required": "fullName is required"
  }),
  dateOfBirth: Joi.date().iso().max("now").required().messages({
    "date.base": "dateOfBirth must be a valid date",
    "date.format": "dateOfBirth must be in ISO format YYYY-MM-DD",
    "date.max": "dateOfBirth cannot be in the future",
    "any.required": "dateOfBirth is required"
  }),
  averageScore: Joi.number().min(0).max(10).required().messages({
    "number.base": "averageScore must be a number",
    "number.min": "averageScore must be between 0 and 10",
    "number.max": "averageScore must be between 0 and 10",
    "any.required": "averageScore is required"
  }),
  className: Joi.string().trim().min(1).required().messages({
    "string.empty": "className must not be empty",
    "any.required": "className is required"
  })
});

const updateStudentSchema = Joi.object({
  fullName: Joi.string().trim().min(1).messages({
    "string.empty": "fullName must not be empty"
  }),
  dateOfBirth: Joi.date().iso().max("now").messages({
    "date.base": "dateOfBirth must be a valid date",
    "date.format": "dateOfBirth must be in ISO format YYYY-MM-DD",
    "date.max": "dateOfBirth cannot be in the future"
  }),
  averageScore: Joi.number().min(0).max(10).messages({
    "number.base": "averageScore must be a number",
    "number.min": "averageScore must be between 0 and 10",
    "number.max": "averageScore must be between 0 and 10"
  }),
  className: Joi.string().trim().min(1).messages({
    "string.empty": "className must not be empty"
  })
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update"
  });

module.exports = {
  studentSchema,
  updateStudentSchema
};
