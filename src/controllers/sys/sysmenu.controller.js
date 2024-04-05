const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { sysmenuService } = require('../../services');

const getall = catchAsync(async (req, res) => {
  const sysMenu = await sysmenuService.getall();
  res.status(httpStatus.CREATED).send(sysMenu);
});

const pagination = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['text', 'cParentGuid']);
  const options = pick(req.query, ['orderBy', 'row', 'page']);
  if (filter.text === '') delete filter.text;
  if (filter.cParentGuid === '') delete filter.cParentGuid;
  const result = await sysmenuService.pagination(filter, options);
  res.send(result);
});

const getsysMenuById = catchAsync(async (req, res) => {
  const sysMenu = await sysmenuService.getsysMenuById(req.params.cGuid);
  if (!sysMenu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysMenu not found');
  }
  res.send(sysMenu);
});

const getsysMenuTreeNodes = catchAsync(async (req, res) => {
  const sysMenutreenodes = await sysmenuService.getmenutreenodes();
  if (!sysMenutreenodes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysMenu tree node not found');
  }
  res.send({ treeData: sysMenutreenodes });
});

const getMenuParents = catchAsync(async (req, res) => {
  const data = await sysmenuService.getsysMenuParents();
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysMenu tree node not found');
  }
  res.send(data);
});

const addsysMenu = catchAsync(async (req, res) => {
  const sysMenu = await sysmenuService.addsysMenu(req.body);
  res.send({ isok: true, data: sysMenu });
});

const updatesysMenuById = catchAsync(async (req, res) => {
  const sysMenu = await sysmenuService.updatebyid(req.params.cGuid, req.body);
  res.send({ isok: true, data: sysMenu });
});

const deletesysMenu = catchAsync(async (req, res) => {
  const sysMenu = await sysmenuService.deletesysMenuById(req.params.cGuid);
  res.send(sysMenu);
});

module.exports = {
  getall,
  pagination,
  getsysMenuById,
  getsysMenuTreeNodes,
  getMenuParents,
  addsysMenu,
  updatesysMenuById,
  deletesysMenu,
};
