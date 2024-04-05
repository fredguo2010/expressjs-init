const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { userValidation } = require('../validations');
const { userController } = require('../controllers');
const multerConfig = require('../core/multer'); // Import the module

const router = express.Router();

router.route('/Authenticate').post(validate(userValidation.login), userController.authenticate);
router.route('/RefreshToken').post(userController.refreshauth);
router.route('/getmenutreenodesbyrolename').get(userController.getAuthMenuTreeNodesbyRole);
router.route('/getabilitybyrolename').get(userController.getAbilitybyRoleName);

router
  .route('/')
  .post(auth('manages'), validate(userValidation.createUser), userController.createUser)
  .get(auth('gets'), validate(userValidation.getUsers), userController.getUsers);

router.route('/UserExists').get(validate(userValidation.checkUserExistByUsername), userController.checkuserexist);

router.route('/UserRegister').post(validate(userValidation.createUser), userController.userRegister);

router.route('/item/:userid').get(auth('gets'), validate(userValidation.getUser), userController.getUser);

router
  .route('/SysUserResetPassword')
  .post(auth('manages'), validate(userValidation.restPwdUserById), userController.resetRandomPwd);

router.route('/item/:cGuid').put(auth('manages'), validate(userValidation.updateUserById), userController.updateUserById);

router
  .route('/SysUserUpdatePassWord')
  .post(auth('manages'), validate(userValidation.updatePassWord), userController.updatePassWord);

router
  .route('/avator/upload')
  .post(auth('manages'), multerConfig.avatorstorage.single('avatar'), userController.uploadAvator);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /api/Users/Authenticate:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - useername
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               username: frankwu
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/Sys_User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid email or password
 */

/**
 * @swagger
 * /api/Users/RefreshToken:
 *   post:
 *     summary: Refresh AccessToken based on RefreshToken
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: refresh_token
 *         required: true
 *         type: string
 *         description: The refresh token for authentication.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/Sys_User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Unauthorized
 */

/**
 * @swagger
 * /api/Users/getmenutreenodesbyrolename:
 *   get:
 *     summary: Get Menutree based on role name
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: role
 *         required: true
 *         type: string
 *         description: Role Name.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 MenuData:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      schema:
 *                        $ref: '#/components/schemas/Sys_Menu'
 *       "401":
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Unauthorized
 */

/**
 * @swagger
 * /api/Users/getabilitybyrolename:
 *   get:
 *     summary: Get ability based on role name
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: role
 *         required: true
 *         type: string
 *         description: Role Name.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ability:
 *                  type: array
 *                  items:
 *                    type: string
 *       "401":
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Unauthorized
 */
