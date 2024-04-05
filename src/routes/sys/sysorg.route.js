const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sysorgValidation } = require('../../validations');
const { sysorgController } = require('../../controllers');

const router = express.Router();

router.route('/getall').get(auth('gets'), validate(sysorgValidation.getSysOrgs), sysorgController.getall);

router.route('/pagination').get(auth('gets'), validate(sysorgValidation.getSysOrgs), sysorgController.pagination);

router.route('/gettreenodes').get(auth('gets'), validate(sysorgValidation.getSysOrgs), sysorgController.getTreeNodes);

router.route('/add').post(auth('manages'), validate(sysorgValidation.createSysOrg), sysorgController.addsysOrg);

router
  .route('/item/:cGuid')
  .get(auth('gets'), validate(sysorgValidation.getSysOrgById), sysorgController.getsysOrgById)
  .patch(auth('manages'), validate(sysorgValidation.updateSysOrgById), sysorgController.updatesysOrgById)
  .put(auth('manages'), validate(sysorgValidation.updateSysOrgById), sysorgController.updatesysOrgById)
  .delete(auth('manages'), validate(sysorgValidation.deleteSysOrgById), sysorgController.deletesysOrg);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SysOrg
 *   description: Sys Org management and retrieval
 */

/**
 * @swagger
 * /api/sys/sysorg/getall:
 *   get:
 *     summary: Get all sysorgs
 *     description: Only admins can retrieve all sysorgs.
 *     tags: [SysOrg]
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
 *                     $ref: '#/components/schemas/Sys_Org'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysorg/pagination:
 *   get:
 *     summary: Get all sysorgs by pagination
 *     description: Only admins can retrieve all sysorgs.
 *     tags: [SysOrg]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cOrgCode
 *         schema:
 *           type: string
 *         description: sysorg org code
 *       - in: query
 *         name: cOrgName
 *         schema:
 *           type: string
 *         description: sysorg org name
 *       - in: query
 *         name: cOrgType
 *         schema:
 *           type: string
 *         description: sysorg org type
 *       - in: query
 *         name: row
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of sysorgs
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
 *                     $ref: '#/components/schemas/Sys_Org'
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
 * /api/sys/sysorg/add:
 *   post:
 *     summary: add sysorg
 *     description: Only admins can retrieve all sysorgs.
 *     tags: [SysOrg]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sys_Org'
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
 *                     $ref: '#/components/schemas/Sys_Org'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysorg/item/{cGuid}:
 *   get:
 *     summary: Get a sysorg
 *     description: Logged in sysorgs can fetch only their own sysorg information. Only admins can fetch other sysorgs.
 *     tags: [SysOrg]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysorg cGuid
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Org'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a sysorg
 *     description: Logged in sysorgs can only update their own information. Only admins can update other sysorgs.
 *     tags: [SysOrg]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysorg cGuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sysorgname:
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
 *               sysorgname: fake name
 *               email: fake@example.com
 *               lastname: lastname
 *               firstname: firstname
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Org'
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
 *     summary: Delete a sysorg
 *     description: Logged in sysorgs can delete only themselves. Only admins can delete other sysorgs.
 *     tags: [SysOrg]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysorg cGuid
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
