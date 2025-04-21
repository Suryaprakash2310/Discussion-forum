// app.routes.ts
import { Routes } from '@angular/router';
import { QuestionListComponent } from './components/question-form/question-form.component';  // Correct import here
import { QuestionDetailsComponent } from './components/question-details/question-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionListComponent },
  { path: 'questions/new', component: QuestionListComponent },  // Using QuestionListComponent for new questions (if needed)
  {
    path: 'questions/:id',
    loadComponent: () => import('./components/question-details/question-details.component').then(m => m.QuestionDetailsComponent)
  }
];
