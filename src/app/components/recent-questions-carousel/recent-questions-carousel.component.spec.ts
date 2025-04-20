import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentQuestionsCarouselComponent } from './recent-questions-carousel.component';

describe('RecentQuestionsCarouselComponent', () => {
  let component: RecentQuestionsCarouselComponent;
  let fixture: ComponentFixture<RecentQuestionsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentQuestionsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentQuestionsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});