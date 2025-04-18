import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-question-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    AnswerComponent
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
    this.questionService.getQuestionById(this.questionId).subscribe((data) => {
      this.question = data;
    });
  
  }

  fetchAnswers() {
    if (!this.questionId) return;
  
    this.answerService.getAnswersByQuestionId(this.questionId).subscribe({
      next: (data) => {
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
