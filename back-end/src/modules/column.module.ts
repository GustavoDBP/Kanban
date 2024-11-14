import { forwardRef, Module } from '@nestjs/common';
import { ColumnResolver } from 'src/resolvers/column.resolver';
import { ColumnService } from 'src/services/column.service';
import { UserModule } from './user.module';
import { CardModule } from './card.module';

@Module({
    providers: [ColumnResolver, ColumnService],
    exports: [ColumnService],
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => CardModule)
    ]
})
export class ColumnModule { }