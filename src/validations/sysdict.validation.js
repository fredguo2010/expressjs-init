const Joi = require('joi');

const createSysDict = {
  body: Joi.object().keys({
    cName: Joi.string().max(50).required(),
    cValue: Joi.string().max(50).required(),
    cCategory: Joi.string().max(50).required(),
    iStatus: Joi.number().integer().optional(),
    cCreateUserGuid: Joi.string().guid().optional(),
    cCreateUserId: Joi.string().optional(),
    cCreateUserName: Joi.string().optional(),
    dCreateTime: Joi.string().optional(),
    cModifyUserGuid: Joi.string().guid().optional(),
    cModifyUserId: Joi.string().max(50).optional(),
    cModifyUserName: Joi.string().max(50).optional(),
    cMemo: Joi.string().max(255).optional(),
    dModifyTime: Joi.string().optional(),
  }),
};

const getSysDictionarys = {
  query: Joi.object().keys({
    StrWhere: Joi.string().optional().allow(''),
    cName: Joi.string(),
    cValue: Joi.string(),
    cCategory: Joi.string(),
    cMemo: Joi.string(),
    orderBy: Joi.string(),
    row: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getallByCategory = {
  query: Joi.object().keys({
    cCategory: Joi.string().optional().allow(''),
    _: Joi.string().optional().allow(''),
  }),
};

const getSysDictionaryById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

const getSysDictionaryByCategory = {
  params: Joi.object().keys({
    cCategory: Joi.string().required(),
  }),
};

const updateSysDictionaryById = {
  params: Joi.object().keys({
    cGuid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      cName: Joi.string().required(),
      cValue: Joi.string().required(),
      cCategory: Joi.string().required(),
      cMemo: Joi.string().max(255).optional(),
    })
    .min(1),
};

const deleteSysDictionaryById = {
  params: Joi.object().keys({
    cGuid: Joi.string().required(),
  }),
};

module.exports = {
  createSysDict,
  getSysDictionarys,
  getSysDictionaryByCategory,
  getSysDictionaryById,
  updateSysDictionaryById,
  deleteSysDictionaryById,
  getallByCategory,
};
