import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ColumnOutput } from '../column/column.output';

@ObjectType()
export class CardOutput {
    @Field((type) => ID, { nullable: false })
    id: string;

    @Field({ nullable: false })
    title: string;

    @Field(() => ColumnOutput, { nullable: false })
    column: ColumnOutput;

    @Field({ nullable: true })
    description: string;
}