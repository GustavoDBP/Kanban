import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.guard';
import { CardOutput } from 'src/dtos/card/card.output';
import { CardService } from 'src/services/card.service';
import { NewCardInput } from 'src/dtos/card/new-card.input';
import { EditCardInput } from 'src/dtos/card/edit-card.input';
import { DeleteCardInput } from 'src/dtos/card/delete-card.input';

@Resolver(() => CardOutput)
export class CardResolver {
    constructor(
        private readonly columnService: CardService,
    ) { }

    @Mutation((returns) => CardOutput)
    @UseGuards(GqlAuthGuard)
    async addNewCard(@Args('newCard') newCardInput: NewCardInput): Promise<CardOutput> {
        const newColumn = await this.columnService.addNewCard(newCardInput);

        return newColumn;
    }

    @Mutation((returns) => CardOutput)
    @UseGuards(GqlAuthGuard)
    async editCard(@Args('editCard') editCardInput: EditCardInput): Promise<CardOutput> {
        const editedCard = await this.columnService.editCard(editCardInput);

        return editedCard;
    }

    @Mutation((returns) => Boolean)
    @UseGuards(GqlAuthGuard)
    async deleteCard(@Args('card') card: DeleteCardInput): Promise<boolean> {
        return this.columnService.deleteCard(card);
    }
}