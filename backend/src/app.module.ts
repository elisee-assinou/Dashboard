import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/dashboard_backend'), UserModule, ServicesModule, SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
