import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { User } from './interfaces/user.interface'
import { UsersService } from './services/users.service';
import { UserIdPipe } from './pipes/user-id.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { Authing, Roles, AuthUser } from './decorators/common.decortator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }

    @Post('login')
    async login(@Authing() authing) {
        try {
            const result  = await authing.login({
                email: '123@123.com',
                password: '123456'
            });

            return result;

        } catch (err) {
            console.log(err);
            return err
        }
        
    }

    @Get('info')
    @Roles('user')
    async info(@AuthUser() user, @Authing() authing) {
        console.log(user)
        try {
            return await authing.user({
                id: user.data.id
            });

        } catch(err) {
            console.log(err);
        }
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    @Roles('user')
    async findOne(@Param('id', new UserIdPipe()) id): Promise<User> {
        // 创建自己的异常类并继承HttpException或者它的派生类  然后使用异常过滤器来自定义响应格式
        return  await this.usersService.findOne(id)
    }

    @Post() 
    async create(@Body() user: CreateUserDto): Promise<User> {
        return await this.usersService.create(user)
    }

    @Put()
    async edit(@Body() user: CreateUserDto): Promise<User> {
        return await this.usersService.edit(user);
    }

    @Delete(':id')
    async remove(@Param('id', new UserIdPipe) id): Promise<boolean> {
        return await this.usersService.remove(id)
    }


  


}
