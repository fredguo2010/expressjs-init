const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sysloginlogValidation } = require('../../validations');
const { sysloginlogController } = require('../../controllers');

const router = express.Router();

router.route('/getall').get(auth('gets'), validate(sysloginlogValidation.getSysLoginLog), sysloginlogController.getall);

router.route('/pagination').get(auth('gets'), validate(sysloginlogValidation.getSysLoginLog), sysloginlogController.pagination);

router.route('/add').post(auth('manages'), validate(sysloginlogValidation.createSysLoginLog), sysloginlogController.addsysLog);

router
  .route('/item/:cGuid')
  .get(auth('gets'), validate(sysloginlogValidation.getSysLoginLogById), sysloginlogController.getsysLogById)
  .patch(auth('manages'), validate(sysloginlogValidation.updateSysLoginLogById), sysloginlogController.updatesysLogById)
  .put(auth('manages'), validate(sysloginlogValidation.updateSysLoginLogById), sysloginlogController.updatesysLogById)
  .delete(auth('manages'), validate(sysloginlogValidation.deleteSysLoginLogById), sysloginlogController.deletesysLog);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SysLoginLog
 *   description: Sys Log management and retrieval
 */

/**
 * @swagger
 * /api/sys/sysloginlog/getall:
 *   get:
 *     summary: Get all syslogs
 *     description: Only admins can retrieve all syslogs.
 *     tags: [SysLoginLog]
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
 *                     $ref: '#/components/schemas/Sys_Log'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysloginlog/pagination:
 *   get:
 *     summary: Get all syslogs by pagination
 *     description: Only admins can retrieve all syslogs.
 *     tags: [SysLoginLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: StrWhere
 *         schema:
 *           type: string
 *         description: Contains query parameters for browser and system_name
 *       - in: query
 *         name: browser
 *         schema:
 *           type: string
 *         description: sysloginlog browser
 *       - in: query
 *         name: system_name
 *         schema:
 *           type: string
 *         description: sysloginlog system
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
 *         description: Maximum number of syslogs
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
 *                     $ref: '#/components/schemas/Sys_Log'
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
 * /api/sys/sysloginlog/add:
 *   post:
 *     summary: add sysloginlog
 *     description: Only admins can retrieve all syslogs.
 *     tags: [SysLoginLog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sys_Log'
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
 *                     $ref: '#/components/schemas/Sys_Log'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysloginlog/item/{cGuid}:
 *   get:
 *     summary: Get a sysloginlog
 *     description: Logged in syslogs can fetch only their own sysloginlog information. Only admins can fetch other syslogs.
 *     tags: [SysLoginLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysloginlog cGuid
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Log'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a sysloginlog
 *     description: Logged in syslogs can only update their own information. Only admins can update other syslogs.
 *     tags: [SysLoginLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysloginlog cGuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               syslogname:
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
 *               syslogname: fake name
 *               email: fake@example.com
 *               lastname: lastname
 *               firstname: firstname
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Log'
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
 *     summary: Delete a sysloginlog
 *     description: Logged in syslogs can delete only themselves. Only admins can delete other syslogs.
 *     tags: [SysLoginLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysloginlog cGuid
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
