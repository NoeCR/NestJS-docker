import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "../../../config/config.service";
import { Configuration } from "../../../config/config.keys";
import { AuthRepository } from "../auth.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { Status } from "../../../shared/entity-status.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository) private readonly _authRepository:
      AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { email } = payload;
    const user = this._authRepository.findOne(
      { where: { email: email, status: Status.ACTIVE } },
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
