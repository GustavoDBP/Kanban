import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EditColumnInput {
    @Field({ nullable: false })
    id: string;

    @Field({ nullable: false })
    title: string;
}