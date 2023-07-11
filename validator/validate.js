const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
      }),
    passwordConfirm: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords must match',
      }),
  });

exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next();
  };
  
  