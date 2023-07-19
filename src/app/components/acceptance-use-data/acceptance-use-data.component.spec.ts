import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceUseDataComponent } from './acceptance-use-data.component';

describe('AcceptanceUseDataComponent', () => {
  let component: AcceptanceUseDataComponent;
  let fixture: ComponentFixture<AcceptanceUseDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptanceUseDataComponent]
    });
    fixture = TestBed.createComponent(AcceptanceUseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
