import { Component, OnInit, Inject } from '@angular/core';
import { MapService } from '../map.service';
import { MapInfo } from '@core/models';
import { LocationService } from '@core/services';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListComponent} from '../list/list.component';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})

export class MapDialogComponent implements OnInit {
    mapInfo: MapInfo;

    constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public addressData: string,
    private mapService: MapService,
  ) {}

  ngOnInit() {
    this.getLatLngFromAddress();
    console.log('addressData', this.addressData);
  }

  getLatLngFromAddress() {
    this.mapService.getLatLngFromAddress(this.addressData)
      .subscribe(res => {
        const loc = (res as any).results[0].geometry.location;
        this.mapInfo = {
          lat: loc.lat,
          lng: loc.lng
        }
      });
  }
}






