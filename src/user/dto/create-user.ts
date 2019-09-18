import { IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  readonly username: string;
}
