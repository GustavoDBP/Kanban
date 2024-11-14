import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column } from './column.model';

@ObjectType()
export class User {
    @Field()
    username: string;

    @Field()
    password: string;

    @Field(() => [Column])
    columns: Column[];
}