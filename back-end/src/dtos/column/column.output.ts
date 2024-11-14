import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UserOutput } from '../user/user.output';

@ObjectType()
export class ColumnOutput {
    @Field((type) => ID, { nullable: false })
    id: string;

    @Field({ nullable: false })
    title: string;

    @Field(() => UserOutput, { nullable: false })
    owner: UserOutput;
}