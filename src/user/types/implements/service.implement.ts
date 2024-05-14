import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/models/user.model';

export interface UserServiceImplements {
  createUser: (dto: CreateUserDto) => Promise<User>;
  getUserById: (id: number) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;
  updateUser: (
    token: string,
    dto: UpdateUserDto,
    avatar: Express.Multer.File,
  ) => Promise<Partial<User>>;
}
