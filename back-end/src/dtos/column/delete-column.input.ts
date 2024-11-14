import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteColumnInput {
    @Field({ nullable: false })
    id: string;
}