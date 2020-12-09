import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '@core/models';
import { NoteService } from '@core/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id','created', 'account', 'title', 'description','visibility','action'];
  dataSource: MatTableDataSource<Note>;
  notes: any[]
  isDeleting = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( 
  private noteService: NoteService, private router: Router, private route: ActivatedRoute
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
  deleteNote(id: string): void {
    this.isDeleting = true;
    this.noteService.delete(id)
      .subscribe(res => {
        console.log(res);
        this.dataSource.data = this.dataSource.data.filter(x => x.id !== id);
      });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}