import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto, SignInDto } from "./dto";
import { User } from "../user/user.entity";
import { compare } from "bcryptjs";
import { IJwtPayload } from "./interfaces/jwt-payload.interface";
import { RoleType } from "../role/roletype.enum";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private readonly _authRepository:
      AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, email } = signUpDto;
    const userExists = await this._authRepository.findOne(
      { where: [{ email }, { username }] },
    );

    if (userExists) {
      throw new ConflictException("username or email already exists");
    }

    return this._authRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    const user: User = await this._authRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException("user not found");
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("invalid credentials");
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles.map((r) => r.name as RoleType),
    };

    const token = await this._jwtService.sign(payload);

    return { token };
  }
}
