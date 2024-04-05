const Joi = require('joi');

const createSysRoleMenu = {
  body: Joi.object().keys({
    cMenuGuid: Joi.string()
      .guid({ version: ['uuidv4'] })
      .optional()
      .allow(''),
    cRoleGuid: Joi.string()
      .guid({ version: ['uuidv4'] })
      .optional()
      .allow(''),
    bSelect: Joi.boolean().optional(),
    text: Joi.string().max(50).optional().allow(''),
    ability: Joi.string().max(255).optional().allow(''),
    link: Joi.string().max(255).optional().allow(''),
    externalLink: Joi.string().max(255).optional().allow(''),
    target: Joi.string().max(50).optional().allow(''),
    i18n: Joi.string().max(255).optional().allow(''),
    icon: Joi.string().max(50).optional().allow(''),
    memo: Joi.string().max(255).optional().allow(''),
    status: Joi.number().integer().optional(),
    sort: Joi.number().integer().optional(),
    cParentGuid: Joi.string()
      .guid({ version: ['uuidv4'] })
      .optional()
      .allow(''),
    dAddTime: Joi.date().iso().optional(),
  }),
};

const getSysRoleMenus = {
  query: Joi.object().keys({
    row: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSysRoleMenusByRoleGuid = {
  query: Joi.object().keys({
    cRoleGuid: Joi.string().required(),
  }),
};

const getSysRoleMenuById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const updateSysRoleMenuById = {
  params: Joi.object().keys({
    cGuid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      cGuid: Joi.string().optional(),
      cMenuGuid: Joi.string()
        .guid({ version: ['uuidv4'] })
        .optional()
        .allow(''),
      cRoleGuid: Joi.string()
        .guid({ version: ['uuidv4'] })
        .optional()
        .allow(''),
      bSelect: Joi.boolean().optional(),
      text: Joi.string().max(50).optional().allow(''),
      ability: Joi.string().max(255).optional().allow(''),
      link: Joi.string().max(255).optional().allow(''),
      externalLink: Joi.string().max(255).optional().allow(''),
      target: Joi.string().max(50).optional().allow(''),
      i18n: Joi.string().max(255).optional().allow(''),
      icon: Joi.string().max(50).optional().allow(''),
      memo: Joi.string().max(255).optional().allow(''),
      status: Joi.number().integer().optional(),
      sort: Joi.number().integer().optional(),
      cParentGuid: Joi.string()
        .guid({ version: ['uuidv4'] })
        .optional()
        .allow(''),
      dAddTime: Joi.date().iso().optional(),
    })
    .min(1),
};

const deleteSysRoleMenuById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

module.exports = {
  createSysRoleMenu,
  getSysRoleMenus,
  getSysRoleMenusByRoleGuid,
  getSysRoleMenuById,
  updateSysRoleMenuById,
  deleteSysRoleMenuById,
};
