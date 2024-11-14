import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { NewUserInput } from 'src/dtos/user/new-user.input';
import { hash } from 'bcrypt';
import { UserOutput } from 'src/dtos/user/user.output';

@Injectable()
export class UserService {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async findByUsername(username: string): Promise<User> {
        const user = this.users.find((u) => u.username === username);
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }

    async addNewUser(user: NewUserInput): Promise<UserOutput> {
        if (await this.findByUsername(user.username)) {
            throw new Error('Username already exists');
        }

        const newUser: User = {
            ...user,
            password: await hash(user.password, 10),
            columns: [],
        };

        this.users.push(newUser);

        const userOutput: UserOutput = {
            username: newUser.username,
            columns: []
        };

        return userOutput;
    }
}