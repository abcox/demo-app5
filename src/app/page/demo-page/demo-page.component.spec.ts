import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPageComponent } from './demo-page.component';

describe('DemoPageComponent', () => {
  let component: DemoPageComponent;
  let fixture: ComponentFixture<DemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
