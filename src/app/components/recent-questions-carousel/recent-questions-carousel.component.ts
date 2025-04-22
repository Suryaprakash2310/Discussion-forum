import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { QuestionService } from '../../services/question.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recent-questions-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule, FormsModule], // Ensure RouterModule is here
  templateUrl: './recent-questions-carousel.component.html',
  styleUrls: ['./recent-questions-carousel.component.scss']
})
export class RecentQuestionsCarouselComponent {
  @Input() recentQuestions: any[] = [];
  messages: { message: string, sender: string }[] = [];
  newMessage: string = '';
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

  trendingNews: { title: string, description: string }[] = [
    { title: 'NASA Plans Mission to Investigate Jupiter\'s Moon Europa', description: 'NASA has unveiled plans for a future mission to Europa, one of Jupiter’s moons, to explore its potential for harboring life beneath its icy surface.' },
    { title: 'Scientists Develop New Vaccine That Shows Promise Against Malaria', description: 'A team of international researchers has announced a breakthrough in malaria research, with a newly developed vaccine showing impressive results in clinical trials.' },
    {   title: 'Tesla Launches Self-Driving Cars in Cities', 
      description: 'Tesla starts deploying its full self-driving technology in major cities,\nmoving closer to widespread adoption.'
      },
      { 
        title: 'Apple Unveils Groundbreaking Virtual Reality Headset', 
        description: 'Apple introduces a cutting-edge VR headset with immersive features, promising to revolutionize the way we experience entertainment and digital interaction.' 
      }
    
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

  constructor(private questionService: QuestionService, private http: HttpClient) {}

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
    this.loadMessages();
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const msg = this.newMessage.trim();
    this.newMessage = '';

    this.http.post<any>('http://localhost:3000/chat', { message: msg }).subscribe({
      next: () => this.loadMessages(),
      error: (err: any) => console.error('Failed to send', err)
    });
  }

  loadMessages() {
    this.http.get<any[]>('http://localhost:3000/chat').subscribe({
      next: (data) => {
        this.messages = data.map(msg => msg.message);  // Assuming 'message' is the property you want to display
      },
      error: (err) => console.error('Error loading messages', err)
    });
  }
}
