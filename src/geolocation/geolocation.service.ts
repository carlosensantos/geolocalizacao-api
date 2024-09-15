import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeolocationService {
  async getGeolocation(lat: number, lon: number): Promise<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'NestJS App'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      throw new HttpException('Erro ao buscar dados de localização', HttpStatus.BAD_REQUEST);
    }
  }
  
  async getCoordinatesByLocation(location: string): Promise<any> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'NestJS App'
        }
      });

      if (response.data.length === 0) {
        throw new HttpException('Localização não encontrada', HttpStatus.NOT_FOUND);
      }

      return response.data[0];
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      throw new HttpException('Erro ao buscar coordenadas do local', HttpStatus.BAD_REQUEST);
    }
  }
}