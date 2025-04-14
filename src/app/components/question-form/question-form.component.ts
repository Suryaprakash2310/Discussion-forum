//question-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {
  title = '';
  description = '';
  tags = '';

  constructor(private router: Router) {}

  submitQuestion() {
    if (!this.title.trim() || !this.description.trim()) {
      alert('Title and description are required!');
      return;
    }
  
    const questionData = {
      title: this.title,
      description: this.description,
      tags: this.tags
    };
  
    fetch('http://localhost:3000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit question');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Question submitted!');
        this.router.navigate(['/questions']);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong while submitting the question.');
      });
  }
  
}
