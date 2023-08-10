import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class CondidatService {
  constructor(private http: HttpClient) {}

  createCondidat(condidat: any, cv: File): Observable<any> {
    console.log(cv);
    const formData: FormData = new FormData();
    formData.append('cv', cv);
    Object.keys(condidat).forEach((key) => {
      formData.append(key, condidat[key]);
    });

    return this.http.post<any>(`${baseUrl}/api/condidats`, formData);
  }

  getCondidatByUsername(username: string): Observable<any> {
    return this.http.get(`${baseUrl}/api/condidats/${username}`);
  }
  getCondidatByCv(username: string): Observable<any> {
    return this.http.get(`${baseUrl}/api/condidats/cv/${username}`, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Accept', 'application/pdf'),
    });
  }
  deleteCondidat(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/api/condidats/${id}`);
  }
  getAllCandidates(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/api/condidats/candidates`);
  }
}
