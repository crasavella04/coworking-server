import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/models/user.model';

interface IAuth {
  user: Omit<User, 'password'>;
  access: string;
  refresh: string;
}

export interface AuthImplements {
  login: (dto: CreateUserDto) => Promise<IAuth>;
  registration: (dto: CreateUserDto) => Promise<IAuth>;
  refresh: (refresh: string) => Promise<{ access: string; refresh: string }>;
}
