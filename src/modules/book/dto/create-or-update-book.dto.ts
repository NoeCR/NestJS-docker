import { IsString, MaxLength, IsArray } from "class-validator";
import { User } from "src/modules/user/user.entity";

export class CreateOrUpdateBookDto {
  @IsString()
  @MaxLength(100, { message: "This title is not valid" })
  readonly title: string;

  @IsString()
  @MaxLength(500, { message: "This description is not valid" })
  description: string;

  @IsArray()
  authors: User[];
}
