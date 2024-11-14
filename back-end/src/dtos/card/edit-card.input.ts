import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EditCardInput {
    @Field({ nullable: false })
    id: string;

    @Field({ nullable: false })
    title: string;

    @Field({ nullable: false })
    columnId: string;

    @Field({ nullable: true })
    description: string;
}