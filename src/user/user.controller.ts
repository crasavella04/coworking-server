import {
  Body,
  Controller,
  Headers,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Изменение пользователя', tags: ['User'] })
  @ApiResponse({ status: 200, type: User })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
          format: 'string',
        },
      },
    },
  })
  // @UseGuards(JwtAuthGuard)
  @Patch()
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUser(
    @Headers('authorization') token: string,
    @Body() data: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    if (avatar) return await this.userService.updateUser(token, data, avatar);

    return await this.userService.updateUser(token, data);
  }
}
