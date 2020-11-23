import { Component, OnInit } from '@angular/core';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NoteService } from '@core/services';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private noteService: NoteService){ }

  get form(){return this.noteForm.controls; }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      visibility: ['', Validators.required],
      noteBody: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log(this.noteForm.value);
    this.noteService.create(this.noteForm.value)
      .pipe(first())
      .subscribe(res => {
          console.log(res);
      });
  }
}
