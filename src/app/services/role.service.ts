import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public getByIdUrl = '/GetById?id=';
  public listUrl = '/GetAll';
  public addUrl = '/Create';
  public editUrl = '/Update';
  public delUrl = '/Delete?id=';
  public BaseUrl = 'https://localhost:7022/api/role';
  header = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

  constructor(private http: HttpClient) { }

  getRoleById(id: any): Observable<any> {
    return this.http.get<any>(this.BaseUrl + this.getByIdUrl + id, this.header);
  }

  editRole(role: any) {
    return this.http.put(this.BaseUrl + this.editUrl, role, this.header);
  }

  addRole(role: any) {
    return this.http.post(this.BaseUrl + this.addUrl, role, this.header);
  }

  delRole(id: any) {
    return this.http.delete(this.BaseUrl + this.delUrl + id, this.header);
  }

  listRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseUrl +
      this.listUrl, this.header);
  }
}
