const express = require('express');
const fs = require('fs');
const multer = require('multer');
const { diskStorage } = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sysdictValidation } = require('../../validations');
const { sysdictController } = require('../../controllers');
// eslint-disable-next-line import/order
const uuidv4 = require('uuid').v4;

const router = express.Router();

const storage = diskStorage({
  // destination 函数用于确定文件存储的路径
  destination(req, file, done) {
    const dist = './uploads/CSV/SysDictionary/';
    // 检查目录是否存在，如果不存在则创建
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(dist)) fs.mkdirSync(dist);
    return done(null, dist);
  },
  // filename 函数用于生成文件名
  filename(req, file, done) {
    const originalName = String(file.originalname);
    // 生成一个唯一的文件名，格式为 uuid + 原始文件名
    const newName = `${uuidv4()}-${originalName}`;
    done(null, newName);
  },
});

const upload = multer({
  storage,
});

router.route('/getall').get(auth('gets'), validate(sysdictValidation.getSysDictionarys), sysdictController.getall);

router.route('/pagination').get(auth('gets'), validate(sysdictValidation.getSysDictionarys), sysdictController.pagination);

router.route('/add').post(auth('manages'), validate(sysdictValidation.createSysDict), sysdictController.addsysDictionary);

router
  .route('/item/:cGuid')
  .get(auth('gets'), validate(sysdictValidation.getSysDictionaryById), sysdictController.getsysDictionaryById)
  .patch(auth('manages'), validate(sysdictValidation.updatesysdictionaryById), sysdictController.updatesysDictionaryById)
  .put(auth('manages'), validate(sysdictValidation.updatesysdictionaryById), sysdictController.updatesysDictionaryById)
  .delete(auth('manages'), validate(sysdictValidation.deletesysdictionaryById), sysdictController.deletesysDictionary);
router.route('/uploadcsv').post(auth('manages'), upload.single('file'), sysdictController.uploadCsvFile);
router.route('/downloadCsvFile/:filename').get(auth('gets'), sysdictController.downloadCsvFile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SysDictionary
 *   description: Sys Dictionary management and retrieval
 */

/**
 * @swagger
 * /api/sys/sysdictionary/getall:
 *   get:
 *     summary: Get all dictionarys
 *     description: Only admins can retrieve all dictionarys.
 *     tags: [SysDictionary]
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
 *                     $ref: '#/components/schemas/Sys_Dictionary'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysdictionary/pagination:
 *   get:
 *     summary: Get all dictionarys by pagination
 *     description: Only admins can retrieve all dictionarys.
 *     tags: [SysDictionary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: StrWhere
 *         schema:
 *           type: string
 *         description: Contains query parameters for cName, cValue and cCategory
 *       - in: query
 *         name: cName
 *         schema:
 *           type: string
 *         description: sysdictionary name
 *       - in: query
 *         name: cValue
 *         schema:
 *           type: string
 *         description: sysdictionary value
 *       - in: query
 *         name: cCategory
 *         schema:
 *           type: string
 *         description: sysdictionary category
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
 *         description: Maximum number of dictionarys
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
 *                     $ref: '#/components/schemas/Sys_Dictionary'
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
 * /api/sys/sysdictionary/add:
 *   post:
 *     summary: add dictionary
 *     description: Only admins can retrieve all dictionarys.
 *     tags: [SysDictionary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sys_Dictionary'
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
 *                     $ref: '#/components/schemas/Sys_Dictionary'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /api/sys/sysdictionary/item/{cGuid}:
 *   get:
 *     summary: Get a sysdictionary
 *     description: Logged in dictionarys can fetch only their own sysdictionary information. Only admins can fetch other dictionarys.
 *     tags: [SysDictionary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysdictionary cGuid
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Dictionary'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a sysdictionary
 *     description: Logged in dictionarys can only update their own information. Only admins can update other dictionarys.
 *     tags: [SysDictionary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysdictionary cGuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sysdictionaryname:
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
 *               sysdictionaryname: fake name
 *               email: fake@example.com
 *               lastname: lastname
 *               firstname: firstname
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sys_Dictionary'
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
 *     summary: Delete a sysdictionary
 *     description: Logged in dictionarys can delete only themselves. Only admins can delete other dictionarys.
 *     tags: [SysDictionary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cGuid
 *         required: true
 *         schema:
 *           type: string
 *         description: sysdictionary cGuid
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
