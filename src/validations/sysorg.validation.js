const Joi = require('joi');

const createSysOrg = {
  body: Joi.object().keys({
    cOrgCode: Joi.string().max(50).optional().allow(''),
    cOrgName: Joi.string().max(255).optional().allow(''),
    cOrgType: Joi.string().max(50).optional().allow(''),
    cParentGuid: Joi.string()
      .guid({ version: ['uuidv4'] })
      .optional()
      .allow(''),
    cParentOrgCode: Joi.string().max(20).optional().allow(''),
    cParentOrgName: Joi.string().max(255).optional().allow(''),
    cHead: Joi.string().max(50).optional().allow(''),
    cHeadUserGuid: Joi.string()
      .guid({ version: ['uuidv4'] })
      .optional()
      .allow(''),
    cHeadUserId: Joi.string().max(20).optional().allow(''),
    iStatus: Joi.number().integer().optional(),
    cCreateUserGuid: Joi.string()
      .guid({ version: ['uuidv4'] })
      .optional()
      .allow(''),
    cCreateUserId: Joi.string().max(20).optional().allow(''),
    cCreateUserName: Joi.string().max(50).optional().allow(''),
    dCreateTime: Joi.date().iso().optional(),
    cModifyUserGuid: Joi.string()
      .guid({ version: ['uuidv4'] })
      .optional()
      .allow(''),
    cModifyUserId: Joi.string().max(20).optional().allow(''),
    cModifyUserName: Joi.string().max(50).optional().allow(''),
    dModifyTime: Joi.date().iso().optional(),
  }),
};

const getSysOrgs = {
  query: Joi.object().keys({
    StrWhere: Joi.string().optional().allow(''),
    cOrgCode: Joi.string().optional().allow(''),
    cOrgName: Joi.string().optional().allow(''),
    cOrgType: Joi.string().optional().allow(''),
    row: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSysOrgById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const getSysOrgByCategory = {
  params: Joi.object().keys({
    cCategory: Joi.string().required(),
  }),
};

const updateSysOrgById = {
  params: Joi.object().keys({
    cGuid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      cOrgCode: Joi.string().max(50).optional().allow(''),
      cOrgName: Joi.string().max(255).optional().allow(''),
      cOrgType: Joi.string().max(50).optional().allow(''),
      cParentGuid: Joi.string()
        .guid({ version: ['uuidv4'] })
        .optional()
        .allow(''),
      cParentOrgCode: Joi.string().max(20).optional().allow(''),
      cParentOrgName: Joi.string().max(255).optional().allow(''),
      cHead: Joi.string().max(50).optional().allow(''),
      cHeadUserGuid: Joi.string()
        .guid({ version: ['uuidv4'] })
        .optional()
        .allow(''),
      cHeadUserId: Joi.string().max(20).optional().allow(''),
      iStatus: Joi.number().integer().optional(),
      cCreateUserGuid: Joi.string()
        .guid({ version: ['uuidv4'] })
        .optional()
        .allow(''),
      cCreateUserId: Joi.string().max(20).optional().allow(''),
      cCreateUserName: Joi.string().max(50).optional().allow(''),
      dCreateTime: Joi.date().iso().optional(),
      cModifyUserGuid: Joi.string()
        .guid({ version: ['uuidv4'] })
        .optional()
        .allow(''),
      cModifyUserId: Joi.string().max(20).optional().allow(''),
      cModifyUserName: Joi.string().max(50).optional().allow(''),
      dModifyTime: Joi.date().iso().optional(),
    })
    .min(1),
};

const deleteSysOrgById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

module.exports = {
  createSysOrg,
  getSysOrgs,
  getSysOrgByCategory,
  getSysOrgById,
  updateSysOrgById,
  deleteSysOrgById,
};
