import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';  // Make sure RouterModule is imported here
import { OwlOptions } from 'ngx-owl-carousel-o';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-recent-questions-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule], // Ensure RouterModule is here
  templateUrl: './recent-questions-carousel.component.html',
  styleUrls: ['./recent-questions-carousel.component.scss']
})
export class RecentQuestionsCarouselComponent {
  @Input() recentQuestions: any[] = [];
  imageList: string[] = [
    'https://tse1.mm.bing.net/th?id=OIP.NbH3uTE070UbF7htR5y5PQHaE8&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.qHyKt6ZZgpFkK5JqwK3GfwHaEJ&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.yw0TnheAGN-LPneDaTlaxwHaD8&pid=Api&P=0&h=180',
    'https://tse2.mm.bing.net/th?id=OIP.HjTaU2AJkvV-Ub779QWVoAHaE8&pid=Api&P=0&h=180',
    'https://gwcdata.ai/assets/Generative%20AI-9PLiZpOB.webp',
    'https://tse1.mm.bing.net/th?id=OIP.OZDWoC8NUTcFPOr4LzQM_QHaFj&pid=Api&P=0&h=180',
    'https://www.graduateprogram.org/wp-content/uploads/2022/08/Aug-18-Promoting-Independent-Thinking-in-Classrooms_web.jpg',
    'https://tse4.mm.bing.net/th?id=OIP.-VTA7b1m8-uOdKncmPl2FgHaEK&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.qiPeIwKTXVsJ634xKKItigHaEK&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.OTRksibHgezmVkwIr05kJwHaE7&pid=Api&P=0&h=180'
  ];
  
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

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getRecentQuestions(6).subscribe({
      next: (data: any[]) => {
        this.recentQuestions = data;
        console.log(this.recentQuestions);
      },
      error: (err) => {
        console.error('Error fetching recent questions', err);
      }
    });
  }
}
