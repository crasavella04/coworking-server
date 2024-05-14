import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { ImageService } from 'src/image/image.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { UserServiceImplements } from './types/implements/service.implement';

@Injectable()
export class UserService implements UserServiceImplements {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly imageService: ImageService,
    private readonly tokenService: TokenService,
  ) {}
  // updateUser: (userId: number, dto: UpdateUser) => Promise<User>;

  async createUser(dto: CreateUserDto) {
    try {
      const candidate = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (candidate)
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      const hashPassword = await bcrypt.hash(dto.password, 7);
      const user = await this.userRepository.create({
        ...dto,
        password: hashPassword,
      });

      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    return user;
  }

  async updateUser(
    token: string,
    dto: UpdateUserDto,
    avatar?: Express.Multer.File,
  ) {
    const { id } = this.tokenService.decodeAccessToken(token.split(' ')[1]);
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    let avatarUrl = null;

    if (avatar) {
      if (user.avatar) await this.imageService.deleteImg(user.avatar);
      avatarUrl = await this.imageService.addImg(avatar);
    }

    const data = { ...dto, avatar: avatarUrl };
    await this.userRepository.update(data, { where: { id } });

    const { password, ...updatedUser } = (
      await this.userRepository.findOne({
        where: { id },
      })
    ).dataValues;

    return updatedUser;
  }
}
