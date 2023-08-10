import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruterDashboardComponent } from './recruter-dashboard.component';

describe('RecruterDashboardComponent', () => {
  let component: RecruterDashboardComponent;
  let fixture: ComponentFixture<RecruterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruterDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
