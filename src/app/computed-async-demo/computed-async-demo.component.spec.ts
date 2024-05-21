import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputedAsyncDemoComponent } from './computed-async-demo.component';

describe('ComputedAsyncDemoComponent', () => {
  let component: ComputedAsyncDemoComponent;
  let fixture: ComponentFixture<ComputedAsyncDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputedAsyncDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputedAsyncDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
