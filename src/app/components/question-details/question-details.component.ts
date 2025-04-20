import { Component, OnInit, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AnswerComponent } from '../answer-form/answer-form.component';
import { AnswerService } from '../../services/answer.service';
import { QuestionService, Question } from '../../services/question.service';
import { HttpClient } from '@angular/common/http';
import { LikeButtonComponent } from '../like-button/like-button.component';

@Component({
  selector: 'app-question-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    AnswerComponent,
    LikeButtonComponent,
  ],
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  questionId!: number;
  question: any = '';
  questionText : string='';
  answerText: string = '';
  showSuccessMessage: boolean = false;
  answers: any[] = [];
 private http = inject(HttpClient);
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    
    private answerService: AnswerService
    
  
    
  ) {}

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchQuestion();
    this.fetchAnswers();
  }

  fetchQuestion() {
    this.http.get(`http://localhost:3000/questions/${this.questionId}`).subscribe({
      next: (data: any) => this.question = data,
      error: err => console.error('Error fetching question', err)
    });
  
  }

  fetchAnswers() {
    console.log('Fetching answers for question ID:', this.questionId);
  
    this.answerService.getAnswersByQuestionId(this.questionId).subscribe({
      next: (data) => {
        console.log('Received answers from backend:', data); // 🔍 Add this
        this.answers = data;
      },
      error: (err) => {
        console.error('Failed to fetch answers:', err);
      }
    });
  }
  


  onAnswerSubmitted() {
    this.fetchAnswers();
    alert('Answer submitted successfully!');
    // Optional: refresh answers list if implemented
  }

  submitAnswer(): void {
    if (!this.answerText.trim()) return;

    this.answerService.submitAnswer(this.questionId, this.answerText).subscribe({
      next: () => {
        this.showSuccessMessage = true;
        this.answerText = '';
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error submitting answer:', err);
      }
    });
  }
}
