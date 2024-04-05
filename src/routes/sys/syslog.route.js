const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { syslogValidation } = require('../../validations');
const { syslogController } = require('../../controllers');

const router = express.Router();

router.route('/getall').get(auth('gets'), validate(syslogValidation.getSysLogs), syslogController.getall);

router.route('/pagination').get(auth('gets'), validate(syslogValidation.getSysLogs), syslogController.pagination);

router.route('/add').post(auth('manages'), validate(syslogValidation.createSysLog), syslogController.addsysLog);

router
  .route('/item/:cGuid')
  .get(auth('gets'), validate(syslogValidation.getSysLogById), syslogController.getsysLogById)
  .patch(auth('manages'), validate(syslogValidation.updateSysLogById), syslogController.updatesysLogById)
  .put(auth('manages'), validate(syslogValidation.updateSysLogById), syslogController.updatesysLogById)
  .delete(auth('manages'), validate(syslogValidation.deleteSysLogById), syslogController.deletesysLog);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SysLog
 *   description: Sys Log management and retrieval
 */

/**
 * @swagger
 * /api/sys/syslog/getall:
 *   get:
 *     summary: Get all syslogs
 *     description: Only admins can retrieve all syslogs.
 *     tags: [SysLog]
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
 * /api/sys/syslog/pagination:
 *   get:
 *     summary: Get all syslogs by pagination
 *     description: Only admins can retrieve all syslogs.
 *     tags: [SysLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cModule
 *         schema:
 *           type: string
 *         description: syslog name
 *       - in: query
 *         name: cActionType
 *         schema:
 *           type: string
 *         description: syslog cCategory
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
 * /api/sys/syslog/add:
 *   post:
 *     summary: add syslog
 *     description: Only admins can retrieve all syslogs.
 *     tags: [SysLog]
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
 * /api/sys/syslog/item/{cGuid}:
 *   get:
 *     summary: Get a syslog
 *     description: Logged in syslogs can fetch only their own syslog information. Only admins can fetch other syslogs.
 *     tags: [SysLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: syslog cGuid
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
 *     summary: Update a syslog
 *     description: Logged in syslogs can only update their own information. Only admins can update other syslogs.
 *     tags: [SysLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: syslog cGuid
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
 *     summary: Delete a syslog
 *     description: Logged in syslogs can delete only themselves. Only admins can delete other syslogs.
 *     tags: [SysLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: syslog cGuid
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
