import { Injectable } from '@nestjs/common';
import { CostumerEntity } from 'src/costumer/domain/model/costumer.entity';
import { ICostumerRepository } from 'src/costumer/domain/outboundPorts/costumer-repository.interface';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateCostumerDTO } from '../model/create-costumer.dto';
import { UpdateCostumerDTO } from '../model/update-costumer.dto';

@Injectable()
export class CostumerRepository implements ICostumerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(costumerDTO: CreateCostumerDTO): Promise<CostumerEntity> {
    return await this.prisma.costumer.create({ data: costumerDTO });
  }

  async list(): Promise<CostumerEntity[]> {
    const costumers = await this.prisma.costumer.findMany();
    return costumers.map((costumer) => new CostumerEntity(costumer));
  }

  async retrieve(id: number): Promise<CostumerEntity> {
    const costumer = await this.prisma.costumer.findUnique({
      where: { id: id },
    });
    return new CostumerEntity(costumer);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.costumer.delete({ where: { id: id } });
  }

  async update(
    id: number,
    costumerDTO: UpdateCostumerDTO,
  ): Promise<CostumerEntity> {
    return await this.prisma.costumer.update({
      where: { id: id },
      data: costumerDTO,
    });
  }
}
