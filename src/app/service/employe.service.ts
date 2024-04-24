
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url : any = "https://json-wiov.onrender.com/employdata/"
@Injectable({
  providedIn: 'root'

})


export class EmployeService {
  constructor(private http: HttpClient) { }
  addEmployee(data: any): Observable<any> {
    return this.http.post(url, data)
  }
  editEmployee(id: number, data: any,): Observable<any> {
    return this.http.put(url + id, data)
  }

  getEmploye() {
    return this.http.get(url)
  }
  deleteEmploye(id: number) {
    return this.http.delete(url + id)
  }
}
