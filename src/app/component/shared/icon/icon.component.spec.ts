import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: SvgIconComponent;
  let fixture: ComponentFixture<SvgIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
