const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { sysdictService } = require('../../services');
const { CSVUtil } = require('../../core/CSVUtil');

const getall = catchAsync(async (req, res) => {
  const sysDictionary = await sysdictService.getall();
  res.status(httpStatus.OK).send(sysDictionary);
});

const getallByCategory = catchAsync(async (req, res) => {
  let filter = {};
  if (req.query.cCategory) {
    filter = {
      cCategory: req.query.cCategory,
    };
  }
  const data = await sysdictService.getallByCategory(filter);
  res.status(httpStatus.OK).send({ isok: true, message: 'Success', data });
});

const pagination = catchAsync(async (req, res) => {
  const pickedFilter = pick(req.query, ['StrWhere']);
  const filter = {};
  if (pickedFilter.StrWhere) {
    filter.OR = [
      {
        cName: {
          contains: pickedFilter.StrWhere,
        },
      },
      {
        cValue: {
          contains: pickedFilter.StrWhere,
        },
      },
      {
        cCategory: {
          contains: pickedFilter.StrWhere,
        },
      },
    ];
  } else {
    delete pickedFilter.StrWhere;
  }

  const options = pick(req.query, ['orderBy', 'row', 'page']);
  const result = await sysdictService.pagination(filter, options);
  res.send(result);
});

const getsysDictionaryById = catchAsync(async (req, res) => {
  const sysDictionary = await sysdictService.getsysDictionaryById(req.params.cGuid);
  if (!sysDictionary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysDictionary not found');
  }
  res.send(sysDictionary);
});

const addsysDictionary = catchAsync(async (req, res) => {
  const sysDictionary = await sysdictService.addsysDictionary(req.body);
  res.send(sysDictionary);
});

const updatesysDictionaryById = catchAsync(async (req, res) => {
  const sysDictionary = await sysdictService.updatebyid(req.params.cGuid, req.body);
  res.send({ isok: true, data: sysDictionary, message: 'success' });
});

const deletesysDictionary = catchAsync(async (req, res) => {
  const sysDictionary = await sysdictService.deletesysDictionaryById(req.params.cGuid);
  res.send(sysDictionary);
});

/**
 * 上传CSV文件并保存到数据库
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const uploadCsvFile = catchAsync(async (req, res) => {
  const { file } = req;
  const filePath = file.path;
  const cCreateUserName = req.params.cCreateUserName;
  const cCreateUserId = req.params.cCreateUserId;

  try {
    const dictData = await sysdictService.readCSV(filePath);
    const createBody = [];
    dictData.data.csvdata.forEach((item) => {
      const createBodyItem = {
        cName: item[0],
        cValue: item[1],
        cCategory: item[2],
        iStatus: Number(item[3]),
        cCreateUserGuid: null,
        cCreateUserId: item[5] != null || item[5] !== undefined ? item[5] : cCreateUserId,
        cCreateUserName: item[6] != null || item[6] !== undefined ? item[6] : cCreateUserName,
        dCreateTime: item[7] != null || item[6] !== undefined ? new Date(item[7]) : new Date(),
        cModifyUserGuid: null,
        cModifyUserId: item[9],
        cModifyUserName: item[10],
        dModifyTime: new Date(),
        cMemo: item[12],
      };
      createBody.push(createBodyItem);
    });
    // console.log(createBody);
    const result = await sysdictService.createMany(createBody);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading the CSV file.' });
  }
});

/**
 * 下载CSV文件
 * @param {object} req - 请求对象
 * @param {object} res - 响应对象
 */
const downloadCsvFile = catchAsync(async (req, res) => {
  try {
    // 获取所有数据
    const data = await sysdictService.getall();
    // 设置响应头
    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment('output.csv');
    // 将数据转换为CSV格式并发送给客户端
    res.send(CSVUtil.convertToCsv(data));
  } catch (error) {
    // 记录错误信息
    // eslint-disable-next-line no-console
    console.error('Error downloading CSV file:', error);
    // 发送错误响应给客户端
    res.status(500).send('Failed to download CSV file.');
  }
});

module.exports = {
  getall,
  pagination,
  getsysDictionaryById,
  addsysDictionary,
  updatesysDictionaryById,
  deletesysDictionary,
  getallByCategory,
  uploadCsvFile,
  downloadCsvFile,
};
