import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemStatus } from './entity/item-status.enum';
import { CreateItemDto } from './dio/create-item.dio';
import { Item } from './entity/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) { }

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

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = createItemDto;

    const item = this.itemsRepository.create({
      name: name,
      price: price,
      description: description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return this.itemsRepository.save(item);
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
