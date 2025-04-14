import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerFormComponent } from './answer-form.component';

describe('AnswerFormComponent', () => {
  let component: AnswerFormComponent;
  let fixture: ComponentFixture<AnswerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
