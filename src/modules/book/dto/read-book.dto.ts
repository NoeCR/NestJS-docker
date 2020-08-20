import { IsNumber, IsEmail, IsString } from "class-validator";
import { ReadUserDto } from "../../user/dto/read-user.dto";
import { Type, Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadBookDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly title: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @Type(() => ReadUserDto)
  readonly authors: ReadUserDto;

  @Expose()
  @IsString()
  readonly status: string;
}
