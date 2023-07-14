import { Error as MongooseError, CastError } from 'mongoose';
import { IGeneticErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (err: MongooseError.ValidationError): IGenericErrorResponse => {
  const errors: IGeneticErrorMessage[] = Object.values(err.errors).map(
    (element: MongooseError.ValidatorError | CastError) => {
      return {
        path: element?.path,
        message: element?.message,
      };
    }
  );

  const statusCode = 400

  return {
    statusCode,
    message: "Validation error",
    errorMessages: errors
  };
};

export default handleValidationError;
