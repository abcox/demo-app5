export * from './client.service';
import { ClientService } from './client.service';
export * from './dataService.service';
import { DataServiceService } from './dataService.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [ClientService, DataServiceService, WeatherForecastService];
