import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileButtonComponent } from './mobile-button.component';

describe('MobileButtonComponent', () => {
  let component: MobileButtonComponent;
  let fixture: ComponentFixture<MobileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
