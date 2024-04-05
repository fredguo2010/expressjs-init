class DateUtil {
  // 获取当前时间
  static getCurrentTime() {
    return new Date();
  }

  // 格式化日期（年-月-日）
  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要加 1，并用 '0' 填充到 2 位
    const day = String(date.getDate()).padStart(2, '0'); // 日期用 '0' 填充到 2 位
    return `${year}-${month}-${day}`;
  }

  // 格式化时间（时:分:秒）
  static formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0'); // 小时用 '0' 填充到 2 位
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟用 '0' 填充到 2 位
    const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒数用 '0' 填充到 2 位
    return `${hours}:${minutes}:${seconds}`;
  }

  // 格式化日期和时间（年-月-日 时:分:秒）
  static formatDateTime(date) {
    const formattedDate = this.formatDate(date);
    const formattedTime = this.formatTime(date);
    return `${formattedDate} ${formattedTime}`;
  }

  // 获取两个日期之间的时间差（以天为单位）
  static getTimeDifference(date1, date2) {
    const diffTime = date2 - date1; // 获取两个日期之差（毫秒）
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 以天为单位的向上取整
  }

  // 是否是闰年
  static isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}

module.exports = { DateUtil };

// 示例用法
// const util = new DateUtil();
// const currentDate = DateUtil.getCurrentTime();
// console.log(DateUtil.formatDateTime(currentDate)); // 当前日期和时间的格式化结果
// console.log(DateUtil.getTimeDifference(currentDate, new Date(currentDate.getTime() - 86400000))); // 1
// console.log(DateUtil.isLeapYear(currentDate.getFullYear())); // false 或 true
