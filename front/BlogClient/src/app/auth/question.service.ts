import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Question } from './Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/Question`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/Question`, question);
  }

  updateQuestion(id: number, updatedQuestion: Question): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Question/${id}`, updatedQuestion);
  }
  
}
