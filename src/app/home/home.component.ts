import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeService } from '../service/employe.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { CoreService } from '../core/core.service'
import { EditComponent } from '../edit/edit.component';

interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dob: Date; //
  gender: string;
  educatiomlevel: string;
  companyname: string;
  experiance: number;
  salary: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'firstname', 'lastname', 'email', 'dob', 'gender', 'educationlevel', 'companyname',
    'experiance', 'salary', 'action'
  ];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(private dialog: MatDialog, private getempservi: EmployeService, private coreservice: CoreService) {}

ngOnInit(): void {
    this.getEmployList()
}

 getEmployList(){
  this.getempservi.getEmploye().subscribe({
    next  :(res : any) => {

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
  },
  error : (err) => {
    console.log(err)
  }
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
}


}

deleteEmployList(id : number) {
  const confirmation = window.confirm("Are you sure you want to delete this employe?");
 if (confirmation) {
  this.getempservi.deleteEmploye(id).subscribe({
    next : (res: any) => {
      const confrim = window.confirm("delete")
      if (confrim){
      this.coreservice.openSnackbar("employ deleted sucessfully")
      this.getEmployList()
    }
    },

    error : (err) => {
      console.log(err)
    }

  })
 }


}

openEdit(data: any) {
 const dialog = this.dialog.open(EditComponent, {
    data : data})
dialog.afterClosed().subscribe(
  {
    next : (val) => {
      if(val) {
        this.getEmployList()
      }
    }
  }
)
}
}
