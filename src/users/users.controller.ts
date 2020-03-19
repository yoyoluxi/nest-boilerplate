import { Controller, Get, Query, Res, Param, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { User } from './interfaces/user.interface'
import { UsersService } from './services/users.service';
import { ApiErrorCode } from '../common/enums/api-error-code.enum'
import { ApiException } from 'src/common/exceptions/api.exception';
import { UserIdPipe } from './pipes/user-id.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }


    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id', new UserIdPipe()) id): Promise<User> {
        // 创建自己的异常累并继承HttpException或者它的派生类  然后使用异常过滤器来自定义响应格式
        return await this.usersService.findOne(id)
    }
}
