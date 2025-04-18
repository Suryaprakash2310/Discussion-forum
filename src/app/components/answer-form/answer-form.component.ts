import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  template: `
    <h4>Submit an Answer</h4>
    <textarea [(ngModel)]="answerText" rows="4" cols="50" placeholder="Your answer here..."></textarea>
    <br />
    <button mat-raised-button color="primary" (click)="submit()">Submit</button>
  `
})
export class AnswerComponent {
  @Input() questionId!: number;
  @Output() answerSubmitted = new EventEmitter<void>();

  answerText: string = '';

  constructor(private answerService: AnswerService) {}

  submit() {
    if (!this.answerText.trim()) return;

    this.answerService.submitAnswer(this.questionId, this.answerText).subscribe({
      next: () => {
        this.answerText = '';
        this.answerSubmitted.emit(); // notify parent to refresh answers
      },
      error: (err) => console.error('Error submitting answer:', err)
    });
  }
}
