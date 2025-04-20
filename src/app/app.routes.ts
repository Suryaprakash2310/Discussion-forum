import { Routes } from '@angular/router';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { RecentQuestionsCarouselComponent } from './components/recent-questions-carousel/recent-questions-carousel.component'
export const routes: Routes = [
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionListComponent },
  { path: 'questions/new', component: QuestionFormComponent },
  { path: 'questions/discover', component: RecentQuestionsCarouselComponent },
  {
    path: 'questions/:id',
    loadComponent: () => import('./components/question-details/question-details.component').then(m => m.QuestionDetailsComponent)
  }
  
];
