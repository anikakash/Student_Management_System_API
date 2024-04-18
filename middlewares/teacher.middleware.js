const Joi = require("joi");
const { model } = require("mongoose");

const teacherRegistrationValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    role: Joi.string().optional(),
    email: Joi.string().email().required(),
    department: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(4).alphanum().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ message: "Bad Request while registration." });
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
