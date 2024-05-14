import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coworking } from 'src/coworking/models/coworking.model';
import { ContactType } from '../../contact-type/models/contact-type.model';

class CoworkingContactsCreate {
  value: string;
  typeId: number;
  coworkingId: number;
}

@Table({
  tableName: 'coworking-contacts',
  createdAt: false,
  updatedAt: false,
})
export class CoworkingContacts extends Model<
  CoworkingContacts,
  CoworkingContactsCreate
> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Екатерина Мизулина' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @ApiProperty({ example: '+79998000999' })
  @Column({
    type: DataType.STRING,
  })
  value: string;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Coworking)
  @Column({
    type: DataType.INTEGER,
  })
  coworkingId: number;

  @BelongsTo(() => Coworking)
  coworking: Coworking;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => ContactType)
  @Column({
    type: DataType.INTEGER,
  })
  typeId: number;

  @BelongsTo(() => ContactType)
  type: ContactType;
}
