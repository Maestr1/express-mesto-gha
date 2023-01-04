const { celebrate } = require('celebrate');
const Joi = require('joi');

const regExpURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports.validateCardBody = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В имени карточки не должно быть менее 2 символов',
          'string.max': 'В имени карточки не должно быть более 30 символов',
          'any.required': 'Необходимо ввести имя карточки',
        }),
      link: Joi.string()
        .required()
        .pattern(regExpURL)
        .messages({
          'any.required': 'Необходимо ввести ссылку на изображение',
          'string.pattern.base': 'Введена некорректная ссылка',
        }),
    }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В имени не должно быть менее 2 символов',
          'string.max': 'В имени не должно быть более 30 символов',
        }),
      about: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В описании не должно быть менее 2 символов',
          'string.max': 'В описании не должно быть более 30 символов',
        }),
      avatar: Joi.string()
        .pattern(regExpURL)
        .message('Передана некорректная ссылка на аватар'),
      email: Joi.string()
        .required()
        .pattern(regExpEmail)
        .messages({
          'string.pattern.base': 'Введен некорректный Email',
          'any.required': 'Необходимо ввести Email',
        }),
      password: Joi.string()
        .required()
        .messages({
          'string.empty': 'Пароль не может быть пустым',
          'any.required': 'Необходимо ввести пароль',
        }),
    })
    .unknown(true),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .pattern(regExpEmail)
        .messages({
          'string.pattern.base': 'Введен некорректный Email',
          'any.required': 'Необходимо ввести Email',
        }),
      password: Joi.string()
        .required()
        .messages({
          'string.empty': 'Пароль не может быть пустым',
          'any.required': 'Необходимо ввести пароль',
        }),
    }),
});

module.exports.validatePatchUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В имени не должно быть менее 2 символов',
          'string.max': 'В имени не должно быть более 30 символов',
        }),
      about: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В описании не должно быть менее 2 символов',
          'string.max': 'В описании не должно быть более 30 символов',
        }),
      avatar: Joi.string()
        .pattern(regExpURL)
        .message('Передана некорректная ссылка на аватар'),
    }),
});

module.exports.validationGetUser = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .min(24)
        .max(24)
        .messages({
          'string.min': 'Переданы некорректные данные о пользователе',
          'string.max': 'Переданы некорректные данные о пользователе',
          'any.required': 'Переданы некорректные данные о пользователе',
        }),
    }),
});
