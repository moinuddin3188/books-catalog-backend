import { ZodError, ZodIssue } from "zod"
import { IGenericErrorResponse } from "../interfaces/common"
import { IGeneticErrorMessage } from "../interfaces/error"

const handleZodValidationError = (error: ZodError): IGenericErrorResponse => {
    const errors: IGeneticErrorMessage[] = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message
        }
    })

    const statusCode = 400

    return {
        statusCode,
        message: "Validation error",
        errorMessages: errors
    }
}

export default handleZodValidationError
