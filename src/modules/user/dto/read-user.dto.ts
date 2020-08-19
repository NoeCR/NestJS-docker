import { IsNumber, IsEmail, IsString } from "class-validator";
import { ReadUserDetailDto } from "./read-user-details.dto";
import { Type } from "class-transformer";

export class ReadUserDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @Type(() => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;
}
