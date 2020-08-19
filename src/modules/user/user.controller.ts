import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../role/decorators/role.decorator";
import { RoleGuard } from "../role/guards/role.guard";
import { RoleType } from "../role/roletype.enum";
import { ReadUserDto, UpdateUserDto } from "./dto";

@Controller("users")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(":id")
  @Roles(RoleType.ADMIN, RoleType.USER)
  @UseGuards(AuthGuard(), RoleGuard)
  async getUser(@Param("id", ParseIntPipe) id: number): Promise<ReadUserDto> {
    return await this._userService.get(id);
  }

  @UseGuards(AuthGuard()) // Only for test, use generated token in login process
  @Get()
  async getUsers(): Promise<ReadUserDto[]> {
    return await this._userService.getAll();
  }

  // Deprecated
  // @Post()
  // async createUser(@Body() user: User): Promise<ReadUserDto> {
  //   return await this._userService.create(user);
  // }

  @Patch(":id")
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<ReadUserDto> {
    return await this._userService.update(id, user);
  }

  @Delete(":id")
  async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return await this._userService.delete(id);
  }

  @Post("setRole/:userId/:roleId")
  async setRoleToUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("roleId", ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
