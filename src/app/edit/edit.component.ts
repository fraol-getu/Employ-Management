import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeService } from '../service/employe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  editForm: FormGroup

  education: string[] = [
  'Matric',
  'Deploma',
  'Degree',
  'Masters',
]

  constructor(private fb : FormBuilder, private empservice: EmployeService, private degref: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) private data : any, private coreservice: CoreService
  )


  {
  this.editForm = fb.group({
    firstname: "",
     lastname:"",
     email: "",
     dob: "",
     gender:"",
     educationlevel:"",
     companyname:"",
     experiance:"",
     salary: "",
 })
}
ngOnInit(): void {
  this.editForm.patchValue(this.data)
}
 onEditSubmit() {
  if (this.editForm.valid) {
  if (this.data) {
    this.empservice
      .editEmployee(this.data.id, this.editForm.value)
      .subscribe({
        next: (val: any) => {
          this.coreservice.openSnackbar("data updated sucessfully");
          this.degref.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }

}}
}
