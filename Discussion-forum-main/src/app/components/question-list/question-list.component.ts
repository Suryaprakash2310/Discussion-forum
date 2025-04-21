//question-list.component.ts
//import { Component } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MATERIAL_IMPORTS,
    MatIconModule,
    MatMenuModule,

  ],
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  searchTerm: string = '';
  filterBy: 'latest' | 'mostLiked' = 'latest';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (err) => {
        console.error('Error fetching questions', err);
      }
    });
  }

  get filteredQuestions() {
    let filtered = this.questions.filter(q =>
      q.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return this.filterBy === 'latest'
      ? filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      : filtered.sort((a, b) => b.likes - a.likes);
  }

  deleteQuestion(id: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
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
}