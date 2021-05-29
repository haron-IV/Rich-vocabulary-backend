import { Response } from 'express'

class ErrorService {
  private responseError = (
    response: Response<unknown>,
    statusCode: number,
    message: string,
    details?: string
  ): void => {
    response.status(statusCode).json({
      message,
      details,
    })
  }

  public resourceExist = (
    response?: Response<unknown>,
    details?: string
  ): void => {
    if (response) this.responseError(response, 409, 'Resource exist.', details)
    else console.error(details)
  }

  public resourceDoNotExist = (
    response: Response<unknown>,
    details?: string
  ): void => {
    this.responseError(response, 404, 'Resource do not exist.', details)
  }

  public badRequest = (response: Response<unknown>, details?: string): void => {
    this.responseError(response, 400, 'Bad request.', details)
  }
}

export default ErrorService
