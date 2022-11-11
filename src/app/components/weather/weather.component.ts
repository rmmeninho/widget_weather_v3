import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  today: any;
  listDataToday: any;
  city: any;
  image: any;
  listForecast: any;
  image_Forecast: any;
  precipitation: any;

  constructor(private weatherService: WeatherService) {
    console.log('El componente se ha creado');
  }

  ngOnInit(): void {
  console.log('El componente se ha inizializado');
    this.getDate();
    this.QueryManagement();
    setInterval(() => {
      this.QueryManagement();
    }, 3600000);
  }

  getDate = (): void =>{
    setInterval(() => {
      this.today = new Date();
    }, 1000);
  }



  QueryManagement = () => {
    this.weatherService.getUserLocalization()
      .then(
        () => this.weatherService.getForecast().subscribe(
                datos => {
                  this.listForecast = datos.data;
                  this.city = datos.city_name;
                  this.listDataToday = this.listForecast[0];
                  let control = 0;
                  for(let i = 1; i < 7 && control == 0; i++){
                    if(this.listForecast[i]['pop'] > 50){
                      this.precipitation = this.listForecast[i];
                      control = 1;
                    }
                  }
                }

              )
      )
  }

}
