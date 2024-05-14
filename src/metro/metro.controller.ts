import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMetroDto } from './dto/create-metro.dto';
import { UpdateMetroDto } from './dto/update-metro.dto';
import { MetroService } from './metro.service';
import { Metro } from './models/metro.model';

@Controller('metro')
export class MetroController {
  constructor(private readonly metroService: MetroService) {}

  @ApiOperation({
    summary: 'Получение всех станций метро',
    tags: ['Metro'],
  })
  @ApiResponse({ status: 200, type: [Metro] })
  @Get()
  async getAllMetro() {
    return await this.metroService.getAllMetro();
  }

  @ApiOperation({
    summary: 'Получение всех станций в конкретном городе',
    tags: ['Metro'],
  })
  @ApiResponse({ status: 200, type: [Metro] })
  @Get('city/:cityId')
  async getAllMetroByCityId(@Param('cityId', ParseIntPipe) cityId: number) {
    return await this.metroService.getAllMetroByCityId(cityId);
  }

  @ApiOperation({
    summary: 'Получение станции по id',
    tags: ['Metro'],
  })
  @ApiResponse({ status: 200, type: Metro })
  @Get(':id')
  async getMetroById(@Param('id', ParseIntPipe) id: number) {
    return await this.metroService.getMetroById(id);
  }

  @ApiOperation({
    summary: 'Создание станции метро',
    tags: ['Metro'],
  })
  @ApiResponse({ status: 200, type: Metro })
  @Post()
  async createMetro(@Body() dto: CreateMetroDto) {
    return await this.metroService.createMetro(dto);
  }

  @ApiOperation({
    summary: 'Изменение станции метро',
    tags: ['Metro'],
  })
  @ApiResponse({ status: 200, type: Metro })
  @Patch(':id')
  async updateMetro(
    @Body() dto: UpdateMetroDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.metroService.updateMetro(id, dto);
  }
}
