const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sysmenuValidation } = require('../../validations');
const { sysmenuController } = require('../../controllers');

const router = express.Router();

router.route('/getall').get(auth('gets'), validate(sysmenuValidation.getSysMenus), sysmenuController.getall);

router.route('/pagination').get(auth('gets'), validate(sysmenuValidation.getSysMenus), sysmenuController.pagination);

router.route('/gettreenodes').get(auth('gets'), sysmenuController.getsysMenuTreeNodes);

router.route('/getmenuparent').get(auth('gets'), sysmenuController.getMenuParents);

router.route('/add').post(auth('manages'), validate(sysmenuValidation.createSysMenu), sysmenuController.addsysMenu);

router
  .route('/item/:cGuid')
  .get(auth('gets'), validate(sysmenuValidation.getSysMenuById), sysmenuController.getsysMenuById)
  .patch(auth('manages'), validate(sysmenuValidation.updateSysMenuById), sysmenuController.updatesysMenuById)
  .put(auth('manages'), validate(sysmenuValidation.updateSysMenuById), sysmenuController.updatesysMenuById)
  .delete(auth('manages'), validate(sysmenuValidation.deleteSysMenuById), sysmenuController.deletesysMenu);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SysMenu
 *   description: Sys Menu management and retrieval
 */

/**
 * @swagger
 * /api/sys/sysmenu/getall:
 *   get:
 *     summary: Get all sysmenus
 *     description: Only admins can retrieve all sysmenus.
 *     tags: [SysMenu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sys_Menu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysmenu/pagination:
 *   get:
 *     summary: Get all sysmenus by pagination
 *     description: Only admins can retrieve all sysmenus.
 *     tags: [SysMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: text
 *         schema:
 *           type: string
 *         description: sysmenu name
 *       - in: query
 *         name: cParentGuid
 *         schema:
 *           type: string
 *         description: sysmenu cParentGuid
 *       - in: query
 *         name: row
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of sysmenus
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
 *                     $ref: '#/components/schemas/Sys_Menu'
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
 * /api/sys/sysmenu/getmenuparent:
 *   get:
 *     security:
 *       - Authorization: []
 *     description: sysorg get all
 *     tags: [SysMenu]
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sys_Menu'
 */

/**
 * @swagger
 * /api/sys/sysmenu/add:
 *   post:
 *     summary: add sysmenu
 *     description: Only admins can retrieve all sysmenus.
 *     tags: [SysMenu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sys_Menu'
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
 *                     $ref: '#/components/schemas/Sys_Menu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysmenu/item/{cGuid}:
 *   get:
 *     summary: Get a sysmenu
 *     description: Logged in sysmenus can fetch only their own sysmenu information. Only admins can fetch other sysmenus.
 *     tags: [SysMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysmenu cGuid
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Menu'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a sysmenu
 *     description: Logged in sysmenus can only update their own information. Only admins can update other sysmenus.
 *     tags: [SysMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysmenu cGuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sysmenuname:
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
 *               sysmenuname: fake name
 *               email: fake@example.com
 *               lastname: lastname
 *               firstname: firstname
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Menu'
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
 *     summary: Delete a sysmenu
 *     description: Logged in sysmenus can delete only themselves. Only admins can delete other sysmenus.
 *     tags: [SysMenu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysmenu cGuid
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
