import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from '@core/models';
import { NoteService } from '@core/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['created', 'account', 'title', 'description','visibility','action'];
  dataSource: MatTableDataSource<Note>;
  notes: any[]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( 
  private noteService: NoteService
  ){ }

  ngOnInit(): void {
    this.noteService.getAll()
      .pipe(first())
      .subscribe(notes => {
        this.notes = notes;
        console.log(this.notes)
        this.dataSource = new MatTableDataSource(this.notes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}