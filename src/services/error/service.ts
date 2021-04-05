class ErrorService {
  private responseError = (
    response: any,
    statusCode: number,
    message: string,
    details?: string
  ): void => {
    response.status(statusCode).json({
      message,
      details,
    })
  }

  public resourceExist = (response: any, details?: string): void => {
    this.responseError(response, 409, 'Resource exist.', details)
  }

  public resourceDoNotExist = (response: any, details?: string): void => {
    this.responseError(response, 404, 'Resource do not exist.', details)
  }

  public badRequest = (response: any, details?: string): void => {
    this.responseError(response, 400, 'Bad request.', details)
  }
}

export default ErrorService
