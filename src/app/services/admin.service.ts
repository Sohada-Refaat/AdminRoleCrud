import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public getByIdUrl = '/GetById?id=';
    public listUrl = '/GetAll';
    public addUrl = '/Create';
    public editUrl = '/Update';
    public delUrl = '/Delete?id=';
    public BaseUrl = 'https://localhost:7022/api/admin';
    header = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };
  
    constructor(private http: HttpClient) { }
  
    getAdminsById(id: any): Observable<any> {
      return this.http.get<any>(this.BaseUrl + this.getByIdUrl + id, this.header);
    }
  
    editAdmin(role: any) {
      return this.http.put(this.BaseUrl + this.editUrl, role, this.header);
    }
  
    addAdmin(role: any) {
      return this.http.post(this.BaseUrl + this.addUrl, role, this.header);
    }
  
    delAdmin(id: any) {
      return this.http.delete(this.BaseUrl + this.delUrl + id, this.header);
    }
  
    listAdmins(): Observable<any[]> {
      return this.http.get<any[]>(this.BaseUrl +
        this.listUrl, this.header);
    }
}
