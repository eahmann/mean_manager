import { Component, OnInit, Inject } from '@angular/core';
import { MapService } from '../map.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})

export class MapDialogComponent implements OnInit {
  mapInfo: any = <any>{};  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public addressData: string,
    private mapService: MapService
  ) { }  
  ngOnInit() {
    this.getLatLngFromAddress();
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
  }}
