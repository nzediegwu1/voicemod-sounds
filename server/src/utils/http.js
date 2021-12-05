export const response = ({ res, code = 200, message, data, errors }) =>
  res.status(code).json({ message, data, errors });

export class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
  }
}

/**
 * @description Checks if a value exists, or throw 404 error
 *
 * @param {any} data Item to check if is truthy
 * @param {String} message Error message to return upon failure
 *
 * @throws {CustomError}
 */
export const existsOr404 = (data, message) => {
  if (!data) {
    throw new CustomError(message, 404);
  }
};

/**
 * @description HTTP resolver for controller actions
 *
 * @param {Object} target Details about the decorated member
 *
 * @returns {Promise} Promise to resolve action or http error response
 */

export function ResolveHttp(target) {
  const action = target.descriptor.value;
  target.descriptor.value = async function (req, res) {
    try {
      const result = await action.call(this, req, res);
      return response({ res, ...result });
    } catch ({ message, statusCode = 500 }) {
      return response({
        res,
        code: statusCode,
        errors: [message],
      });
    }
  };

  return target;
}
