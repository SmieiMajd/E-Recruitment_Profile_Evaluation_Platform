import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any, file: File) {
    const formData = new FormData();
    formData.append('photo', file, file.name);
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post(`${baseUrl}/user/`, formData);
  }

  //get all users

  public getAllUsers() {
    return this.http.get(`${baseUrl}/user/getUsersList`);
  }

  //get user by id

  public getUserById(id: number) {
    return this.http.get(`${baseUrl}/user/${id}`);
  }


  public getUser(username: string) {
    return this.http.get(`${baseUrl}/user/${username}`);
  }


  // Delete user by ID
  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/user/${userId}`);
  }

}
