import { IsNumber, IsEmail, IsString } from "class-validator";
import { ReadUserDetailDto } from "./read-user-details.dto";
import { Type, Exclude, Expose } from "class-transformer";
import { ReadRoleDto } from "../../../modules/role/dtos";

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @Type(() => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @Expose()
  @Type(() => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
