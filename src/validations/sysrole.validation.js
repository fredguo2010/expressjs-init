const Joi = require('joi');

const createSysRole = {
  body: Joi.object().keys({
    cRoleCode: Joi.string().max(50).optional().allow(''),
    cRoleName: Joi.string().max(50).optional().allow(''),
    cDescription: Joi.string().max(255).optional().allow(''),
    dAddTime: Joi.date().iso().optional(),
  }),
};

const getSysRoles = {
  query: Joi.object().keys({
    row: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSysRoleById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const getSysRoleByCategory = {
  params: Joi.object().keys({
    cCategory: Joi.string().required(),
  }),
};

const updateSysRoleById = {
  params: Joi.object().keys({
    cGuid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      cRoleCode: Joi.string().max(50).optional().allow(''),
      cRoleName: Joi.string().max(50).optional().allow(''),
      cDescription: Joi.string().max(255).optional().allow(''),
      dAddTime: Joi.date().iso().optional(),
    })
    .min(1),
};

const deleteSysRoleById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

module.exports = {
  createSysRole,
  getSysRoles,
  getSysRoleByCategory,
  getSysRoleById,
  updateSysRoleById,
  deleteSysRoleById,
};
