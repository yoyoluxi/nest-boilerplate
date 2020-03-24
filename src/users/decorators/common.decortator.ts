import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Roles = (...roles: string[]) => SetMetadata('roles', roles)

// export const Authing = createParamDecorator((data, req) => {
//     return req.authing;
// })

export const Authing = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.authing
  });

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest()

    let token = request.query.token || null;
    
    !token && (token = request.body.token);
    console.log(request.authing.decodeToken(token))
    return request.authing.decodeToken(token);
})
