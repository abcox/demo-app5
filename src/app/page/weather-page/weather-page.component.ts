import { Component } from '@angular/core';
import {
  WeatherForecast,
  WeatherForecastService,
} from '../../../backend-api/v1';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [MatCardModule],
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
