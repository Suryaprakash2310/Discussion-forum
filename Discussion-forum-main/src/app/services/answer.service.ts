import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:3000/answers';

  constructor(private http: HttpClient) {}

  submitAnswer(questionId: number, answerText: string): Observable<any> {
    const payload = {
      question_id: questionId,
      answer_text: answerText
    };
    return this.http.post(this.apiUrl, payload);
  }

  getAnswersByQuestionId(questionId: number) {
    return this.http.get<any[]>(`http://localhost:3000/api/answers/${questionId}`);
  }

  likeAnswer(answerId: number) {
    return this.http.put<{ likes: number }>(
      `http://localhost:3000/api/answers/like/${answerId}`, {}
    );
  }
  
}