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
import { CoworkingPriceService } from './coworking-price.service';
import { CreateCoworkingPriceDto } from './dto/create-price.dto';
import { UpdateCoworkingPriceDto } from './dto/update-price.dto';
import { CoworkingPrice } from './models/coworking-price.model';

@Controller('coworking-price')
export class CoworkingPriceController {
  constructor(private readonly coworkingPriceService: CoworkingPriceService) {}

  @ApiOperation({
    summary: 'Получение стоимости услуги по id',
    tags: ['Coworking Price'],
  })
  @ApiResponse({ status: 200, type: CoworkingPrice })
  @Get(':id')
  async getPriceById(@Param('id', ParseIntPipe) id: number) {
    return await this.coworkingPriceService.getCoworkingPriceById(id);
  }

  @ApiOperation({
    summary: 'Получение стоимости услуг по id коворкинга',
    tags: ['Coworking Price'],
  })
  @ApiResponse({ status: 200, type: [CoworkingPrice] })
  @Get('coworking/:id')
  async getAllPricesByCoworkingId(@Param('id', ParseIntPipe) id: number) {
    return await this.coworkingPriceService.getAllCoworkingPrices(id);
  }

  @ApiOperation({
    summary: 'Создание услуги',
    tags: ['Coworking Price'],
  })
  @ApiResponse({ status: 201, type: CoworkingPrice })
  @Post()
  async createCoworkingPrice(@Body() dto: CreateCoworkingPriceDto) {
    return await this.coworkingPriceService.createCoworkingPrice(dto);
  }

  @ApiOperation({
    summary: 'Редактирование услуги',
    tags: ['Coworking Price'],
  })
  @ApiResponse({ status: 200, type: CoworkingPrice })
  @Patch(':id')
  async updateCoworkingPrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCoworkingPriceDto,
  ) {
    return await this.coworkingPriceService.updateCoworkingPrice(id, dto);
  }

  @ApiOperation({
    summary: 'Удаление услуги',
    tags: ['Coworking Price'],
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async deleteCoworkingPrice(@Param('id', ParseIntPipe) id: number) {
    return await this.coworkingPriceService.deleteCoworkingPrice(id);
  }
}
