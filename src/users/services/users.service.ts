import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { IUserService } from '../interfaces/user-service.interface';

@Injectable()
export class UsersService implements IUserService {
    private static users: User[] = [
        { id: 1, name: '小明', age: 18 },
        { id: 2, name: '小红', age: 16 },
        { id: 3, name: '小壮', age: 20 },
    ];


    async findAll(): Promise<User[]> {
        return UsersService.users;
    }

    async findOne(id: number): Promise<User> {
        return UsersService.users.find(user => user.id === id);
    }

    async create(user: User) {
        UsersService.users.push(user);
        return user; 
    }

    async edit(user: User) {
        const index = UsersService.users.findIndex(item => item.id === user.id);
        return user;
    }

    async remove(id: number) {
        const index = UsersService.users.findIndex(user => user.id === id);
        const isExist = index >= 0
        
        if (isExist) {
            UsersService.users.splice(index, 1)
        }

        return isExist;
    }
}
