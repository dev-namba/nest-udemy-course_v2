import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ItemStatus } from './entity/item-status.enum';
import { CreateItemDto } from './dio/create-item.dio';
import { Item } from './entity/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    const found = this.items.find(item => item.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      id: uuid(),
      ...createItemDto,
      status: ItemStatus.ON_SALE,
      createdAt: undefined,
      updatedAt: undefined
    }
    this.items.push(item);
    return item;
  }

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  delete(id: string): void {
    this.items = this.items.filter((items) => items.id !== id);
  }
}
