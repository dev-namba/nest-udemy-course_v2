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

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id: id })
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
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

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return this.itemsRepository.save(item);
  }

  async delete(id: string): Promise<void> {
    this.itemsRepository.delete(id);
  }
}
