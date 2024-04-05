const Joi = require('joi');

const createSysLog = {
  body: Joi.object().keys({
    dTimeStamp: Joi.date().iso().optional(),
    cModule: Joi.string().max(50).optional().allow(''),
    cActionType: Joi.string().max(50).optional().allow(''),
    cIP: Joi.string().max(50).optional().allow(''),
    cUserGuid: Joi.string()
      .guid({ version: ['uuidv4'] })
      .optional()
      .allow(''),
    cUserId: Joi.string().max(50).optional().allow(''),
    cUserName: Joi.string().max(50).optional().allow(''),
    cObjectValue: Joi.string().max(255).optional().allow(''),
    cDescription: Joi.string().max(255).optional().allow(''),
  }),
};

const getSysLogs = {
  query: Joi.object().keys({
    StrWhere: Joi.string().optional().allow(''),
    cModule: Joi.string(),
    cActionType: Joi.string(),
    orderBy: Joi.string(),
    row: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSysLogById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const updateSysLogById = {
  params: Joi.object().keys({
    cGuid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      dTimeStamp: Joi.date().iso().optional(),
      cModule: Joi.string().max(50).optional().allow(''),
      cActionType: Joi.string().max(50).optional().allow(''),
      cIP: Joi.string().max(50).optional().allow(''),
      cUserGuid: Joi.string()
        .guid({ version: ['uuidv4'] })
        .optional()
        .allow(''),
      cUserId: Joi.string().max(50).optional().allow(''),
      cUserName: Joi.string().max(50).optional().allow(''),
      cObjectValue: Joi.string().max(255).optional().allow(''),
      cDescription: Joi.string().max(255).optional().allow(''),
    })
    .min(1),
};

const deleteSysLogById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

module.exports = {
  createSysLog,
  getSysLogs,
  getSysLogById,
  updateSysLogById,
  deleteSysLogById,
};
