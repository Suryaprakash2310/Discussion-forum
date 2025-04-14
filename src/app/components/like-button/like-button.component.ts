import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button mat-stroked-button color="primary" (click)="like.emit()">
      👍 Like ({{ likes }})
    </button>
  `
})
export class LikeButtonComponent {
  @Input() likes: number = 0;
  @Output() like = new EventEmitter<void>();
}
