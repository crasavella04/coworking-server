import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/response-auth.dto';
import { RefreshResponse } from './dto/response-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Логин', tags: ['Authorization'] })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Регистрация', tags: ['Authorization'] })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Post('signup')
  async registration(@Body() dto: CreateUserDto) {
    return await this.authService.registration(dto);
  }

  @ApiOperation({
    summary: 'Обновление токенов',
    description:
      'Получение access и refresh токенов. Refresh токен сразу записывается в куки браузера',
    tags: ['Authorization'],
  })
  @ApiResponse({ status: 200, type: RefreshResponse })
  @Get('refresh')
  async refreshTokens(@Req() request: Request, @Res() response: Response) {
    try {
      const token = request.cookies['refresh'];

      const { refresh, ...restData } = await this.authService.refresh(token);

      response.cookie('refresh', refresh, { httpOnly: true });
      response.send(restData);
    } catch {
      response.status(401).clearCookie('refresh').send('Invalid token');
    }
  }
}
