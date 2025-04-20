import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private baseUrl = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) {}

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  deleteQuestion(id: number) {
    return this.http.delete(`http://localhost:3000/questions/${id}`);
  }
  
}
