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

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }
}
