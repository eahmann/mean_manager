
import { Component, OnInit, Inject } from '@angular/core';
import { MapService } from './map.service';
import { MapInfo } from '@core/models';
import { LocationService } from '@core/services';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})

export class MapDialogComponent implements OnInit {
    geocoder = new google.maps.Geocoder();
    public mapInfo: MapInfo[] | any = <any>{};
    public lat: number = this.mapInfo.lat;
    public lng: number = this.mapInfo.lng;
    

    constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public addressData: string,
    private mapService: MapService,
  ) { console.log(this.mapInfo) }  

  ngOnInit() {
    this.getLatLngFromAddress();
    console.log("mapInof"+this.mapInfo);
    console.log("addressData"+this.addressData);
  }  
  getLatLngFromAddress() {
    this.mapService.getLatLngFromAddress(this.addressData)
      .subscribe(res => {
        this.geocoder.geocode({ 'address': this.addressData}, function(results, status){
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude,longitude)
            this.mapInfo={
              lat: latitude,
              lng: longitude
            }
            this.lat =  this.mapInfo.lat;
            this.lng = this.mapInfo.lng;
          }
            console.log(this.mapInfo.lat)
            console.log(this.lat, this.lng)
        });
      });
  }
}






