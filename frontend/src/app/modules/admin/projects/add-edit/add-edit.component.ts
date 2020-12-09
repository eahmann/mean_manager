import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountShortDetails, Location } from '@core/models';
import { AccountService, LocationService, ProjectService } from '@core/services';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  projectForm: FormGroup;
  customerFiltered: Observable<AccountShortDetails[]>;
  locationFiltered: Observable<Location[]>;

  customerOptions: Array<AccountShortDetails>;
  locationOptions: Array<Location>;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private accountService: AccountService,
              private locationService: LocationService) { }

  get form() { return this.projectForm.controls; }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      active: ['', Validators.required],
      customer: ['', Validators.required],
      location: ['', Validators.required],
      startDate: [''],
      endDate: ['']
    });

    this.accountService.list('all')
      .pipe(first())
      .subscribe(res => {
        this.customerOptions = res;
        this.customerFiltered = this.form.customer.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.customerOptions.slice())
          );
      });

    this.locationService.getAll()
      .pipe(first())
      .subscribe(res => {
        this.locationOptions = res;
        console.log(res);
        this.locationFiltered = this.form.location.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.address),
            map(address => address ? this._filterLocations(address) : this.locationOptions.slice())
          );
        console.log(this.locationOptions);
        console.log(this.locationFiltered);
      });
  }

  displayFn(option: AccountShortDetails) {
    return option ? `${option.firstName} ${option.lastName}` : undefined;
  }

  displayFnLoc(option: Location) {
    return option ? `${option.city}, ${option.state}` : undefined;
  }

  onSubmit() {
    console.log(this.projectForm.value);

    // Clean up JSON for BE
    const formData = this.projectForm.value;
    formData.customer = formData.customer.id;
    formData.location = formData.location.id;
    console.log(formData.startDate);
    console.log(formData);

    this.projectService.create(this.projectForm.value)
      .pipe(first())
      .subscribe(res => {
        console.log(res);
      });
  }

  private _filter(value: string): AccountShortDetails[] {
    const filterValue = value.toLowerCase();

    return this.customerOptions.filter(option =>
      option.firstName.toLowerCase().includes(filterValue) ||
      option.lastName.toLowerCase().includes(filterValue));
  }

  private _filterLocations(value: string): Location[] {
    const filterValue = value.toLowerCase();

    return this.locationOptions.filter(option =>
      option.addressLine1.toLowerCase().includes(filterValue) ||
      option.city.toLowerCase().includes(filterValue) ||
      option.state.toLowerCase().includes(filterValue));
  }

}
