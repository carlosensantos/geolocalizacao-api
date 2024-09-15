import { Controller, Get, Query } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get()
  async getGeolocation(
    @Query('lat') lat: string, 
    @Query('lon') lon: string
  ) {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return { error: 'Coordenadas inválidas' };
    }

    return this.geolocationService.getGeolocation(latitude, longitude);
  }

  @Get('search')
  async getCoordinatesByLocation(@Query('location') location: string) {
    if (!location) {
      return { error: 'Nome do local é necessário' };
    }

    return this.geolocationService.getCoordinatesByLocation(location);
  }
}