import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimiScattiComponent } from './ultimi-scatti.component';

describe('UltimiScattiComponent', () => {
  let component: UltimiScattiComponent;
  let fixture: ComponentFixture<UltimiScattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimiScattiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UltimiScattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
