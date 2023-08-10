import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class RecruterService {



  constructor(private http: HttpClient) { }

  createRecruter(recruter: any) {
    return this.http.post(`${baseUrl}/api/recruters`, recruter);
  }

  getRecruterByUsername(username: string): Observable<any> {
    return this.http.get(`${baseUrl}/api/recruters/${username}`);
  }                            

  //deleteRecruter(id: number): Observable<any> {
  //  return this.http.delete(`${this.baseUrl}/${id}`);
  //}
}
