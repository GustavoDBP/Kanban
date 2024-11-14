import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewColumnInput {
    @Field({ nullable: false })
    title: string;
}