import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MATERIAL_IMPORTS } from '../../material';
import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';  // Make sure you have this service
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MATERIAL_IMPORTS,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  searchTerm: string = '';
  filterBy: 'mostAnswered' | 'unanswered' | 'all' = 'all';
  trendingTopics = [
    'Angular 15 Released!',
    'How to Optimize Angular Apps',
    'Latest Trends in Frontend Development',
    'Understanding Reactive Programming',
    'Node.js Performance Tips'
  ];


  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService  // Inject AnswerService
  ) {}

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe({
      next: (data) => {
        this.questions = data;
        this.questions.forEach((question) => {
          this.fetchAnswersForQuestion(question);  // Fetch answers for each question
        });
      },
      error: (err) => {
        console.error('Error fetching questions', err);
      }
    });
    

  }

  // Fetch answers for a specific question
  fetchAnswersForQuestion(question: Question): void {
    this.answerService.getAnswersByQuestionId(question.id).subscribe({
      next: (answers) => {
        question.answers = answers;  // Store answers inside the question object
      },
      error: (err) => {
        console.error('Error fetching answers', err);
      }
    });
  }

  get filteredQuestions(): Question[] {
    let filtered = this.questions.filter(q =>
      q.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  
    switch (this.filterBy) {
      case 'mostAnswered':
        return filtered.sort((a, b) =>
          (b.answers?.length || 0) - (a.answers?.length || 0)
        );
      case 'unanswered':
        return filtered.filter(q => !q.answers || q.answers.length === 0);
      case 'all':
        return filtered; // Show all questions with no specific filter
      default:
        return filtered;
    }
  }
  

  deleteQuestion(id: number) {
    if (!confirm('Are you sure you want to delete this question?')) return;

    this.questionService.deleteQuestion(id).subscribe({
      next: () => {
        this.questions = this.questions.filter(q => q.id !== id);
      },
      error: (err) => {
        console.error('Error deleting question:', err);
      }
    });
  }
}
