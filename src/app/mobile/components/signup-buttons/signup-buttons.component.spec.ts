import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupButtonsComponent } from './signup-buttons.component';

describe('SignupButtonsComponent', () => {
  let component: SignupButtonsComponent;
  let fixture: ComponentFixture<SignupButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
