const fs = require('fs');
const { parse } = require('csv-parse');

class CSVUtil {
  constructor(filePath) {
    this.filePath = filePath;
  }

  /**
   * 读取CSV文件
   * @returns {Promise<unknown>}
   */
  async read() {
    return new Promise((resolve, reject) => {
      const data = [];
      fs.createReadStream(this.filePath)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', (row) => {
          // 这里可以换成对row的处理逻辑
          data.push(row);
          // console.log(row);
        })
        .on('end', () => {
          // console.log('CSV file successfully processed');
          // 返回数据
          resolve({ csvdata: data, datasize: data.length }); // 使用resolve来表示处理完成
        })
        .on('error', (error) => {
          // 添加错误处理
          reject(error);
        });
    });
  }

  /**
   * 将数据转换为CSV格式的字符串
   * @param {Array} data - 包含多行数据的数组
   * @returns {string} - 转换后的CSV字符串
   */
  static convertToCsv(data) {
    // 获取表头
    const headers = Object.keys(data[0]);
    // 创建CSV行数组
    const csvRows = [headers.join(',')];
    // 遍历数据数组
    data.forEach((row) => {
      // 创建CSV行数组
      const values = headers.map((header) => {
        let value = row[header];
        // 如果值是字符串且包含逗号，则将值用双引号包裹
        if (typeof value === 'string' && value.includes(',')) {
          value = `"${value}"`;
        }
        return value;
      });
      // 将CSV行添加到CSV行数组中
      csvRows.push(values.join(','));
    });
    // 直接返回转换后的CSV字符串
    return csvRows.join('\n');
  }
}

// 使用示例
// const csvReader = new CSVReader('path/to/your/file.csv');
// csvReader.read()
//   .then(() => {
//     console.log('CSV file processed successfully.');
//   })
//   .catch((error) => {
//     console.error('Error processing CSV file:', error);
//   });

module.exports = { CSVUtil };
