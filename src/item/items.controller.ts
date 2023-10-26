import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entity/item.entity';
import { CreateItemDto } from './dio/create-item.dio';


@Controller('items')
export class ItemsController {
  constructor(@Inject(ItemsService) private readonly itemsService: ItemsService) { }
  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.findById(id);
  }

  @Post()
  async create(
    @Body() createItemDto: CreateItemDto,
  ): Promise<void> {
    await this.itemsService.create(createItemDto);
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
