import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDemoPageComponent } from './editor-demo-page.component';

describe('EditorDemoPageComponent', () => {
  let component: EditorDemoPageComponent;
  let fixture: ComponentFixture<EditorDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorDemoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
