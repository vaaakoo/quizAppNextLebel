import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Answer } from './Answer';
import { User } from './user';
import { QuestionWithAnswers } from './QuestionWithAnswers';



@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get all answers
  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/answer`);
  }

  getDistinctUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/answer/distinctUsers`);
  }

  // Get answers by name
  getAnswersByName(name: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/answer/byName/${name}`);
  }
  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/answer/${questionId}`);
  }

  getDataByUserName(name: string): Observable<QuestionWithAnswers[]> {
    return this.http.get<QuestionWithAnswers[]>(`${this.apiUrl}/answer/dataByUserName/${name}`);
  }

  // Get answer by ID
  getAnswerById(id: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.apiUrl}/answer/${id}`);
  }

  // Add an answer to a question
  addAnswer(questionId: number, answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.apiUrl}/answer/${questionId}`, answer);
  }

  // Update an answer
  updateAnswer(id: number, updatedAnswer: Answer): Observable<any> {
    return this.http.put(`${this.apiUrl}/answer/${id}`, updatedAnswer);
  }
}
