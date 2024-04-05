const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { sysuserService } = require('../../services');

const getall = catchAsync(async (req, res) => {
  const user = await sysuserService.getall();
  res.status(httpStatus.CREATED).send(user);
});

const pagination = catchAsync(async (req, res) => {
  const uuseridobj = pick(req.query, ['StrWhere']);
  let filter = {};
  const options = pick(req.query, ['orderBy', 'row', 'page']);
  if (uuseridobj.StrWhere !== undefined) {
    filter = {
      OR: [
        {
          username: {
            contains: uuseridobj.StrWhere,
          },
        },
        {
          userid: {
            contains: uuseridobj.StrWhere,
          },
        },
        {
          firstname: {
            contains: uuseridobj.StrWhere,
          },
        },
        {
          lastname: {
            contains: uuseridobj.StrWhere,
          },
        },
      ],
    };
  }

  const result = await sysuserService.pagination(filter, options);
  res.send(result);
});

const getUserByUserId = catchAsync(async (req, res) => {
  const user = await sysuserService.getUserByUserId(req.params.userid);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUserById = catchAsync(async (req, res) => {
  const user = await sysuserService.getUserByUserId(req.params.cGuid);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUserByUserId = catchAsync(async (req, res) => {
  const user = await sysuserService.updatebyuserid(req.params.userid, req.body);
  res.send(user);
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await sysuserService.updatebyid(req.params.cGuid, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await sysuserService.deleteUserById(req.params.cGuid);
  res.send(user);
});

module.exports = {
  getall,
  pagination,
  getUserById,
  getUserByUserId,
  updateUserByUserId,
  updateUserById,
  deleteUser,
};
