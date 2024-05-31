import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientImportPageComponent } from './client-import-page.component';

describe('ClientImportPageComponent', () => {
  let component: ClientImportPageComponent;
  let fixture: ComponentFixture<ClientImportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientImportPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientImportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
