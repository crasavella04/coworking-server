import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coworking } from 'src/coworking/models/coworking.model';
import { FavoriteCoworkings } from 'src/favorite-coworkings/models/favoriteCoworkings.model';
import { CreateUserDto } from '../dto/create-user.dto';
// import { Coworking } from './other-models/coworking.model';
// import { FavoriteCoworkings } from './other-models/favoriteCoworkings.model';

@Table({
  tableName: 'user',
  createdAt: false,
  updatedAt: false,
})
export class User extends Model<User, CreateUserDto> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Никита', required: false, nullable: true })
  @Column({
    type: DataType.STRING(40),
    allowNull: true,
  })
  name: string;

  @ApiProperty({ example: 'user@mail.ru' })
  @Column({
    type: DataType.STRING(80),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'link', required: false, nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @BelongsToMany(() => Coworking, () => FavoriteCoworkings)
  favoriteCoworkings: Coworking[];
}
