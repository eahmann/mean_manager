import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MapService {  
  
  constructor(
    private http: HttpClient
    )   { } 
  getLatLngFromAddress(address: string) {
    const mapUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    return this.http.get(`${mapUrl}${encodeURIComponent(address)}&key=${environment.googleApiKey}`)
  }
}