import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPageEditComponent } from './client-page-edit.component';

describe('ClientPageEditComponent', () => {
  let component: ClientPageEditComponent;
  let fixture: ComponentFixture<ClientPageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPageEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
