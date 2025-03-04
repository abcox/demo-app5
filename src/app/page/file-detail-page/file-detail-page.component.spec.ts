import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDetailPageComponent } from './file-detail-page.component';

describe('FileDetailPageComponent', () => {
  let component: FileDetailPageComponent;
  let fixture: ComponentFixture<FileDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
