import { Component } from '@angular/core';
import {
  WeatherForecast,
  WeatherForecastService,
} from '../../../../../demo-app5-backend-clients/v1';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.scss',
})
export class WeatherPageComponent {
  //weatherForecastService = inject(WeatherForecastService);
  weatherForecasts: WeatherForecast[] = [];
  constructor(private weatherForecastService: WeatherForecastService) {
    weatherForecastService.getWeatherForecast().subscribe(result => {
      this.weatherForecasts = result;
    });
  }
}
