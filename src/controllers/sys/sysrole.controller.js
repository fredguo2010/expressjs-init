const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { sysroleService } = require('../../services');

const getall = catchAsync(async (req, res) => {
  const sysRole = await sysroleService.getall();
  res.status(httpStatus.CREATED).send(sysRole);
});

const pagination = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['cRoleCode', 'cRoleName']);
  const options = pick(req.query, ['orderBy', 'row', 'page']);
  const result = await sysroleService.pagination(filter, options);
  res.send(result);
});

const getsysRoleById = catchAsync(async (req, res) => {
  const sysRole = await sysroleService.getsysRoleById(req.params.cGuid);
  if (!sysRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysRole not found');
  }
  res.send(sysRole);
});

const addsysRole = catchAsync(async (req, res) => {
  const sysRole = await sysroleService.addsysRole(req.body);
  res.send(sysRole);
});

const updatesysRoleById = catchAsync(async (req, res) => {
  const sysRole = await sysroleService.updatebyid(req.params.cGuid, req.body);
  res.send(sysRole);
});

const deletesysRole = catchAsync(async (req, res) => {
  const sysRole = await sysroleService.deletesysRoleById(req.params.cGuid);
  res.send(sysRole);
});

module.exports = {
  getall,
  pagination,
  getsysRoleById,
  addsysRole,
  updatesysRoleById,
  deletesysRole,
};
