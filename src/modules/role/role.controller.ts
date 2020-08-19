import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { Role } from "./role.entity";
import { ReadRoleDto } from "./dtos";

@Controller("roles")
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(":id")
  async getRole(@Param("id", ParseIntPipe) id: number): Promise<ReadRoleDto> {
    const role = await this._roleService.get(id);

    return role;
  }

  @Get()
  async getRoles(): Promise<ReadRoleDto[]> {
    const roles = await this._roleService.getAll();

    return roles;
  }

  @Post()
  async createRole(@Body() role: Role): Promise<ReadRoleDto> {
    console.log("Role: ", role);
    const createdRole = await this._roleService.create(role);

    return createdRole;
  }

  @Patch(":id")
  async updateRole(
    @Param("id", ParseIntPipe) id: number,
    @Body() role: Role,
  ): Promise<ReadRoleDto> {
    return await this._roleService.update(id, role);
  }

  @Delete(":id")
  async deleteRole(@Param("id", ParseIntPipe) id: number) {
    return await this._roleService.delete(id);
  }
}
