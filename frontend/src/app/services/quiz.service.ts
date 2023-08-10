import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public quiz(){
    return this.http.get(`${baseUrl}/quiz/`);

  }
  // add quiz
  public addQuiz(quiz: any){
    return this.http.post(`${baseUrl}/quiz/`, quiz);
  }
  //delete quiz
  public deleteQuiz(qid: any){
    return this.http.delete(`${baseUrl}/quiz/${qid}`);
  }
  //get single quiz by id
  public getQuiz(qid: any){
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }
  //update quiz
  public updateQuiz(quiz: any){
    return this.http.put(`${baseUrl}/quiz/`, quiz);
  }
}

