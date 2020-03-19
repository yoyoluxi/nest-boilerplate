import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { IUserService } from '../interfaces/user-service.interface';

@Injectable()
export class UsersService implements IUserService {
    async findAll(): Promise<User[]> {
        return [];
    }

    async findOne(id: number): Promise<User> {
        return {
            id,
            name: '小明',
            age: 18
        };
    }

    async create() {
        
    }

    async edit() {

    }

    async remove() {

    }
}
