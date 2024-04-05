const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { sysorgService } = require('../../services');

const getall = catchAsync(async (req, res) => {
  const sysOrg = await sysorgService.getall();
  res.status(httpStatus.CREATED).send(sysOrg);
});

const pagination = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['cOrgCode', 'cOrgName', 'cOrgType']);
  const options = pick(req.query, ['orderBy', 'row', 'page']);
  if (filter.cOrgCode) {
    filter.cOrgCode = {
      contains: filter.cOrgCode,
    };
  }
  if (filter.cOrgName) {
    filter.cOrgName = {
      contains: filter.cOrgName,
    };
  }

  const result = await sysorgService.pagination(filter, options);
  res.send(result);
});

const getTreeNodes = catchAsync(async (req, res) => {
  const result = await sysorgService.gettreenodes();
  res.send(result);
});

const getsysOrgById = catchAsync(async (req, res) => {
  const sysOrg = await sysorgService.getsysOrgById(req.params.cGuid);
  if (!sysOrg) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysOrg not found');
  }
  res.send(sysOrg);
});

const addsysOrg = catchAsync(async (req, res) => {
  const sysOrg = await sysorgService.addsysOrg(req.body);
  res.send(sysOrg);
});

const updatesysOrgById = catchAsync(async (req, res) => {
  const sysOrg = await sysorgService.updatebyid(req.params.cGuid, req.body);
  res.send(sysOrg);
});

const deletesysOrg = catchAsync(async (req, res) => {
  const sysOrg = await sysorgService.deletesysOrgById(req.params.cGuid);
  res.send(sysOrg);
});

module.exports = {
  getall,
  pagination,
  getsysOrgById,
  getTreeNodes,
  addsysOrg,
  updatesysOrgById,
  deletesysOrg,
};
