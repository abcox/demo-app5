export * from './character.service';
import { CharacterService } from './character.service';
export * from './client.service';
import { ClientService } from './client.service';
export * from './deprecated.service';
import { DeprecatedService } from './deprecated.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [CharacterService, ClientService, DeprecatedService, WeatherForecastService];
