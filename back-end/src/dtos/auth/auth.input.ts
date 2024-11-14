import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AuthInput {
    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    password: string;
}