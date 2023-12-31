import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizUserComponent } from './quiz-user.component';

describe('QuizUserComponent', () => {
  let component: QuizUserComponent;
  let fixture: ComponentFixture<QuizUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
