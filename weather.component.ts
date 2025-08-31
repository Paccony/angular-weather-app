import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  cityName = '';
  weatherData: WeatherData | null = null;
  errorMessage = '';
  showResult = false;

  private apiKey = 'e7558781f8e008f2e170a7c294bdd76b';

  constructor(private http: HttpClient) {}

  getWeather() {
    if (this.cityName.trim() === '') {
      this.errorMessage = 'Please enter a city name';
      this.showResult = false;
      return;
    }

    this.errorMessage = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

    this.http.get<WeatherData>(url).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.showResult = true;
},
      error: (error) => {
        this.errorMessage = 'Could not retrieve weather data.';
        this.showResult = false;
        console.error('Error:', error);
      }
    });

    this.cityName = '';
  }

  }
