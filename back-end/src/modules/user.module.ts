import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from '../resolvers/user.resolver';
import { UserService } from 'src/services/user.service';
import { ColumnModule } from './column.module';

@Module({
    providers: [UserResolver, UserService, ColumnModule],
    exports: [UserService],
    imports: [forwardRef(() => ColumnModule)]
})
export class UserModule { }