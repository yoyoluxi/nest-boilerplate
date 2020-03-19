import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus()


    if (exception instanceof ApiException) {
       return response
                .status(status)
                .json({
                  errorCode: exception.getErrorCode(),
                  errorMessage: exception.getErrorMessage(),
                  date: new Date().toLocaleDateString(),
                  path: request.url
                })
    } 
    return response
      .status(status)
      .json({
        statusCode: status,
        date: new Date().toLocaleDateString(),
        path: request.url
      })
  }
}
