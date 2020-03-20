import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import * as util from 'util'
import { View } from '../libs/View'


@Injectable()
export class ViewInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<any> {
        // 拿到response 对象
        const response = context.switchToHttp().getResponse()

        // 将render 回调函数修改成一个 promisify 然后绑定执行的上下文
        const render = util.promisify(response.render.bind(response))

        // 
        return next.
            handle()
            .pipe(
                map(async value => {
                    if (value instanceof View) {
                        value = await render(value.name, value.data);
                    }
                    return value
                }
            ))
    }
}