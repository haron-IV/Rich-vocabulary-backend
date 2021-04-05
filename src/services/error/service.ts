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
}

export default ErrorService
