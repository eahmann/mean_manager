import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Project } from '@core/models';

const baseUrl = `${environment.apiUrl}/locations`;

@Injectable({ providedIn: 'root' })
export class LocationService {
    private locationSubject: BehaviorSubject<Project>;
    public location: Observable<Project>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.locationSubject = new BehaviorSubject<Project>(null);
        this.location = this.locationSubject.asObservable();
    }

    public get locationValue(): Project {
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
            .pipe(map((project: any) => {
                // update the current account if it was updated
                if (project.id === this.locationValue.id) {
                    // publish updated account to subscribers
                    project = { ...this.locationValue, ...project };
                    this.locationSubject.next(project);
                }
                return project;
            }));
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`, { withCredentials: true });
    }
}
