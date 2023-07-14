import { IGeneticErrorMessage } from "./error";

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGeneticErrorMessage[];
};
