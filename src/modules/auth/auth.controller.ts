import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { SignUpDto, SignInDto } from "./dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post("/signup")
  @UsePipes(ValidationPipe)
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this._authService.signUp(signUpDto);
  }

  @Post("/signin")
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this._authService.signIn(signInDto);
  }
}
