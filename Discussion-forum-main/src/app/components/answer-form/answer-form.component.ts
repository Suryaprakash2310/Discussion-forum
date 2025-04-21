import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AnswerService } from '../../services/answer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, ReactiveFormsModule],
  template: `
    <h4>Submit an Answer</h4>
    <textarea [(ngModel)]="answerText" rows="4" placeholder="Write your answer..."></textarea>
<br />
<button (click)="submitAnswer()">Submit Answer</button>
<p *ngIf="message">{{ message }}</p>
  `
})
export class AnswerComponent {
  @Input() questionId!: number;
  @Output() answerSubmitted = new EventEmitter<void>();

  answerText: string = '';
  message: string = '';
  @Input() answer: any;

  constructor(private http: HttpClient) {}

  submitAnswer() {
    if (!this.answerText.trim()) return;

    this.http.post('http://localhost:3000/api/answers', {
      question_id: this.questionId,
      answer_text: this.answerText
    }).subscribe({
      next: () => {
        this.message = 'Answer submitted!';
        this.answerText = '';
        this.answerSubmitted.emit(); // Notify parent to refresh
      },
      error: err => {
        this.message = 'Something went wrong!';
        console.error(err);
      }
    });
  }
}