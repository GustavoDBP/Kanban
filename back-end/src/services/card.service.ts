import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Card } from 'src/models/card.model';
import { NewCardInput } from 'src/dtos/card/new-card.input';
import { ColumnService } from './column.service';
import { EditCardInput } from 'src/dtos/card/edit-card.input';
import { DeleteCardInput } from 'src/dtos/card/delete-card.input';

@Injectable()
export class CardService {
    private cards: Card[];

    constructor(
        @Inject() private readonly columnService: ColumnService
    ) {
        this.cards = [];
    }

    async findOneById(id: string): Promise<Card> {
        const card = this.cards.find((u) => u.id === id);
        return card;
    }

    async findByColumnId(columnId: string): Promise<Card[]> {
        const cards = this.cards.filter((c) => c.column.id === columnId);
        return cards;
    }

    async addNewCard(card: NewCardInput): Promise<Card> {
        const column = await this.columnService.findOneById(card.columnId);
        if (!column) {
            throw new Error('Column not found');
        }

        const newCard: Card = {
            id: randomUUID(),
            column: column,
            title: card.title,
            description: card.description
        };
        this.cards.push(newCard);

        return newCard;
    }

    async editCard(card: EditCardInput): Promise<Card> {
        const cardIndex = this.cards.findIndex((c) => c.id === card.id);
        if (cardIndex === -1) {
            throw new Error('Card not found');
        }

        const column = await this.columnService.findOneById(card.columnId);
        if (!column) {
            throw new Error('Column not found');
        }

        this.cards[cardIndex] = {
            ...this.cards[cardIndex],
            title: card.title,
            description: card.description,
            column: column
        };

        return this.cards[cardIndex];
    }

    async deleteCard(card: DeleteCardInput): Promise<boolean> {
        const cardIndex = this.cards.findIndex((c) => c.id === card.id);
        if (cardIndex === -1) {
            throw new Error('Card not found');
        }

        this.cards.splice(cardIndex, 1);

        return true;
    }

    async deleteCardsByColumnId(columnId: string): Promise<boolean> {
        const cards = this.cards.filter((c) => c.column.id === columnId);
        cards.forEach((c) => {
            const cardIndex = this.cards.findIndex((card) => card.id === c.id);
            this.cards.splice(cardIndex, 1);
        });

        return true;
    }
}