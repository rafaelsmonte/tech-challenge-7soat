import { Injectable } from '@nestjs/common';
import { CostumerEntity } from 'src/costumer/domain/model/costumer.entity';
import { ICostumerRepository } from 'src/costumer/domain/outboundPorts/costumer-repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CostumerRepository implements ICostumerRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<CostumerEntity[]> {
    const costumers = await this.prisma.costumers.findMany();
    return costumers.map((costumer) => new CostumerEntity(costumer));
  }
}
