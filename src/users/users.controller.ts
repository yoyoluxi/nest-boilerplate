import { Controller, Get, Query, Res, Param, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface'
import { UsersService } from './services/users.service';
import { ApiErrorCode } from '../common/enums/api-error-code.enum'
import { ApiException } from 'src/common/exceptions/api.exception';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }


    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    async findOne(@Res() res, @Param() params): Promise<User> {
        let id = params.id
        if (typeof id != 'number' || id <= 0) {
            throw new ApiException('用户ID无效', ApiErrorCode.USER_ID_INVALID, HttpStatus.BAD_REQUEST)
        }
        // 创建自己的异常累并继承HttpException或者它的派生类  然后使用异常过滤器来自定义响应格式
        return await this.usersService.findOne(id)
    }
}
