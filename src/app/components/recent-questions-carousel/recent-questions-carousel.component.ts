import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { QuestionService } from '../../services/question.service';
import { RouterModule } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Question } from '../../services/question.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recent-questions-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule, MatFormFieldModule,  MatCardModule],
  templateUrl: './recent-questions-carousel.component.html',
  styleUrls: ['./recent-questions-carousel.component.scss']
})
export class RecentQuestionsCarouselComponent {
  @Input() recentQuestions: Question[] = [];
  
  
  constructor(private questionService: QuestionService) {}
  ngOnInit(): void {

     this.questionService.getRecentQuestions(6).subscribe({
       next: (data: Question[]) => {
         this.recentQuestions = data;  // Make sure this is an array with 6 items
       },
       error: (err: any) => {
         console.error('Error fetching recent questions', err);
     }
         });
  }

  carouselOptions: OwlOptions = {
  loop: true,
  margin: 20,
  nav: true,
  dots: true,
  responsive: {
    0: { items: 1 },
    600: { items: 4 },
    1000: { items: 3 }
    }
  };
}