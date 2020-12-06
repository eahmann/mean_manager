import { ContentComponent } from './layout/content/content.component';
import { MaterialModule } from './shared/material/material.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from '@core/helpers';
import { AccountService } from '@core/services';
import { AppComponent } from './app.component';
import { AlertComponent } from '@shared/components';
import { HomeComponent } from './home';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './layout/nav/nav.component';
import { LandingComponent } from './layout/landing/landing.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';;
import { EnumToArrayPipe } from './core/pipes/enum-to-array.pipe'
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        LayoutModule,
        GoogleMapsModule,
      ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        NavComponent,
        LandingComponent,
        ContentComponent,
        ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
