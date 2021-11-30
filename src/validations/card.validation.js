const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    cardExpiration: Joi.string().required(),
    cardHolder: Joi.string().required(),
    cardNumber: Joi.string().required(),
    category: Joi.string().required().valid('MC','VISA', 'AE'),
  }),
};

const getCards = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCard = {
  params: Joi.object().keys({
    cardId: Joi.string().custom(objectId),
  }),
};

const updateCard = {
  params: Joi.object().keys({
    cardId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteCard = {
  params: Joi.object().keys({
    cardId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
};
