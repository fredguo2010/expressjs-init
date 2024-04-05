const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sysrolemenuValidation } = require('../../validations');
const { sysrolemenuController } = require('../../controllers');

const router = express.Router();

router.route('/getall').get(auth('gets'), validate(sysrolemenuValidation.getSysRoleMenus), sysrolemenuController.getall);

router
  .route('/pagination')
  .get(auth('gets'), validate(sysrolemenuValidation.getSysRoleMenus), sysrolemenuController.pagination);

router
  .route('/gettreenodesbyrole')
  .get(
    auth('gets'),
    validate(sysrolemenuValidation.getSysRoleMenusByRoleGuid),
    sysrolemenuController.getMenuTreeNodesbyRoleGuid
  );

router
  .route('/add')
  .post(auth('manages'), validate(sysrolemenuValidation.createSysRoleMenu), sysrolemenuController.addsysRoleMenu);

router
  .route('/item/:cGuid')
  .get(auth('gets'), validate(sysrolemenuValidation.getSysRoleMenuById), sysrolemenuController.getsysRoleMenuById)
  .patch(auth('manages'), validate(sysrolemenuValidation.updateSysRoleMenuById), sysrolemenuController.updatesysRoleMenuById)
  .put(auth('manages'), validate(sysrolemenuValidation.updateSysRoleMenuById), sysrolemenuController.updatesysRoleMenuById)
  .delete(auth('manages'), validate(sysrolemenuValidation.deleteSysRoleMenuById), sysrolemenuController.deletesysRoleMenu);

router
  .route('/syncsysmenubyrole')
  .get(auth('gets'), validate(sysrolemenuValidation.getSysRoleMenusByRoleGuid), sysrolemenuController.syncsysRoleMenuByRole);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SysRoleMenu
 *   description: Sys RoleMenu management and retrieval
 */

/**
 * @swagger
 * /api/sys/sysrolemenu/getall:
 *   get:
 *     summary: Get all sysrolemenus
 *     description: Only admins can retrieve all sysrolemenus.
 *     tags: [SysRoleMenu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sys_RoleMenu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysrolemenu/pagination:
 *   get:
 *     summary: Get all sysrolemenus by pagination
 *     description: Only admins can retrieve all sysrolemenus.
 *     tags: [SysRoleMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cName
 *         schema:
 *           type: string
 *         description: sysrolemenu name
 *       - in: query
 *         name: cCategory
 *         schema:
 *           type: string
 *         description: sysrolemenu cCategory
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: row
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of sysrolemenus
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sys_RoleMenu'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 row:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysrolemenu/add:
 *   post:
 *     summary: add sysrolemenu
 *     description: Only admins can retrieve all sysrolemenus.
 *     tags: [SysRoleMenu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sys_RoleMenu'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sys_RoleMenu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysrolemenu/item/{cGuid}:
 *   get:
 *     summary: Get a sysrolemenu
 *     description: Logged in sysrolemenus can fetch only their own sysrolemenu information. Only admins can fetch other sysrolemenus.
 *     tags: [SysRoleMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysrolemenu cGuid
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_RoleMenu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a sysrolemenu
 *     description: Logged in sysrolemenus can only update their own information. Only admins can update other sysrolemenus.
 *     tags: [SysRoleMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysrolemenu cGuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sysrolemenuname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               lastname:
 *                 type: string
 *                 description: lastname
 *               firstname:
 *                 type: string
 *                 description: firstname
 *             example:
 *               sysrolemenuname: fake name
 *               email: fake@example.com
 *               lastname: lastname
 *               firstname: firstname
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_RoleMenu'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a sysrolemenu
 *     description: Logged in sysrolemenus can delete only themselves. Only admins can delete other sysrolemenus.
 *     tags: [SysRoleMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysrolemenu cGuid
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
