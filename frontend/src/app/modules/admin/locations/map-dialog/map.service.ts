import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  

  constructor(
    private http: HttpClient
    )   { }

 
  getLatLngFromAddress(address: string): Observable<object> {
    const mapUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
      console.log("getCurrentLatLngFromAddress"+this.http.get(`${mapUrl}${encodeURIComponent(address)}&key=${environment.googleApiKey}`))
      return this.http.get(`${mapUrl}${encodeURIComponent(address)}&key=${environment.googleApiKey}`)
  }
  getLatLngFill(address: string[], i: number): Observable<object> {
    const mapUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
      console.log("getLatLngFromAddressStack"+this.http.get(`${mapUrl}${encodeURIComponent(address[i])}&key=${environment.googleApiKey}`))
      return this.http.get(`${mapUrl}${encodeURIComponent(address[i])}&key=${environment.googleApiKey}`)

  }
}
