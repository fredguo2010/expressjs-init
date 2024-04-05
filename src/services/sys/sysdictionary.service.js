const httpStatus = require('http-status');
// const { sysDictionary } = require('../models');
const ApiError = require('../../utils/ApiError');
const prisma = require('../../core/prisma');
const { CSVUtil } = require('../../core/CSVUtil');

/**
 * SysDictionary get all
 * @param {Object} SysDictionaryBody
 * @returns {Promise<QueryResult>}
 */
const getall = async () => {
  return prisma.Sys_Dictionary.findMany();
};
/**
 * getallByCategory get all
 * @param {Object} SysDictionaryBody
 * @returns {Promise<QueryResult>}
 */
const getallByCategory = async (filter) => {
  return prisma.Sys_Dictionary.findMany({
    where: filter,
  });
};

/**
 * pagination for sysDictionarys
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.orderBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.row] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const pagination = async (filter, options) => {
  const page = Number(options.page) || 1;
  const row = Number(options.row) || 5;
  const { orderBy } = options;
  let orderByObj = {};
  if (orderBy) {
    const [key, value] = orderBy.split(':');
    orderByObj = {
      [key]: value,
    };
  }

  const count = await prisma.Sys_Dictionary.count({ where: filter });

  const sysDictionarys = await prisma.Sys_Dictionary.findMany({
    where: filter,
    skip: (page - 1) * row,
    take: row,
    orderBy: orderByObj,
  });
  return { isok: true, total: count, data: sysDictionarys };
};

/**
 * Get sysDictionary by id
 * @param {ObjectId} cGuid
 * @returns {Promise<sysDictionary>}
 */
const getsysDictionaryById = async (cGuid) => {
  return prisma.Sys_Dictionary.findUnique({
    where: {
      cGuid,
    },
  });
};

/**
 * Create sysDictionary with createBody
 * @param {Object} createBody
 * @returns {Promise<sysDictionary>}
 */
const addsysDictionary = async (createBody) => {
  const data = await prisma.Sys_Dictionary.create({
    data: createBody,
  });
  return { isok: true, message: '添加成功', data };
};

/**
 * Update sysDictionary by cGuid
 * @param {ObjectId} cGuid
 * @param {Object} updateBody
 * @returns {Promise<sysDictionary>}
 */
const updatebyid = async (cGuid, updateBody) => {
  const sysDictionary = await getsysDictionaryById(cGuid);
  if (!sysDictionary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysDictionary not found');
  }
  Object.assign(sysDictionary, updateBody);
  const data = await prisma.Sys_Dictionary.updateMany({
    data: updateBody,
    where: {
      cGuid,
    },
  });
  return { isok: true, message: '添加成功', data };
};

/**
 * Delete sysDictionary by id
 * @param {ObjectId} cGuid
 * @returns {Promise<sysDictionary>}
 */
const deletesysDictionaryById = async (cGuid) => {
  const sysDictionary = await getsysDictionaryById(cGuid);
  if (!sysDictionary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sysDictionary not found');
  }

  const data = await prisma.Sys_Dictionary.delete({
    where: { cGuid },
  });

  return { isok: true, message: '删除成功', data };
};

/**
 * 异步读取CSV文件
 * @param {File} file - 要读取的CSV文件
 * @returns {Promise} - 包含读取结果的对象
 */
const readCSV = async (file) => {
  try {
    const csv = new CSVUtil(file);
    const data = await csv.read();
    return {
      success: true,
      data,
      message: 'CSV file was successfully read.',
    };
  } catch (error) {
    // 可以在这里记录错误或者转换错误信息
    // eslint-disable-next-line no-console
    console.error('Error reading CSV file:', error);
    return {
      success: false,
      message: 'Failed to read CSV file.',
    };
  }
};

/**
 * 创建多个Sys_Dictionary记录
 * @param {Array} createBody - 要创建的Sys_Dictionary记录数组
 * @returns {Promise} 包含操作结果的对象
 */
const createMany = async (createBody) => {
  try {
    // 使用Prisma库的createMany方法创建多个Sys_Dictionary记录
    const result = await prisma.Sys_Dictionary.createMany({
      data: createBody,
    });
    return { isok: true, data: result, message: 'success' };
  } catch (error) {
    // 如果创建过程中出现错误，返回失败信息
    // eslint-disable-next-line no-console
    console.error('Error creating Sys_Dictionary records:', error);
    return { isok: false, message: 'Failed to create Sys_Dictionary records.' };
  }
};

module.exports = {
  getall,
  pagination,
  getsysDictionaryById,
  addsysDictionary,
  updatebyid,
  deletesysDictionaryById,
  getallByCategory,
  readCSV,
  createMany,
};
