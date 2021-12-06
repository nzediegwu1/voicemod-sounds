/* eslint-disable import/prefer-default-export */
import { check, validationResult } from 'express-validator/check';
import { soundError } from '../messages/error';

const getErrors = (req, next) => {
  const errors = validationResult(req)
    .array()
    .map((error) => error.msg);
  if (!errors.length) {
    return next();
  }
  return errors;
};

export const handleValidation = async (req, res, next) => {
  const result = getErrors(req, next);
  return Array.isArray(result)
    ? res.status(400).json({ errors: result })
    : result;
};

export const validateId = [
  check('soundId').trim().isMongoId().withMessage(soundError.invalidSoundId),
];
