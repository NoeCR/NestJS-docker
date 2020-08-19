import { IsNotEmpty } from "class-validator";
import { RoleType } from "../../role/roletype.enum";
import { UserDetails } from "../user.details.entity";

export class UserDto {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly roles: RoleType[];

  @IsNotEmpty()
  readonly details: UserDetails;
}
