const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const login = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    userid: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    userid: Joi.string().optional().allow(''),
    StrWhere: Joi.string().optional().allow(''),
    username: Joi.string(),
    role: Joi.string(),
    orderBy: Joi.string(),
    row: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserByUserId = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userid: Joi.string().required(),
  }),
};

const updateUserByUserId = {
  params: Joi.object().keys({
    userid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      userid: Joi.string().max(50),
      username: Joi.string().allow('').optional(),
      lastname: Joi.string().allow('').optional(),
      firstname: Joi.string().allow('').optional(),
      passwordHash: Joi.string().allow('').optional(),
      salt: Joi.string().allow('').optional(),
      avatar: Joi.string().max(255).allow('').optional(),
      email: Joi.string().email().allow('').optional(),
      signature: Joi.string().allow('').optional(),
      title: Joi.string().allow('').optional(),
      group: Joi.string().allow('').optional(),
      notifyCount: Joi.number().integer().allow('').optional(),
      country: Joi.string().allow('').optional(),
      address: Joi.string().max(255).allow('').optional(),
      phone: Joi.string().allow('').optional(),
      dAddTime: Joi.date().allow('').optional(),
      role: Joi.string().allow('').optional(),
    })
    .min(1),
};

const updateUserById = {
  params: Joi.object().keys({
    cGuid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      cGuid: Joi.string().allow('').optional(),
      userid: Joi.string().max(50),
      username: Joi.string().allow('').optional(),
      lastname: Joi.string().allow('').optional(),
      firstname: Joi.string().allow('').optional(),
      passwordHash: Joi.string().allow('').optional(),
      salt: Joi.string().allow('').optional(),
      avatar: Joi.string().max(255).allow('').optional(),
      email: Joi.string().email().allow('').optional(),
      signature: Joi.string().allow('').optional(),
      title: Joi.string().allow('').optional(),
      group: Joi.string().allow('').optional(),
      notifyCount: Joi.number().integer().optional(),
      country: Joi.string().allow('').optional(),
      address: Joi.string().allow('').optional(),
      phone: Joi.string().allow('').optional(),
      dAddTime: Joi.date().optional(),
      role: Joi.string().allow('').optional(),
    })
    .min(1),
};

const restPwdUserById = {
  body: Joi.object()
    .keys({
      cGuid: Joi.string().required(),
      userid: Joi.string().required(),
    })
    .min(1),
};

const updatePassWord = {
  body: Joi.object()
    .keys({
      userid: Joi.string().required(),
      newpwd: Joi.string().required(),
      orgpwd: Joi.string().required(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userid: Joi.string().custom(objectId),
  }),
};

const deleteUserById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const checkUserExistByUsername = {
  params: Joi.object().keys({
    username: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  login,
  logout,
  getUsers,
  getUser,
  getUserByUserId,
  checkUserExistByUsername,
  restPwdUserById,
  updateUserByUserId,
  updateUserById,
  updatePassWord,
  deleteUser,
  deleteUserById,
};
