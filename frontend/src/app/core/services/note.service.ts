import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Note } from '@core/models';

const baseUrl = `${environment.apiUrl}/notes`;

@Injectable({ providedIn: 'root' })
export class NoteService {
    private noteSubject: BehaviorSubject<Note>;
    public note: Observable<Note>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.noteSubject = new BehaviorSubject<Note>(null);
        this.note = this.noteSubject.asObservable();
    }

    public get noteValue(): Note {
        return this.noteSubject.value;
    }

    getAll(): Observable<Note[]> {
        return this.http.get<Note[]>(baseUrl, { withCredentials: true });
    }

    getById(id: string): Observable<Note> {
        return this.http.get<Note>(`${baseUrl}/${id}`, { withCredentials: true });
    }

    create(params): Observable<any> {
        return this.http.post(baseUrl, params, { withCredentials: true });
    }

    update(id, params): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, params, { withCredentials: true })
            .pipe(map((note: any) => {
                // update the current account if it was updated
                if (note.id === this.noteValue.id) {
                    // publish updated account to subscribers
                    note = { ...this.noteValue, ...note };
                    this.noteSubject.next(note);
                }
                return note;
            }));
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`, { withCredentials: true });
    }
}
