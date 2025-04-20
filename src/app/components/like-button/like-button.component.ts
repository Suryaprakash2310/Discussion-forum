import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AnswerService } from '../../services/answer.service';


@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule,FormsModule, MatIconModule],
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent {
  @Input() answerId!: number;
  @Input() likes: number = 0;
  @Output() liked = new EventEmitter<void>();
  isLiking = false;

  
  constructor(private http: HttpClient, private answerService: AnswerService) {}
  like() {
    if (!this.answerId || this.isLiking) return;

    this.isLiking = true;
    this.http.put<{ updatedLikes: number }>(`http://localhost:3000/api/answers/${this.answerId}/like`, {})
      .subscribe({
        next: (res) => {
          this.likes = res.updatedLikes; // Update the likes with value from DB
          this.liked.emit(); // Notify parent if needed
          this.isLiking = false;
        },
        error: (err) => {
          console.error('Error liking answer:', err);
          this.isLiking = false;
        }
      });
  }
  
}
