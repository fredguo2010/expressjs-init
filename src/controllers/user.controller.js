const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, sysrolemenuService, tokenService } = require('../services');

const getAuthMenuTreeNodesbyRole = catchAsync(async (req, res) => {
  const { role } = req.query;
  const result = await sysrolemenuService.getallauthmenutreenodesbyrolename(role);
  res.send({ MenuData: result });
});

const getAbilitybyRoleName = catchAsync(async (req, res) => {
  const { role } = req.query;
  const result = await sysrolemenuService.getabilitybyrolename(role);
  res.send({ ability: result });
});

const authenticate = catchAsync(async (req, res) => {
  const { isok, user, message } = await userService.authenticate(req.body);
  if (!isok) {
    res.status(200).json({ isok: false, message });
    return;
  }
  const tokens = await tokenService.generateAuthTokens(user);
  if (isok) {
    const nguser = {
      id: user.id,
      userid: user.userid,
      username: user.username,
      name: (user.lastname || '') + (user.firstname || ' '),
      avatar: user.avatar,
      email: user.email,
      token: tokens.access.token,
      refreshtoken: tokens.refresh.token,
      expired: Date.now() + 5 * 60 * 1000,
      role: user.role == null ? 'user' : user.role,
    };

    const ngtoken = {
      token: tokens.access.token,
      refreshtoken: tokens.refresh.token,
      expired: Date.now() + 5 * 60 * 1000,
    };

    res.status(200).json({
      isok: true,
      nguser,
      ngtoken,
      message: '登录成功',
    });
  }
});

const refreshauth = catchAsync(async (req, res) => {
  const { isok, user, tokens } = await userService.refreshAuth(req.headers.refresh_token);

  if (isok) {
    const nguser = {
      id: user.id,
      userid: user.userid,
      username: user.username,
      name: (user.lastname || '') + (user.firstname || ' '),
      avatar: user.avatar,
      email: user.email,
      token: tokens.access.token,
      refreshtoken: tokens.refresh.token,
      expired: Date.now() + 5 * 60 * 1000,
      role: user.role == null ? 'user' : user.role,
    };

    const ngtoken = {
      token: tokens.access.token,
      refreshtoken: tokens.refresh.token,
      expired: Date.now() + 5 * 60 * 1000,
    };

    res.status(200).json({
      isok: true,
      user: nguser,
      ngtoken,
      message: '刷新成功',
    });
  } else {
    res.status(200).json({ isok: false, message: 'Incorrect Username / Password' });
  }
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserByUserId(req.params.userid);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send({ data: user });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserByUserId(req.params.userid, req.body);
  res.send(user);
});

const resetRandomPwd = catchAsync(async (req, res) => {
  const user = await userService.resetrandompwd(req.params.userid, req.body);
  res.send(user);
});

const updatePassWord = catchAsync(async (req, res) => {
  const user = await userService.updatepwd(req.body.userid, req.body.newpwd, req.body.orgpwd);
  res.send(user);
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.cGuid, req.body);
  if (user) res.send({ isok: true });
  else res.send({ isok: false, message: 'update failed, please check' });
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.params.userid);
  res.send(user);
});

const uploadAvator = catchAsync(async (req, res) => {
  res.json({ file: req.file });
});

const checkuserexist = catchAsync(async (req, res) => {
  const user = await userService.checkUserExistByUsername(req.query.username);
  res.send({ isok: user });
});

const userRegister = catchAsync(async (req, res) => {
  const user = await userService.userRegister(req.body.username, req.body.password, req.body.email, req.body.phone);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  authenticate,
  refreshauth,
  createUser,
  getUsers,
  getAuthMenuTreeNodesbyRole,
  getAbilitybyRoleName,
  getUser,
  checkuserexist,
  resetRandomPwd,
  updateUser,
  updateUserById,
  deleteUser,
  uploadAvator,
  userRegister,
  updatePassWord,
};
