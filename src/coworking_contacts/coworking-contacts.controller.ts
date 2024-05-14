import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoworkingContactsService } from './coworking-contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CoworkingContacts } from './models/coworking-contact.model';

@Controller('coworking-contacts')
export class CoworkingContactsController {
  constructor(
    private readonly coworkingContactsService: CoworkingContactsService,
  ) {}

  @ApiOperation({
    summary: 'Получение контакта по id',
    tags: ['Contacts'],
  })
  @ApiResponse({ status: 200, type: CoworkingContacts })
  @Get(':id')
  async getContactById(@Param('id', ParseIntPipe) id: number) {
    return await this.coworkingContactsService.getContactById(id);
  }

  @ApiOperation({
    summary: 'Получение контактов по id коворкинга',
    tags: ['Contacts'],
  })
  @ApiResponse({ status: 200, type: [CoworkingContacts] })
  @Get('coworking/:coworkingId')
  async getContactByCoworkingId(
    @Param('coworkingId', ParseIntPipe) coworkingId: number,
  ) {
    return await this.coworkingContactsService.getContactsByCoworkingId(
      coworkingId,
    );
  }

  @ApiOperation({
    summary: 'Создание контакта',
    tags: ['Contacts'],
  })
  @ApiResponse({ status: 201, type: CoworkingContacts })
  @Post()
  async createContact(@Body() dto: CreateContactDto) {
    return await this.coworkingContactsService.createContact(dto);
  }

  @ApiOperation({
    summary: 'Изменение контакта',
    tags: ['Contacts'],
  })
  @ApiResponse({ status: 200, type: CoworkingContacts })
  @Patch(':id')
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactDto,
  ) {
    return await this.coworkingContactsService.updateContact(id, dto);
  }

  @ApiOperation({
    summary: 'Удаление контакта',
    tags: ['Contacts'],
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async removeContact(@Param('id', ParseIntPipe) id: number) {
    return await this.coworkingContactsService.removeContact(id);
  }
}
