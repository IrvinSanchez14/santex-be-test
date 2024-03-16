import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class CoachesResponseDTO {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsString()
  readonly dateOfBirth: string;

  @Field()
  @IsString()
  readonly nationality: string;
}
