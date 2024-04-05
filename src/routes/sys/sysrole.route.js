const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sysroleValidation } = require('../../validations');
const { sysroleController } = require('../../controllers');

const router = express.Router();

router.route('/getall').get(auth('gets'), validate(sysroleValidation.getSysRoles), sysroleController.getall);

router.route('/pagination').get(auth('gets'), validate(sysroleValidation.getSysRoles), sysroleController.pagination);

router.route('/add').post(auth('manages'), validate(sysroleValidation.createSysRole), sysroleController.addsysRole);

router
  .route('/item/:cGuid')
  .get(auth('gets'), validate(sysroleValidation.getSysRoleById), sysroleController.getsysRoleById)
  .patch(auth('manages'), validate(sysroleValidation.updateSysRoleById), sysroleController.updatesysRoleById)
  .put(auth('manages'), validate(sysroleValidation.updateSysRoleById), sysroleController.updatesysRoleById)
  .delete(auth('manages'), validate(sysroleValidation.deleteSysRoleById), sysroleController.deletesysRole);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SysRole
 *   description: Sys Role management and retrieval
 */

/**
 * @swagger
 * /api/sys/sysrole/getall:
 *   get:
 *     summary: Get all sysroles
 *     description: Only admins can retrieve all sysroles.
 *     tags: [SysRole]
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
 *                     $ref: '#/components/schemas/Sys_Role'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysrole/pagination:
 *   get:
 *     summary: Get all sysroles by pagination
 *     description: Only admins can retrieve all sysroles.
 *     tags: [SysRole]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cName
 *         schema:
 *           type: string
 *         description: sysrole name
 *       - in: query
 *         name: cCategory
 *         schema:
 *           type: string
 *         description: sysrole cCategory
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
 *         description: Maximum number of sysroles
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
 *                     $ref: '#/components/schemas/Sys_Role'
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
 * /api/sys/sysrole/add:
 *   post:
 *     summary: add sysrole
 *     description: Only admins can retrieve all sysroles.
 *     tags: [SysRole]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sys_Role'
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
 *                     $ref: '#/components/schemas/Sys_Role'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysrole/item/{cGuid}:
 *   get:
 *     summary: Get a sysrole
 *     description: Logged in sysroles can fetch only their own sysrole information. Only admins can fetch other sysroles.
 *     tags: [SysRole]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysrole cGuid
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Role'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a sysrole
 *     description: Logged in sysroles can only update their own information. Only admins can update other sysroles.
 *     tags: [SysRole]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysrole cGuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sysrolename:
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
 *               sysrolename: fake name
 *               email: fake@example.com
 *               lastname: lastname
 *               firstname: firstname
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Role'
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
 *     summary: Delete a sysrole
 *     description: Logged in sysroles can delete only themselves. Only admins can delete other sysroles.
 *     tags: [SysRole]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysrole cGuid
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
