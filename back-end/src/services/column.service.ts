import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Column } from 'src/models/column.model';
import { NewColumnInput } from 'src/dtos/column/new-column.input';
import { UserService } from './user.service';
import { EditColumnInput } from 'src/dtos/column/edit-column.input';
import { DeleteColumnInput } from 'src/dtos/column/delete-column.input';
import { CardService } from './card.service';

@Injectable()
export class ColumnService {
    private columns: Column[];

    constructor(
        private readonly userService: UserService,
    ) {
        this.columns = [];
    }

    async findOneById(id: string): Promise<Column> {
        const column = this.columns.find((u) => u.id === id);
        return column;
    }

    async getAllColumns(): Promise<Column[]> {
        return this.columns;
    }

    async findByUsername(username: string): Promise<Column[]> {
        const columns = this.columns.filter((c) => c.owner.username === username);
        return columns;
    }

    async addNewColumn(column: NewColumnInput, ownerUsername: string): Promise<Column> {
        const user = await this.userService.findByUsername(ownerUsername);
        if (!user) {
            throw new Error('User not found');
        }

        const newColumn: Column = {
            id: randomUUID(),
            ...column,
            owner: user,
            cards: [],
        };
        this.columns.push(newColumn);

        return newColumn;
    }

    async editColumn(column: EditColumnInput): Promise<Column> {
        const columnIndex = this.columns.findIndex((c) => c.id === column.id);
        if (columnIndex === -1) {
            throw new Error('Column not found');
        }

        this.columns[columnIndex] = {
            ...this.columns[columnIndex],
            title: column.title
        };

        return this.columns[columnIndex];
    }

    async deleteColumn(column: DeleteColumnInput): Promise<boolean> {
        const columnIndex = this.columns.findIndex((c) => c.id === column.id);
        if (columnIndex === -1) {
            throw new Error('Column not found');
        }
        
        this.columns.splice(columnIndex, 1);

        return true;
    }
}