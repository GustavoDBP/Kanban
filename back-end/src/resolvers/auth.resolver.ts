import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthInput } from 'src/dtos/auth/auth.input';
import { AuthOutput } from 'src/dtos/auth/auth.output';
import { AuthService } from 'src/services/auth.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthOutput)
    async login(@Args('authInput') authInput: AuthInput) {
        const user = await this.authService.validateUser(authInput.username, authInput.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user.username);
    }
}