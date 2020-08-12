import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  async getUser(@Param() id: number): Promise<UserDto> {
    const user = await this._userService.get(id);

    return user;
  }

  @Get()
  async getUsers(): Promise<UserDto[]> {
    const users = await this._userService.getAll();

    return users;
  }

  @Post()
  async createUser(@Body() user: User): Promise<UserDto> {
    const createdUser = await this._userService.create(user);

    return createdUser;
  }

  @Patch()
  async updateUser(@Param() id: number, @Body() user: User): Promise<void> {
    await this._userService.update(id, user);
    // return updatedUser;
  }

  @Delete()
  async deleteUser(@Param() id: number): Promise<void> {
    await this._userService.delete(id);
    // return updatedUser;
  }
}
