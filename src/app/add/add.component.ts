import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeService } from '../service/employe.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit{
  addForm: FormGroup

  education: string[] = [
  'Matric',
  'Deploma',
  'Degree',
  'Masters',
]
constructor(private fb : FormBuilder, private empservice: EmployeService, private degref: MatDialogRef<AddComponent> ,
 private coreservice: CoreService
) {
  this.addForm = fb.group({
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

}

onformSubmit() {
  if (this.addForm.valid){
this.empservice.addEmployee(this.addForm.value).subscribe({
      next:(val: any) => {
        this.coreservice.openSnackbar("data added sucessfully")
        this.degref.close(true)
      },
      error: (err) => {
      console.log(err)
      }
    })
  }
  }



}
