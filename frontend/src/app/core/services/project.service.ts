import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Project } from '@core/models';

const baseUrl = `${environment.apiUrl}/projects`;

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private projectSubject: BehaviorSubject<Project>;
    public project: Observable<Project>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.projectSubject = new BehaviorSubject<Project>(null);
        this.project = this.projectSubject.asObservable();
    }

    public get projectValue(): Project {
        return this.projectSubject.value;
    }

    getAll(): Observable<Project[]> {
        return this.http.get<Project[]>(baseUrl, { withCredentials: true });
    }

    getById(id: string): Observable<Project> {
        return this.http.get<Project>(`${baseUrl}/${id}`, { withCredentials: true });
    }

    create(params): Observable<any> {
        return this.http.post(baseUrl, params, { withCredentials: true });
    }

    update(id, params): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, params, { withCredentials: true })
            .pipe(map((project: any) => {
                // update the current account if it was updated
                if (project.id === this.projectValue.id) {
                    // publish updated account to subscribers
                    project = { ...this.projectValue, ...project };
                    this.projectSubject.next(project);
                }
                return project;
            }));
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`, { withCredentials: true });
    }
}
