import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getResultByUserId(uid: number) {
    return this.http.get(`${baseUrl}/result/user/${uid}`);
  }

  addResult(result: any) {
    return this.http.post(`${baseUrl}/result/`, result);
  }

  getResultOfUserAndQuiz(qid: number, uid: number) {
    return this.http.get(`${baseUrl}/result/${qid}/${uid}`);
  }

  getResultOfQuiz(qid: number) {
    return this.http.get(`${baseUrl}/result/${qid}`);
  }

}
