import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropDemoPageComponentComponent } from './drag-drop-demo-page-component.component';

describe('DragDropDemoPageComponentComponent', () => {
  let component: DragDropDemoPageComponentComponent;
  let fixture: ComponentFixture<DragDropDemoPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropDemoPageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragDropDemoPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
