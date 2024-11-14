import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteCardInput {
    @Field({ nullable: false })
    id: string;
}