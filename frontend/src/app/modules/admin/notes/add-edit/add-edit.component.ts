import { Component, OnInit } from '@angular/core';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  noteForm: FormGroup;

  constructor() { }

  get form(){return this.noteForm.controls; }

  ngOnInit(): void {
  }
  /**
  onSubmit() {
    console.log(this.noteForm.value);
    this.noteService.create(this.noteForm.value)
      .pipe(first())
      .subscribe(res => {
          console.log(res);
      });
  }
*/
}
