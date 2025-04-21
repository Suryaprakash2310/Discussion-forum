import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerComponent } from './answer-form.component';

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});