const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { sysloginlogService } = require('../../services');

const getall = catchAsync(async (req, res) => {
  const sysLog = await sysloginlogService.getall();
  res.status(httpStatus.CREATED).send(sysLog);
});

const pagination = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['StrWhere', 'browser', 'system_name']);
  const options = pick(req.query, ['orderBy', 'row', 'page']);

  if (filter.StrWhere) {
    filter.OR = [
      {
        browser: {
          contains: filter.StrWhere,
        },
      },
      {
        system_name: {
          contains: filter.StrWhere,
        },
      },
    ];
  } else {
    delete filter.StrWhere;
  }

  const result = await sysloginlogService.pagination(filter, options);
  res.send(result);
});

const getsysLogById = catchAsync(async (req, res) => {
  const sysLog = await sysloginlogService.getsysLogById(req.params.cGuid);
  if (!sysLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysLog not found');
  }
  res.send(sysLog);
});

const addsysLog = catchAsync(async (req, res) => {
  const sysLog = await sysloginlogService.addsysLog(req.body);
  res.send(sysLog);
});

const updatesysLogById = catchAsync(async (req, res) => {
  const sysLog = await sysloginlogService.updatebyid(req.params.cGuid, req.body);
  res.send(sysLog);
});

const deletesysLog = catchAsync(async (req, res) => {
  const sysLog = await sysloginlogService.deletesysLogById(req.params.cGuid);
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
