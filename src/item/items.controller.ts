import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entity/item.entity';
import { CreateItemDto } from './dio/create-item.dio';


@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }
  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.findById(id);
  }

  @Post()
  create(
    @Body() createItemDto: CreateItemDto,
  ): Item {

    return this.itemsService.create(createItemDto);
  }

  @Patch(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.itemsService.delete(id);
  }
}