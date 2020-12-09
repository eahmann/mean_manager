import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LocationService, AlertService } from '@core/services';
import { Role } from '@core/models';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
    locationForm: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    roles: typeof Role = Role;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private alertService: AlertService,
    private location: Location
   ) {}

  get form(): any { return this.locationForm.controls; }

  ngOnInit(): void {
        this.id = this.route.snapshot.params.id;
        this.isAddMode = !this.id;
        this.locationForm = this.formBuilder.group({
            onsite: ['', Validators.required],
            track: ['', Validators.required],
            project: ['', Validators.required],
            addressLine1: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
        }, {});
    }
    
    onSubmit() {
        console.log(this.locationForm.value);
        this.locationService.create(this.locationForm.value)
          .pipe(first())
          .subscribe(res => {
              console.log(res);
          });
      }

    onCancel(e: Event): void {
        // This is needed to prevent form submission
        e.preventDefault();
        // This is needed so we navigate back to the correct page
        this.location.back();
    }

    private createLocation(): void {
        this.locationService.create(this.locationForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Location created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateLocation(): void {
        this.locationService.update(this.id, this.locationForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
