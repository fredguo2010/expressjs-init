const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { sysrolemenuService } = require('../../services');

const getall = catchAsync(async (req, res) => {
  const sysRoleMenu = await sysrolemenuService.getall();
  res.status(httpStatus.CREATED).send(sysRoleMenu);
});

const pagination = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['cModule', 'cActionType']);
  const options = pick(req.query, ['orderBy', 'row', 'page']);
  const result = await sysrolemenuService.pagination(filter, options);
  res.send(result);
});

const getsysRoleMenuById = catchAsync(async (req, res) => {
  const sysRoleMenu = await sysrolemenuService.getsysRoleMenuById(req.params.cGuid);
  if (!sysRoleMenu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysRoleMenu not found');
  }
  res.send(sysRoleMenu);
});

const getMenuTreeNodesbyRoleName = catchAsync(async (req, res) => {
  const { role } = req.query;
  const result = await sysrolemenuService.getabilitybyrolename(role);
  res.send({ MenuData: result });
});

const getMenuTreeNodesbyRoleGuid = catchAsync(async (req, res) => {
  const { cRoleGuid } = req.query;
  const result = await sysrolemenuService.getmenutreenodesbyroleguid(cRoleGuid);
  res.send({ treeData: result });
});

const addsysRoleMenu = catchAsync(async (req, res) => {
  const sysRoleMenu = await sysrolemenuService.addsysRoleMenu(req.body);
  res.send(sysRoleMenu);
});

const updatesysRoleMenuById = catchAsync(async (req, res) => {
  const sysRoleMenu = await sysrolemenuService.updatebyid(req.params.cGuid, req.body);
  res.send(sysRoleMenu);
});

const deletesysRoleMenu = catchAsync(async (req, res) => {
  const sysRoleMenu = await sysrolemenuService.deletesysRoleMenuById(req.params.cGuid);
  res.send(sysRoleMenu);
});

const syncsysRoleMenuByRole = catchAsync(async (req, res) => {
  const syncrst = await sysrolemenuService.syncsysmenubyrole(req.query.cRoleGuid);
  res.send(syncrst);
});

module.exports = {
  getall,
  pagination,
  getsysRoleMenuById,
  getMenuTreeNodesbyRoleName,
  getMenuTreeNodesbyRoleGuid,
  addsysRoleMenu,
  updatesysRoleMenuById,
  deletesysRoleMenu,
  syncsysRoleMenuByRole,
};
