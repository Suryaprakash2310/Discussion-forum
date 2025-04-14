import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LikeButtonComponent } from '../like-button/like-button.component';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, LikeButtonComponent],
  template: `
    <mat-card class="answer-card">
      <mat-card-content>{{ answer.answer_text }}</mat-card-content>
      <mat-card-actions>
        <app-like-button [likes]="answer.likes" (like)="onLike()"></app-like-button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`.answer-card { margin-bottom: 15px; }`]
})
export class AnswerComponent {
  @Input() answer: any;
  @Output() like = new EventEmitter<void>();

  onLike() {
    this.like.emit();
  }
}
