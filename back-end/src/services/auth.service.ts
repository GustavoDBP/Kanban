import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { compare } from 'bcrypt';
import { AuthOutput } from "src/dtos/auth/auth.output";
import { UserOutput } from "src/dtos/user/user.output";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<UserOutput | null> {
        const user = await this.usersService.findByUsername(username);
        return user && await compare(pass, user.password) ? user : null;
    }

    async login(username: string): Promise<AuthOutput> {
        const payload = { username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}