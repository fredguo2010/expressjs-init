const Joi = require('joi');

const createSysMenu = {
  body: Joi.object().keys({
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

const getSysMenus = {
  query: Joi.object().keys({
    text: Joi.string().allow('').optional(),
    cParentGuid: Joi.string().allow('').optional(),
    row: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSysMenuById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const updateSysMenuById = {
  params: Joi.object().keys({
    cGuid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
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

const deleteSysMenuById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

module.exports = {
  createSysMenu,
  getSysMenus,
  getSysMenuById,
  updateSysMenuById,
  deleteSysMenuById,
};
