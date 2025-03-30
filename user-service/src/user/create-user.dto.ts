import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
