import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@core/services';
import { MustMatch } from '@core/helpers';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f(): any { return this.form.controls; }

    onSubmit(): void {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: response => {
                    console.log(response.message)
                    this._snackBar.open(response.message, 'SUCCESS', {
                        duration: 5000,
                        verticalPosition: 'top',
                        panelClass: 'snackbar-success'
                      });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this._snackBar.open(error, 'ERROR', {
                        duration: 5000,
                        verticalPosition: 'top',
                        panelClass: 'snackbar-error',
                      });
                    this.loading = false;
                }
            });
    }
}
