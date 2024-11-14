import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/user.module';
import { ColumnModule } from './modules/column.module';
import { AuthModule } from './modules/auth.module';
import { CardModule } from './modules/card.module';

@Module({
  imports: [
    ColumnModule,
    UserModule,
    AuthModule,
    CardModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
  ],
})
export class AppModule { }
