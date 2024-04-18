const Joi = require("joi");
const { model } = require("mongoose");

const teacherRegistrationValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    role: Joi.string().optional(),
    email: Joi.string().email().required(),
    department: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(4).alphanum().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    console.log(error);
    const errorMessage = {
      message: "Input data is not correct! Please input valid info",
      details: error.details.map(detail => ({
        message: detail.message
      }))
    };
    return res.status(400).json(errorMessage);
  }

  next();
};

const teacherLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request while Loing." });
  }

  next();
};

module.exports = {
  teacherRegistrationValidate,
  teacherLoginValidate,
};
