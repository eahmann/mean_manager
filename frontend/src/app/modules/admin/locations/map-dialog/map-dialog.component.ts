
import { Component, OnInit, Inject, inject } from '@angular/core';
import { MapService } from '@core/services';
import { MapInfo } from '@core/models';
import { MapInfoCurrent } from '@core/models';
import { LocationService } from '@core/services';
import { Location, LocationSearchResult } from '@core/models';
import { MatTableDataSource } from '@angular/material/table';
import { AgmInfoWindow } from '@agm/core';
import { first } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListComponent } from '@modules/admin/accounts/list';


@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})


export class MapDialogComponent implements OnInit {
    mapInfo: MapInfo[] = [];
    icon = {
      url: 'frontend/src/app/modules/admin/locations/map-dialog/icons/Yellow_hard_hat.svg',
      scaledSize: {
        width: 70,
        height: 25
      }
  };
    location: Location[];
    infoWindow: AgmInfoWindow;
    locations: LocationSearchResult[] | any[];
    addressData: string[] = [];
    addressProj: string[] = [];

    constructor(
    private locationService: LocationService,
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public addressCurrent: string,
    private mapService: MapService,
  ) {}



  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

  ngOnInit() {
    this.locationService.getAll()
      .pipe(first())
      .subscribe(locations => {
        this.getLatLngFromAddress();
        console.log('addressData:', this.addressData);
        console.log('addressCurrent:', this.addressCurrent);
        console.log('addressDataGeolocation:', this.mapInfo);
        this.locations = locations;
        for (const i in this.locations){
          this.addressData.push(this.locations[i].addressLine1 + ' ' + this.locations[i].city + ' ' + this.locations[i].zipCode);
          this.getLatLngFill(i);
        }
    });
  }
  getLatLngFromAddress() {
    console.log('addressData in LatLngFunc', this.addressCurrent);
    console.log('addressData in LatLngFunc', this.addressData.length);
    console.log('addressProj:', this.addressProj);
    this.mapService.getLatLngFromAddress(this.addressCurrent)
      .subscribe(res => {
        const loc = (res as any).results[0].geometry.location;
        this.mapInfo.push(loc);
        });
  }
  getLatLngFill(i){
      this.mapService.getLatLngFill(this.addressData, i)
      .subscribe(res => {
        const loc = (res as any).results[0].geometry.location;
        this.mapInfo.push(loc);
        });
  }
}







