import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.schema';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Service | null> {
    return this.servicesService.findById(id);
  }

  @Post()
  async create(@Body() servicesData: Service): Promise<Service> {
    return this.servicesService.create(servicesData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() servicesData: Service,
  ): Promise<Service | null> {
    return this.servicesService.update(id, servicesData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.servicesService.remove(id);
  }
}
