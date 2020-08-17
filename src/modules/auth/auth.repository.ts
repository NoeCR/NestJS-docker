import { Repository, EntityRepository, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import { SignUpDto } from "./dto";
import { RoleRepository } from "../role/role.repository";
import { Role } from "../role/role.entity";
import { RoleType } from "../role/roletype.enum";
import { UserDetails } from "../user/user.details.entity";
import { genSalt, hash } from "bcryptjs";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;
    const user = new User();

    user.username = username;
    user.email = email;

    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );

    // Find valid role GENERAL
    const defaultRole: Role = await roleRepository.findOne(
      { where: { name: RoleType.GENERAL } },
    );
    user.roles = [defaultRole];

    // Create user details
    const details = new UserDetails();
    user.details = details;

    // Generate salt for encryption
    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}
