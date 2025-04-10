import joi from 'joi';

export const RegisterSchema = joi.object({
    name: joi.string().min(3).max(30).required().messages({
        "string.base": "Name should be a string",
        "string.empty": "Name is required",
        "string.min": "Name should have at least 3 characters",
        "string.max": "Name should not exceed 30 characters",
      }),
      email: joi.string().email().required().messages({
        "string.base": "Email should be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
      password: joi.string().min(8).max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")).required().messages({
        "string.base": "Password should be a string",
        "string.empty": "Password is required",
        "string.min": "Password should be at least 8 characters",
        "string.max": "Password should not exceed 20 characters",
        "string.pattern.base": "Password must include at least one uppercase letter, one lowercase letter, and one number",
      }),
});

export const LoginSchema = joi.object({
    email: joi.string().email().required().messages({
      "string.base": "Email should be a string",
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
    password: joi.string().required().messages({
      "string.base": "Password should be a string",
      "string.empty": "Password is required"
    }),
});