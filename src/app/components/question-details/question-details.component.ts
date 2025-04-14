import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AnswerComponent } from '../answer-form/answer-form.component';
 // adjust path as needed


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
  questionId: number = 0;
  question: any;
  answers: any[] = [];
  newAnswer: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('id'));

    // Simulated question and answers
    this.question = {
      id: this.questionId,
      title: 'What is Dependency Injection?',
      description: 'Can someone explain DI in simple terms?',
      tags: ['angular', 'di']
    };

    this.answers = [
      { id: 1, answer_text: 'DI is providing dependencies to components.', likes: 10 },
      { id: 2, answer_text: 'It makes code more testable and decoupled.', likes: 7 }
    ];
  }

  postAnswer() {
    if (this.newAnswer.trim()) {
      this.answers.push({ id: Date.now(), answer_text: this.newAnswer, likes: 0 });
      this.newAnswer = '';
    }
  }

  likeAnswer(answer: any) {
    answer.likes += 1;
  }
}
