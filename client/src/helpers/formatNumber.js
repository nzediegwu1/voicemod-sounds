/**
 * @description Add commas for each thousand unit of a large number
 *
 * @param {String} value The input number to format
 * @returns {String} Human readable formatted numbers
 */
const formatNumber = (value) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatNumber;
