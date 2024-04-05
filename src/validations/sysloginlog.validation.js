const Joi = require('joi');

const createSysLoginLog = {
  body: Joi.object().keys({
    browser: Joi.string().max(255).optional().allow(''),
    device_type: Joi.string().max(255).optional().allow(''),
    ip: Joi.string().max(255).optional().allow(''),
    login_time: Joi.date().iso().optional(),
    region: Joi.string().max(255).optional().allow(''),
    system_name: Joi.string().max(255).optional().allow(''),
    token: Joi.string().max(Joi.ref('$maxVarChar')).optional().allow(''), // Use $maxVarChar as a reference
    userid: Joi.string().max(50).optional().allow(''),
  }),
};

const getSysLoginLog = {
  query: Joi.object().keys({
    StrWhere: Joi.string().optional().allow(''),
    browser: Joi.string().optional(),
    system_name: Joi.string().optional(),
    orderBy: Joi.string().optional(),
    row: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

const getSysLoginLogById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const updateSysLoginLogById = {
  params: Joi.object().keys({
    cGuid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      browser: Joi.string().max(255).optional().allow(''),
      device_type: Joi.string().max(255).optional().allow(''),
      ip: Joi.string().max(255).optional().allow(''),
      login_time: Joi.date().iso().optional(),
      region: Joi.string().max(255).optional().allow(''),
      system_name: Joi.string().max(255).optional().allow(''),
      token: Joi.string().max(Joi.ref('$maxVarChar')).optional().allow(''), // Use $maxVarChar as a reference
      userid: Joi.string().max(50).optional().allow(''),
    })
    .min(1),
};

const deleteSysLoginLogById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

module.exports = {
  createSysLoginLog,
  getSysLoginLog,
  getSysLoginLogById,
  updateSysLoginLogById,
  deleteSysLoginLogById,
};
