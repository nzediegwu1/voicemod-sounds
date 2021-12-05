/**
 * @description Add commas for each thousand unit of a large number
 *
 * @param {String} value The input number to format
 * @returns {String} Human readable formatted numbers
 */
export const formatNumber = (value) => {
  if (!value) return 0;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const errorHandler = (error, setState) => {
  const { message, response } = error;
  if (response) {
    return setState((prev) => ({
      ...prev,
      errors: response.data.errors,
      loading: false,
    }));
  }
  setState((prev) => ({ ...prev, errors: [message], loading: false }));
};
