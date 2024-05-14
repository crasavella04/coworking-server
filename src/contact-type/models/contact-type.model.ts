import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CoworkingContacts } from '../../coworking_contacts/models/coworking-contact.model';

class ContactsTypeCreate {
  value: string;
  title: string;
  logo: string;
}

@Table({
  tableName: 'contact-type',
  createdAt: false,
  updatedAt: false,
})
export class ContactType extends Model<ContactType, ContactsTypeCreate> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '#' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo: string;

  @ApiProperty({ example: 'email' })
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @HasMany(() => CoworkingContacts)
  contacts: CoworkingContacts[];
}
