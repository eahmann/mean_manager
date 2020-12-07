import { Component, OnInit, Inject } from '@angular/core';
import { MapService } from '../map.service';
import { MapInfo } from '@core/models';
import { LocationService } from '@core/services';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListComponent} from '../list/list.component';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})

export class MapDialogComponent implements OnInit {
    mapInfo: MapInfo[] | any = <any>{};
    geocoder = new google.maps.Geocoder();
    
    constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public addressData: string,
    private mapService: MapService,
  ) { }  

  ngOnInit() {
    this.getLatLngFromAddress();
    console.log(this.addressData);
  }  
  getLatLngFromAddress() {
    this.mapService.getLatLngFromAddress(this.addressData)
      .subscribe(res => {
        this.geocoder.geocode({ 'address': this.addressData}, function(results, status){
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude,longitude)
          }
            this.mapInfo = {
              lat: latitude,
              lng: longitude,
            }
            console.log(this.mapInfo)
            return this.mapInfo
        });
      });
  }
}






