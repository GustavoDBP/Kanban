import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { ColumnService } from 'src/services/column.service';
import { NewColumnInput } from 'src/dtos/column/new-column.input';
import { GqlAuthGuard } from 'src/auth/gql.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserService } from 'src/services/user.service';
import { UserOutput } from 'src/dtos/user/user.output';
import { ColumnOutput } from 'src/dtos/column/column.output';
import { CardOutput } from 'src/dtos/card/card.output';
import { CardService } from 'src/services/card.service';
import { EditColumnInput } from 'src/dtos/column/edit-column.input';
import { DeleteColumnInput } from 'src/dtos/column/delete-column.input';

@Resolver(() => ColumnOutput)
export class ColumnResolver {
    constructor(
        private readonly columnService: ColumnService,
        private readonly userService: UserService,
        private readonly cardService: CardService
    ) { }

    @Query(() => [ColumnOutput])
    @UseGuards(GqlAuthGuard)
    async columns(@CurrentUser() user: any): Promise<ColumnOutput[]> {
        const { username } = user;

        const columns = await this.columnService.findByUsername(username);

        return columns;
    }

    @Mutation((returns) => ColumnOutput)
    @UseGuards(GqlAuthGuard)
    async addNewColumn(@Args('newColumn') newColumnInput: NewColumnInput, @CurrentUser() user: any): Promise<ColumnOutput> {
        const { username } = user;

        const newColumn = await this.columnService.addNewColumn(newColumnInput, username);

        return newColumn;
    }

    @Mutation(() => ColumnOutput)
    @UseGuards(GqlAuthGuard)
    async editColumn(@Args('column') column: EditColumnInput): Promise<ColumnOutput> {
        const editedColumn = await this.columnService.editColumn(column);

        return editedColumn;
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async deleteColumn(@Args('column') column: DeleteColumnInput): Promise<boolean> {
        await this.cardService.deleteCardsByColumnId(column.id);

        return this.columnService.deleteColumn(column);
    }

    @ResolveField(() => UserOutput)
    async owner(@Parent() column: ColumnOutput): Promise<UserOutput> {
        const user = await this.userService.findByUsername(column.owner.username);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    @ResolveField(() => [CardOutput])
    async cards(@Parent() column: ColumnOutput): Promise<CardOutput[]> {
        const cards = await this.cardService.findByColumnId(column.id);

        return cards;
    }

}