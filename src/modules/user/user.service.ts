import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Status } from "../../shared/entity-status.enum";
import { User } from "./user.entity";
import { UserDetails } from "./user.details.entity";
import { getConnection } from "typeorm";
import { Role } from "../role/role.entity";
import { RoleRepository } from "../role/role.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly _userRepository:
      UserRepository,
    @InjectRepository(RoleRepository) private readonly _roleRepository:
      RoleRepository,
  ) {}

  async get(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException("id must be send");
    }

    const user: User = await this._userRepository.findOne(
      id,
      { where: { status: Status.ACTIVE } },
    );

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.find(
      { where: { status: Status.ACTIVE } },
    );

    return users;
  }

  async create(user: User): Promise<User> {
    const details = new UserDetails();
    user.details = details;

    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({ where: { name: "GENERAL" } });

    user.roles = [defaultRole];

    const savedUser = await this._userRepository.save(user);

    return savedUser;
  }

  async update(id: number, user: User): Promise<void> {
    await this._userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const user: User | void = await this._userExists(id);
    if (!user) {
      throw new NotFoundException();
    }

    await this._userRepository.update(id, { status: Status.INACTIVE });
  }

  async setRoleToUser(userId: number, roleId: number): Promise<void> {
    const user: User | void = await this._userExists(userId);
    if (!user) {
      throw new NotFoundException();
    }

    const role: Role = await this._roleRepository.findOne(roleId);
    if (!role) {
      throw new NotFoundException("role not found");
    }

    user.roles.push(role);
    await this._userRepository.save(user);
  }

  async _userExists(id: number): Promise<User | void> {
    return await this._userRepository.findOne(
      id,
      { where: { status: Status.ACTIVE } },
    );
  }
}
