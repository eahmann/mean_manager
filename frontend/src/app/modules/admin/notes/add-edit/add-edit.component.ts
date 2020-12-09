import { Component, OnInit } from '@angular/core';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NoteService } from '@core/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  noteForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private noteService: NoteService,
              private route: ActivatedRoute,
              private router: Router){ }

  get form(){return this.noteForm.controls; }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      visibility: ['', Validators.required],
      noteBody: ['', Validators.required]
    });
    if (!this.isAddMode) {
      this.noteService.getById(this.id)
          .pipe(first())
          .subscribe(x => {
            console.log(x)
            this.noteForm.patchValue(x);
          })
  }
  }
  onSubmit() {
    this.loading = true;
        if (this.isAddMode) {
            this.createNote();
        } else {
            this.updateNote();
        }
  }
  createNote() {
    console.log(this.noteForm.value);
    this.noteService.create(this.noteForm.value)
      .pipe(first())
      .subscribe(res => {
          console.log(res);
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
  private updateNote(): void {
    this.noteService.update(this.id, this.noteForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                this.loading = false;
            }
        });
}
}
