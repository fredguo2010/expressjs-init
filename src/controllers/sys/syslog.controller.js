const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { syslogService } = require('../../services');

const getall = catchAsync(async (req, res) => {
  const sysLog = await syslogService.getall();
  res.status(httpStatus.CREATED).send(sysLog);
});

const pagination = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['cModule', 'cActionType']);
  const options = pick(req.query, ['orderBy', 'row', 'page']);
  const result = await syslogService.pagination(filter, options);
  res.send(result);
});

const getsysLogById = catchAsync(async (req, res) => {
  const sysLog = await syslogService.getsysLogById(req.params.cGuid);
  if (!sysLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysLog not found');
  }
  res.send(sysLog);
});

const addsysLog = catchAsync(async (req, res) => {
  const sysLog = await syslogService.addsysLog(req.body);
  res.send(sysLog);
});

const updatesysLogById = catchAsync(async (req, res) => {
  const sysLog = await syslogService.updatebyid(req.params.cGuid, req.body);
  res.send(sysLog);
});

const deletesysLog = catchAsync(async (req, res) => {
  const sysLog = await syslogService.deletesysLogById(req.params.cGuid);
  res.send(sysLog);
});

module.exports = {
  getall,
  pagination,
  getsysLogById,
  addsysLog,
  updatesysLogById,
  deletesysLog,
};
