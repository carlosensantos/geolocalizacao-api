import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeolocationService } from './geolocation/geolocation.service';
import { GeolocationController } from './geolocation/geolocation.controller';

@Module({
  imports: [],
  controllers: [AppController, GeolocationController],
  providers: [AppService, GeolocationService],
})
export class AppModule {}
