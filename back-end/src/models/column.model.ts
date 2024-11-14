import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { Card } from './card.model';

@ObjectType()
export class Column {
    @Field((type) => ID)
    id: string;

    @Field()
    title: string;

    @Field(() => User)
    owner: User;

    @Field(()=>[Card])
    cards: Card[];
}