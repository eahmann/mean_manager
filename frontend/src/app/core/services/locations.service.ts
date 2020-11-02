import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Location } from '@core/models';

const baseUrl = `${environment.apiUrl}/location`;

@Injectable({ providedIn: 'root' })
export class LocationService {
    private locationSubject: BehaviorSubject<Location>;
    public location: Observable<Location>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.locationSubject = new BehaviorSubject<Location>(null);
        this.location = this.locationSubject.asObservable();
    }

    public get locationValue(): Location {
        return this.locationSubject.value;
    }

    getAll(): Observable<Location[]> {
        return this.http.get<Location[]>(baseUrl, { withCredentials: true });
    }

    getById(id: string): Observable<Location> {
        return this.http.get<Location>(`${baseUrl}/${id}`, { withCredentials: true });
    }

    create(params): Observable<any> {
        return this.http.post(baseUrl, params, { withCredentials: true });
    }

    update(id, params): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, params, { withCredentials: true })
            .pipe(map((location: any) => {
                // update the current account if it was updated
                if (location.id === this.locationValue.id) {
                    // publish updated account to subscribers
                    location = { ...this.locationValue, ...location };
                    this.locationSubject.next(location);
                }
                return location;
            }));
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`, { withCredentials: true });
    }
}
