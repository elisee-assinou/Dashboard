import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Service {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  url_api: string;

  @Prop({ required: false })
  api_key: string;
  
  @Prop({ required: true })
  nav: string;
}

export type ServiceDocument = Service & Document;
export const ServiceSchema = SchemaFactory.createForClass(Service);
