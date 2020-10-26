import { Component, OnInit } from '@angular/core';
import { NoteService } from '@core/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  notes: any[]

  constructor( 
  private noteService: NoteService
  ){ }

  ngOnInit(): void {
    this.noteService.getAll()
      .pipe(first())
      .subscribe(notes => {
        this.notes = notes;
        console.log(this.notes)
      })
  }

}
