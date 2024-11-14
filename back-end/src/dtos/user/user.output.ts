import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ColumnOutput } from '../column/column.output';

@ObjectType()
export class UserOutput {
    @Field((type) => ID, { nullable: false })
    username: string;

    @Field(() => [ColumnOutput], { nullable: false })
    columns: ColumnOutput[];
}