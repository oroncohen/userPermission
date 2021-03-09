import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}


  getUsers(): Observable<any> {
    return this.http.get('api/users');
  }

  getPages(): Observable<any> {
    return this.http.get('api/pages');
  }

  getPermissionByUser(user): Observable<any> {
    return this.http.get(`api/users/${user}`);
  }

  updateUserPermission(data): Observable<any> {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post('api/updatePermission', data, {headers: reqHeader, responseType: 'text'});
  }
}
