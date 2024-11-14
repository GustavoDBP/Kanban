import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/services/user.service';
import { NewUserInput } from '../dtos/user/new-user.input';
import { ColumnService } from 'src/services/column.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { UserOutput } from 'src/dtos/user/user.output';
import { GqlAuthGuard } from 'src/auth/gql.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ColumnOutput } from 'src/dtos/column/column.output';

@Resolver(() => UserOutput)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly columnService: ColumnService
    ) { }

    @Mutation((returns) => UserOutput)
    async addNewUser(@Args('newUserDTO') newUserDTO: NewUserInput): Promise<UserOutput> {
        const newUser = await this.userService.addNewUser(newUserDTO);

        return newUser;
    }

    @Query((returns) => UserOutput)
    @UseGuards(GqlAuthGuard)
    async user(@CurrentUser() user: any): Promise<UserOutput> {
        const { username } = user;
        return this.userService.findByUsername(username);
    }

    @ResolveField('columns', () => [ColumnOutput])
    async columns(@Parent() user: UserOutput): Promise<ColumnOutput[]> {
        console.log('columns resolver');

        const columns = await this.columnService.findByUsername(user.username);

        if (!columns) {
            throw new NotFoundException('User not found');
        }

        console.log(columns);

        return columns;
    }
}