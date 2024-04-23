import { Component } from '@angular/core';
import { AddComponent } from '../add/add.component';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 constructor(private dialog: MatDialog, private get : HomeComponent) {}


  openAdd() {
    const dialogref = this.dialog.open(AddComponent)
    dialogref.afterClosed().subscribe({
     next : (val) => {
       if(val) {
         this.get.getEmployList()
       }
     }
    })
 }
}
