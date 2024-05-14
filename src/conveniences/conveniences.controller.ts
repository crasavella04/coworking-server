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
import { ConveniencesService } from './conveniences.service';
import { CreateConvenienceDto } from './dto/create-convenience.dto';
import { UpdateCoworkingConveniencesDto } from './dto/update-coworkingConvenience.dto';
import { Conveniences } from './models/conveniences.model';

@Controller('conveniences')
export class ConveniencesController {
  constructor(private readonly conveniencesService: ConveniencesService) {}

  @ApiOperation({
    summary: 'Получение всех удобств',
    tags: ['Conveniences'],
  })
  @ApiResponse({ status: 200, type: [Conveniences] })
  @Get()
  async getAllConveniences() {
    return await this.conveniencesService.getAllConvenience();
  }

  @ApiOperation({
    summary: 'Получение всех удобств одного коворкинга',
    tags: ['Conveniences'],
  })
  @ApiResponse({ status: 200, type: [Conveniences] })
  @Get('coworking/:coworkingId')
  async getAllCoworkingConvenience(
    @Param('coworkingId', ParseIntPipe) coworkingId: number,
  ) {
    return await this.conveniencesService.getAllCoworkingConvenience(
      coworkingId,
    );
  }

  @ApiOperation({
    summary: 'Создание удобств',
    tags: ['Conveniences'],
  })
  @ApiResponse({ status: 201, type: [Conveniences] })
  @Post()
  async createConvenience(@Body() dto: CreateConvenienceDto) {
    return await this.conveniencesService.createConvenience(dto);
  }

  @ApiOperation({
    summary: 'Изменение удобства по id',
    tags: ['Conveniences'],
  })
  @ApiResponse({ status: 200, type: [Conveniences] })
  @Patch(':id')
  async updateConvenience(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateConvenienceDto,
  ) {
    console.log(id);

    return await this.conveniencesService.updateConvenience(id, dto);
  }

  @ApiOperation({
    summary: 'Добавление удобств коворкингу',
    tags: ['Conveniences'],
  })
  @ApiResponse({ status: 201 })
  @Post('coworking')
  async addCoworkingConveniences(@Body() dto: UpdateCoworkingConveniencesDto) {
    return await this.conveniencesService.addCoworkingConvenience(dto);
  }

  @ApiOperation({
    summary: 'Удаление удобств коворкинга',
    tags: ['Conveniences'],
  })
  @ApiResponse({ status: 201 })
  @Post('coworking/remove')
  async removeCoworkingConveniences(
    @Body() dto: UpdateCoworkingConveniencesDto,
  ) {
    return await this.conveniencesService.removeCoworkingConvenience(dto);
  }
}
