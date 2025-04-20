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
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerComponent {
  @Input() questionId!: number;
  @Output() answerSubmitted = new EventEmitter<void>();

  answerText: string = '';
  message: string = '';
  hideMessage: boolean = false;  // Flag to control hiding the message
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

                // Hide the answer message after 3 seconds
                setTimeout(() => {
                  this.message = '';  // Clear the success message after a timeout
                }, 4000);  // Adjust the time (3000ms = 3 seconds)
        

        this.answerSubmitted.emit(); // Notify parent to refresh
      },
      error: err => {
        this.message = 'Something went wrong!';
        console.error(err);
      }
    });
  }
}
