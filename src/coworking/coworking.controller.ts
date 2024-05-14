import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CoworkingService } from './coworking.service';
import { CreateCoworkingDto } from './dto/create-coworking.dto';
import { GetCoworkingResponse } from './dto/get-coworkingResponse.dto';
import { getPageCoworkingResponse } from './dto/getPage-coworkingResponse.dto';

@Controller('coworking')
export class CoworkingController {
  constructor(private readonly coworkingService: CoworkingService) {}

  @ApiOperation({
    summary: 'Получение страницы коворкинга',
    tags: ['Coworking'],
  })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: GetCoworkingResponse })
  @Get(':id')
  async getCoworkingItem(@Param('id', ParseIntPipe) id: number) {
    return this.coworkingService.getCoworkingById(id);
  }

  @ApiOperation({
    summary: 'Получение списка коворкингов',
    tags: ['Coworking'],
  })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'cityId', required: false, example: 1 })
  @ApiQuery({ name: 'metroId', required: false, example: 1 })
  @ApiQuery({ name: 'text', required: false, example: 1 })
  @ApiQuery({ name: 'conveniencesId', required: false, example: 1 })
  @ApiQuery({ name: 'methodSort', required: false, example: 1 })
  @ApiResponse({ status: 200, type: getPageCoworkingResponse })
  @Get()
  async getCoworkingPage(
    @Query('page') pageQuery?: string,
    @Query('limit') limitQuery?: string,
    @Query('cityId') cityId?: string,
    @Query('metroId') metroId?: string,
    @Query('text') text?: string,
    @Query('conveniencesId') conveniencesId?: string,
    @Query('methodSort') methodSort?: string,
  ) {
    const filter = {
      limit: parseInt(limitQuery, 10) || 1,
      page: parseInt(pageQuery, 10) || 1,
      cityId: cityId ? parseInt(cityId, 10) : null,
      metroId: metroId ? parseInt(metroId, 10) : null,
      text,
      conveniencesId: conveniencesId ? parseInt(conveniencesId, 10) : null,
      methodSort,
    };

    return await this.coworkingService.getPageCoworkings(filter);
  }

  @ApiOperation({ summary: 'Создание коворкинга', tags: ['Coworking'] })
  @ApiResponse({ type: GetCoworkingResponse })
  @Post()
  async createCoworking(
    @Headers('authorization') token: string,
    @Body() dto: CreateCoworkingDto,
  ) {
    return await this.coworkingService.createCoworking(token, dto);
  }
}
