import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationOfReasonsComponent } from './explanation-of-reasons.component';

describe('ExplanationOfReasonsComponent', () => {
  let component: ExplanationOfReasonsComponent;
  let fixture: ComponentFixture<ExplanationOfReasonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExplanationOfReasonsComponent]
    });
    fixture = TestBed.createComponent(ExplanationOfReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
