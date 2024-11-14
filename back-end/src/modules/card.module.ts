import { forwardRef, Module } from '@nestjs/common';
import { CardResolver } from 'src/resolvers/card.resolver';
import { CardService } from 'src/services/card.service';
import { ColumnModule } from './column.module';

@Module({
    providers: [CardResolver, CardService],
    exports: [CardService],
    imports: [forwardRef(() => ColumnModule)]
})
export class CardModule { }