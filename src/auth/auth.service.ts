import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { AuthImplements } from './types/auth.implements';

@Injectable()
export class AuthService implements AuthImplements {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login(dto: CreateUserDto) {
    const { email, password } = dto;
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const { password: hashPassword, ...data } = user.dataValues;
    const isValidPassword = await bcrypt.compare(password, hashPassword);

    if (!isValidPassword)
      throw new HttpException('Password is invalid', HttpStatus.CONFLICT);

    const tokens = this.tokenService.createTokens({ id: user.id, email });

    return { user: data as Omit<User, 'password'>, ...tokens };
  }

  async registration(dto: CreateUserDto) {
    const { email, password } = dto;
    const candidiate = await this.userService.getUserByEmail(email);

    if (candidiate)
      throw new HttpException('User already exist', HttpStatus.CONFLICT);

    if (!this.isValidEmail(email))
      throw new HttpException('Email is invalid', HttpStatus.BAD_REQUEST);

    const isValidPassword = this.isValidPassword(password);
    if (isValidPassword !== true)
      throw new HttpException(isValidPassword, HttpStatus.BAD_REQUEST);

    const user = await this.userService.createUser({ email, password });
    const { password: hashPassword, ...data } = user.dataValues;
    const tokens = this.tokenService.createTokens({ id: user.id, email });

    return { user: data as Omit<User, 'password'>, ...tokens };
  }

  async refresh(token: string) {
    const { id, email } = this.tokenService.decodeRefreshToken(token);
    const tokens = this.tokenService.createTokens({ id, email });
    return tokens;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): string | true {
    if (password.length < 8) {
      return 'Пароль должен содержать как минимум 8 символов';
    }

    const digitRegex = /\d/;
    if (!digitRegex.test(password)) {
      return 'Пароль должен содержать как минимум одну цифру';
    }

    const latinRegex = /[a-zA-Z]/;
    if (!latinRegex.test(password)) {
      return 'Пароль должен содержать хотя бы одну латинскую букву';
    }

    return true;
  }
}
