import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDemoPageComponent } from './file-upload-demo-page.component';

describe('FileUploadDemoPageComponent', () => {
  let component: FileUploadDemoPageComponent;
  let fixture: ComponentFixture<FileUploadDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadDemoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileUploadDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
