import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {


  user_location: any[] = [];

  constructor(private http: HttpClient) {
    console.log('Servicio Http: ');
  }

  getUserLocalization = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (args) => {
          this.user_location = [args.coords.longitude, args.coords.latitude];
          resolve(this.user_location);
        },
        (err) => {
          console.log(err);
          reject();
        }
      );
    });
  }

/*
  getWeather = (): Observable<any> =>{
    let toret = 'https://api.weatherbit.io/v2.0/current?lat='+this.user_location[1]+'&lon='+this.user_location[0]+'&key=74d736b43663479aaa5d840efdd577b9&lang=es';
    console.log(toret);
    return this.http.get(toret);
  }
  */

  getForecast = ():Observable<any> =>{
    let toret = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='+this.user_location[1]+'&lon='+this.user_location[0]+'&key=74d736b43663479aaa5d840efdd577b9&lang=es';
    console.log(toret);
    return this.http.get(toret);
  }

/*
  getWeather = (): Observable<any> =>{
    let toret = '../../assets/json/tiempo_vigo.json';
    console.log(toret);
    return this.http.get(toret);
  }

  getForecast = ():Observable<any> =>{
    let toret = '../../assets/json/pronostico.json'
    console.log(toret);
    return this.http.get(toret);
  }
*/
}

