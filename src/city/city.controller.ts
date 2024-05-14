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
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './models/city.model';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({
    summary: 'Получение всех городов',
    tags: ['City'],
  })
  @ApiResponse({ status: 200, type: [City] })
  @Get()
  async getAllCities() {
    return await this.cityService.getAllCities();
  }

  @ApiOperation({
    summary: 'Получение города по id',
    tags: ['City'],
  })
  @ApiResponse({ status: 200, type: City })
  @Get(':id')
  async getCityById(@Param('id', ParseIntPipe) id: number) {
    return await this.cityService.getCityById(id);
  }

  @ApiOperation({
    summary: 'Создание города',
    tags: ['City'],
  })
  @ApiResponse({ status: 200, type: City })
  @Post()
  async createCity(@Body() dto: CreateCityDto) {
    return await this.cityService.createCity(dto);
  }

  @ApiOperation({
    summary: 'Обновление города',
    tags: ['City'],
  })
  @Patch(':id')
  async updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCityDto,
  ) {
    return await this.cityService.updateCity(id, dto);
  }
}
