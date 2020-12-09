import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@core/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
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
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: account => {
                    this._snackBar.open('Thank you for logging in, ' + account.firstName , 'SUCCESS', {
                        duration: 5000,
                        verticalPosition: 'top',
                        panelClass: 'snackbar-success'
                      });
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this._snackBar.open(error, 'ERROR', {
                        duration: 5000,
                        verticalPosition: 'top',
                        panelClass: 'snackbar-error'
                      })
                    this.loading = false;
                }
            });
    }
}
