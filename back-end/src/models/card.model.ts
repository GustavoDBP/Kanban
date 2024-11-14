import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { Column } from './column.model';

@ObjectType()
export class Card {
    @Field((type) => ID)
    id: string;

    @Field()
    title: string;

    @Field(() => Column)
    column: Column;

    @Field({ nullable: true })
    description: string;
}