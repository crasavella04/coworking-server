import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { ContactsTypeCreateDto } from 'src/contact-type/dto/create-type.dto';
import { ContactTypeService } from './contact-type.service';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ContactType } from './models/contact-type.model';

@Controller('contact-type')
export class ContactTypeController {
  constructor(private readonly contactTypeService: ContactTypeService) {}

  @ApiOperation({
    summary: 'Получение всех типов контактов',
    tags: ['Contact Type'],
  })
  @ApiResponse({ status: 200, type: [ContactType] })
  @Get()
  async getAllTypes() {
    return await this.contactTypeService.getAllTypes();
  }

  @ApiOperation({ summary: 'Создание типа контакта', tags: ['Contact Type'] })
  @ApiResponse({ status: 200, type: ContactType })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          format: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('logo'))
  @Post()
  async createContactsType(
    @Body() dto: ContactsTypeCreateDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.contactTypeService.createType(dto, logo);
  }

  @ApiOperation({ summary: 'Изменение типа контакта', tags: ['Contact Type'] })
  @ApiResponse({ status: 200, type: ContactType })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          format: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('logo'))
  @Patch(':id')
  async updateContactsType(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTypeDto,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return await this.contactTypeService.updateType(id, dto, logo);
  }

  @ApiOperation({ summary: 'Удаление типов контактов', tags: ['Contact Type'] })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async deleteContactsType(@Param('id', ParseIntPipe) id: number) {
    return await this.contactTypeService.removeType(id);
  }
}
