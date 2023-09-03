import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './service.schema';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async create(serviceData: Service): Promise<Service> {
    const Service = new this.serviceModel(serviceData);
    return Service.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async findById(id: string): Promise<Service | null> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, serviceData: Service): Promise<Service | null> {
    return this.serviceModel
      .findByIdAndUpdate(id, serviceData, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }
}
