import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectPageComponent } from './file-select-page.component';

describe('FileSelectPageComponent', () => {
  let component: FileSelectPageComponent;
  let fixture: ComponentFixture<FileSelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSelectPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
